const database = require('../models')


class PessoaController {
    // CRUD Pessoa
    // Create
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res
                .status(201) // Created
                .json(novaPessoaCriada)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Read all
    static async retornaTodasAsPessoas(req, res) {
        try {
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

    // Read one
    static async retornaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res
                .status(200) // OK
                .json(umaPessoa)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Update
    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, {
                where: {
                    id: Number(id)
                }
            })

            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res
                .status(200) // OK
                .json(pessoaAtualizada)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Delete
    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })

            return res
                .status(204) // No Content
                .end()
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Restore
    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            })
            
            return res
                .status(204) // No Content
                .end()
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // CRUD Matrícula
    // Create
    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res
                .status(201) // Created
                .json(novaMatriculaCriada)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Read one
    static async retornaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res
                .status(200) // OK
                .json(umaMatricula)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }


    // Update
    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                }
            })

            return res
                .status(200) // OK
                .json(matriculaAtualizada)
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Delete
    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res
                .status(204) // No Content
                .end()
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }

    // Restore
    static async restauraMatricula(req, res) {
        const { id } = req.params
        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(id)
                }
            })
            
            return res
                .status(204) // No Content
                .end()
        } catch (error) {
            return res
                .status(500) // Internal Server Error
                .json(error.message)
        }
    }
}

module.exports = PessoaController
