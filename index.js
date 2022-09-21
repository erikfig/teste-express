const express = require('express')
const app = express()
const port = 3000
const auth = require('./auth')
const axios = require('axios')
const mapperV2 = require('./mapper/clients-v2')
const companiesService = require('./service/companies')
const pdfGenerator = require('./pdf-generator')
const sendEmail = require('./send-email')

app.use(auth)

app.get('/', (req, res) => {
    res.send('hi')
})

/**
 * opção recomendada
 */
app.get('/v1/clients/list', async (req, res) => {
    try {
        const data = await companiesService.all()

        return res.json(data)
    } catch (e) {
        throw new Error(e)
    }
})

/**
 * alternativa, só pra suprir todas as possibilidades
 */
app.get('/v2/clients/list', async (req, res) => {
    try {
        const {data: companies} = await axios.get('https://fakerapi.it/api/v1/companies?_quantity=20')
        data = {
            total: companies.total,
            clients: await mapperV2(companies.data)
        }

        return res.json(data)
    } catch (e) {
        throw new Error(e)
    }
})

/**
 * faturas
 */
 app.post('/faturas/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await companiesService.all()

        return pdfGenerator.companies(id, data, res)
    } catch (e) {
        throw new Error(e)
    }
})

/**
 * emails
 */
 app.post('/email/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await companiesService.all()

        return await sendEmail.companies(id, data, res)
    } catch (e) {
        throw new Error(e)
    }
})

app.listen(port, () => {
    console.log('is alive');
})