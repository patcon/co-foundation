import { formsTable, minifyRecords } from '../utils/Airtable'

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const formIdFragment = req.query.form_id || ''
                const records = await formsTable.select({
                    filterByFormula: `SEARCH("${formIdFragment}", {form_id})`,
                }).firstPage()
                const minifiedRecords = minifyRecords(records)
                
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.send(JSON.stringify(minifiedRecords, null, 2))
            } catch (err) {
                res.statusCode = 500
                res.json({ msg: 'Something went wrong' })
            }
            break
        default:
            res.statusCode = 405
            res.json({ msg: `Unsupported method: ${req.method}` })

    }
}
