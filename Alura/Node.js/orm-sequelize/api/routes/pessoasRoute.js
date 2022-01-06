const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')


const router = Router()

// CRUD Pessoas
router.post('/pessoas', PessoaController.criaPessoa) // Create
router.get('/pessoas', PessoaController.retornaTodasAsPessoas) // Read all
router.get('/pessoas/:id', PessoaController.retornaUmaPessoa) // Read one
router.put('/pessoas/:id', PessoaController.atualizaPessoa) // Update
router.delete('/pessoas/:id', PessoaController.apagaPessoa) // Delete

module.exports = router
