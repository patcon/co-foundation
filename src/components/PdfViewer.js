import React, { useEffect, useState } from 'react'
import { Button, Pane, Paragraph } from 'evergreen-ui'
import { PDFDocument } from 'pdf-lib'
import { pdfjs, Document, Page } from 'react-pdf'
import fetch from 'node-fetch'
import { FORM_FIELDS } from '../constants'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const PdfViewer = () => {
  const [ currentPage, setCurrentPage ] = useState(8)
  const [ pdfBytes, setPdfBytes ] = useState(null)

  useEffect(() => {
    const fetchPdf = async () => {
      const url = '/api/v1/forms?form_id=07200'
      const response = await fetch(url)
      const json = await response.json()
      const existingPdfBytes = await fetch(json[0].pdf_converted[0].url).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      pdfDoc
        .getForm()
        .getTextField(FORM_FIELDS['07200']['4.corpName2'])
        .setText('IT WORKS!')
      const changedPdfBytes = await pdfDoc.save()
      setPdfBytes(changedPdfBytes.buffer)

    }
    fetchPdf()
  }, [])

  return (
    <Pane>
      <Button>Testing</Button>
      <Document file={pdfBytes}>
        <Page pageNumber={currentPage} />
        <Paragraph>Page {currentPage} of ???</Paragraph>
      </Document>
    </Pane>
  )
}