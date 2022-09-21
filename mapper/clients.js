module.exports = (data, persons) => {
    const clients = [];

    data.forEach((item, key) => {
        const {firstname, lastname} = persons[key]
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

    return clients
}