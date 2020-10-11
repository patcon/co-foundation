import Companies from '../data/companies'
import fetch from 'node-fetch'

export default async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const url = 'https://searchapi.mrasservice.ca/Search/api/v1/search'
    const keyword = req.query.q
    const params = new URLSearchParams({
        fq: `keyword:"${keyword}" Status_State:Active`,
        location: req.query.location || 'ON',
        page: req.query.page || 0,
        lang: req.query.lang || 'en',
        sortfield: 'score',
        sortorder: 'desc',
        queryaction: 'fieldquery',
    })

    console.log(`${url}?${params}`)
    const response = await fetch(`${url}?${params}`)
    const json = await response.json()
    res.send(JSON.stringify(json, null, 2))
}