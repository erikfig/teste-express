const axios = require('axios')
const mapper = require('../mapper/clients')

module.exports = {
    all: async () => {
        const {data: companies} = await axios.get('https://fakerapi.it/api/v1/companies?_quantity=20')
        const {data: person} = await axios.get('https://fakerapi.it/api/v1/persons?_quantity=20')
        data = {
            total: companies.total,
            clients: mapper(companies.data, person.data)
        }

        return data
    }
}
