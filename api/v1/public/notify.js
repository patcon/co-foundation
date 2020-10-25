import { notificationsTable, minifyRecords } from '../../utils/Airtable'

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const { email, country, region } = req.body
        const createdRecords = await notificationsTable.create([
          {
            fields: {
              email,
              country,
              region
            }
          }
        ])
        const minifiedRecords = minifyRecords(createdRecords)

        res.statusCode = 200
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