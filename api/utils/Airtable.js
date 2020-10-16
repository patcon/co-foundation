const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
)

const formsTable = base('forms')

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    airtable_id: record.id,
    ...record.fields,
  }
}

const minifyRecords = (records) => {
  return records.map(record => getMinifiedRecord(record))
}

export {
  formsTable,
  minifyRecords,
}
