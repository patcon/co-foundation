import {
  addressesTable,
  companiesTable,
} from '../../../../utils/Airtable'

export default async (req, res) => {
  try {
    const { company_id: recordId } = req.query
    const company = await companiesTable.find(recordId)
    const addressId = company.fields['head_office_address_id']
    const address = await addressesTable.find(addressId)
    console.log(address)
    res.send(`Hello ${company.fields['name']}`)
  } catch (err) {
    res.statusCode = 500
    res.json({ msg: 'Something went wrong' })
  }
}
