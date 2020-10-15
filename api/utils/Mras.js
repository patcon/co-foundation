import fetch from 'node-fetch'

const filterCompany = (company) => {
    return ({
        name: company.Company_Name,
        number: company.Juri_ID,
        status: company.Status_State,
        date: company.Date_Incorporated,
        jurisdiction: company.Jurisdiction,
    })
}

const filterCompanies = (companies) => {
  return companies.map(filterCompany)
}

const client = {
  search: async (opts) => {
    const apiBaseUrl = 'https://searchapi.mrasservice.ca/Search/api/v1'
    const apiPath = '/search'
    const params = new URLSearchParams({
      fq: `keyword:"${opts.q || ''}" Status_State:Active`,
      location: (opts.location || '').toUpperCase(),
      page: (opts.page || 1) - 1,
      lang: 'en',
      sortfield: 'score',
      sortorder: 'desc',
      queryaction: 'fieldquery',
    })

    const response = await fetch(`${apiBaseUrl}${apiPath}?${params}`)
    const json = await response.json()
    const records = json.docs

    return records
  }
}

export {
  client,
  filterCompanies,
}
