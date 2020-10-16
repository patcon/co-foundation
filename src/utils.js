import { PROVINCE_DATA } from './constants'
import {
  PDFArray,
  PDFBool,
  PDFDict,
  PDFName,
  PDFString,
} from 'pdf-lib';

export const getProvinceByCode = (code) => {
  return PROVINCE_DATA.find(p => p.code === code)
}

// Source: https://github.com/Hopding/pdf-lib/issues/151#issuecomment-517965052
export const postProcessCopiedAnnots = (page, fieldSuffix) => {
  const acroForm = page.doc.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
  const acroFields = acroForm.lookup(PDFName.of('Fields'), PDFArray);

  acroForm.set(PDFName.of('NeedAppearances'), PDFBool.True);

  const annots = page.node.Annots();
  for (let idx = 0; idx < annots.size(); idx++) {
    const annot = annots.lookup(idx, PDFDict);
    const tVal = (annot.lookup(PDFName.of('T')))?.value;

    annot.set(PDFName.of('P'), page.ref);
    annot.set(PDFName.of('T'), PDFString.of(`${tVal}${fieldSuffix}`));
    annot.delete(PDFName.of('AP'));

    acroFields.push(annots.get(idx));
  }
};