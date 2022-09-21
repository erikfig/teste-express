module.exports = {
    companies: async (id, data, res) => {
        const dataToPdf = data.clients[id]

        if (!dataToPdf) {
            return res.status(404).end()
        }

        // remover o await para enviar o email paralelamente
        await new Promise((resolve) => setTimeout(() => resolve(), 3000))

        return res.send(`deveria enviar um email -> ${JSON.stringify(dataToPdf)}`)
    }
}