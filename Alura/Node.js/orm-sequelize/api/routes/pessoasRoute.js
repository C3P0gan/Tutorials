const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')


const router = Router()

router
    // CRUD Pessoas
    .post('/pessoas', PessoaController.criaPessoa) // Create
    .get('/pessoas', PessoaController.retornaTodasAsPessoas) // Read all
    .get('/pessoas/:id', PessoaController.retornaUmaPessoa) // Read one
    .put('/pessoas/:id', PessoaController.atualizaPessoa) // Update
    .delete('/pessoas/:id', PessoaController.apagaPessoa) // Delete

    // CRUD Matricula
    .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula) // Create
    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.retornaUmaMatricula) // Read one
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula) // Update
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula) // Delete

module.exports = router
