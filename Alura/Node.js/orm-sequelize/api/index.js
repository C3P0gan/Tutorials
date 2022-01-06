const express = require('express')
const bodyParser = require('body-parser')


// Main application
const app = express()

app.use(bodyParser.json())

const port = 3000

app.get('/teste', (req, res) => res
    .status(200) // Ok
    .send({
        mensagem: 'Boas-vindas à API'
    })
)

app.listen(port, () => console.log(
    `O servidor está rodando na porta ${port}`
    )
)

module.exports = app