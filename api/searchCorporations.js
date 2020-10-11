import Companies from '../data/companies'

export default async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    res.send(JSON.stringify(Companies.docs, null, 2))
}