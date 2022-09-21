module.exports = {
    companies: (id, data, res) => {
        const dataToPdf = data.clients[id]

        if (!dataToPdf) {
            return res.status(404).end()
        }

        return res.send(`deveria baixar um pdf -> ${JSON.stringify(dataToPdf)}`)
    }
}