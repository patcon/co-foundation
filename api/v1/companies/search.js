import fetch from 'node-fetch'
import { client, filterCompanies } from './../../utils/Mras'

export default async (req, res) => {
    try {
        const { q, location, page } = req.query
        let records = await client.search({q, location, page})
        records = filterCompanies(records)
        records = location
            ? records.filter(r => r.jurisdiction === location.toUpperCase())
            : records
        res.json(records, null, 2)
    } catch (err) {
        res.statusCode = 500
        res.json({msg: 'Something went wrong'})
    }
}
