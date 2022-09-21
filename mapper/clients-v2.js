const axios = require('axios')

/**
 * Solução não indicada, além de ser mais pesada estoura o limite
 * de requests em um determinado período pelo fakerapi
 */
module.exports = async (data) => {
    const clients = [];

    await Promise.all(
        data.map(async (item) => {
            const {data: person} = await axios.get('https://fakerapi.it/api/v1/persons?_quantity=1')
            const {firstname, lastname} = person.data[0]
            const fullName = `${firstname} ${lastname}`
    
            clients.push({
                name: item.name,
                email: item.email,
                phone: item.phone,
                person: {
                    fullName
                }
            })
        })
    )
    

    return clients
}