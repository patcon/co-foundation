const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
)

export const formsTable = base('forms')
export const companiesTable = base('cooperatives')
export const addressesTable = base('addresses')

export const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    airtable_id: record.id,
    ...record.fields,
  }
}

export const minifyRecords = (records) => {
  return records.map(record => getMinifiedRecord(record))
}