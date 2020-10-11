const filterCompany = (company) => {
    return ({
        name: company.Company_Name,
        number: `${company.Jurisdiction}-${company.Juri_ID}`,
        status: company.Status_State,
        date: company.Date_Incorporated,
    })
}

const filterCompanies = (companies) => {
    return companies.map(filterCompany)
}

export {
    filterCompany,
    filterCompanies,
}