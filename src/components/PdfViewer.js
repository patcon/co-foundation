import React, { useEffect, useState } from 'react'
import { Pane, Paragraph } from 'evergreen-ui'
import { pdfjs, Document, Page } from 'react-pdf'
import fetch from 'node-fetch'
import { FORM_FIELDS } from '../constants'
import { postProcessCopiedAnnots } from '../utils'
import { PDFDocument } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const FormPdfViewer = props => {
  const { formId, pages } = props

  const [ numPages, setNumPages ] = useState(null)
  const [ pdfBytes, setPdfBytes ] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

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
    const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [9])
    pdfDoc.removePage(10)
    pdfDoc.removePage(8)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    pdfDoc.removePage(0)
    const fieldSuffix = '.alt2'
    postProcessCopiedAnnots(copiedPage, fieldSuffix)
    pdfDoc.addPage(copiedPage)
    const form = pdfDoc.getForm()
    form
      .getTextField(FORM_FIELDS[formId]['A.director1.lastName'])
      .setText('Buttons!')
    form
      .getTextField(FORM_FIELDS[formId]['A.director1.lastName']+fieldSuffix)
      .setText('Other Buttons!')
    const changedPdfBytes = await pdfDoc.save()
    setPdfBytes(changedPdfBytes.buffer)
  }

  useEffect(() => fetchPdfByFormId(formId), [])

  return (
    <Pane>
      <Document
        file={pdfBytes}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {[...Array(numPages)].map((_, index) => (
          <>
            <Page pageNumber={index + 1} />
            <Paragraph>Page {index + 1} of {numPages}</Paragraph>
          </>
        ))}
      </Document>
    </Pane>
  )
}