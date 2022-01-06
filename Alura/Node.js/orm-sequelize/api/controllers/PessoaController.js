const database = require('../models')

class PessoaController {
    // Read
    static async retornaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res
                .status(200) // OK
                .json(todasAsPessoas)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }
}

module.exports = PessoaController
