import React, { useEffect, useState } from 'react'
import { Pane, Paragraph } from 'evergreen-ui'
import { PDFDocument } from 'pdf-lib'
import { pdfjs, Document, Page } from 'react-pdf'
import fetch from 'node-fetch'
import { FORM_FIELDS } from '../constants'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const FormPdfViewer = props => {
  const { formId } = props

  const [ currentPage, setCurrentPage ] = useState(8)
  const [ pdfBytes, setPdfBytes ] = useState(null)

  const getFormUrl = async (formId) => {
    const url = `/api/v1/forms?form_id=${formId}`
    const response = await fetch(url)
    const json = await response.json()
    const record = json ? json[0] : {}
    return record.pdf_converted[0].url
  }

  const fetchPdfByFormId = async (formId) => {
    const formUrl = await getFormUrl(formId)
    const existingPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc
      .getForm()
      .getTextField(FORM_FIELDS[formId]['4.corpName2'])
      .setText('IT WORKS!')
    const changedPdfBytes = await pdfDoc.save()
    setPdfBytes(changedPdfBytes.buffer)
  }

  useEffect(() => fetchPdfByFormId(formId), [])

  return (
    <Pane>
      <Document file={pdfBytes}>
        <Page pageNumber={currentPage} />
        <Paragraph>Page {currentPage} of ???</Paragraph>
      </Document>
    </Pane>
  )
}