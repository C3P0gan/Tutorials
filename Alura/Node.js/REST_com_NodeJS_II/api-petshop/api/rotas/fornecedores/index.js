const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

// OPTIONS
roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET', 'POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204) // No Content
    resposta.end()
})

// Listar fornecedores
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200) // OK
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
        , ['empresa']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

// Cadastrar fornecedores
roteador.post('/', async (requisicao, resposta, proximo) => {
    try{
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201) // Created
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
            , ['empresa']
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch (erro) {
        proximo(erro)
    }
})

// OPTIONS
roteador.options('/:idFornecedor', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET', 'PUT', 'DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204) // No Content
    resposta.end()
})

// Buscar fornecedor por id
roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.status(200) // OK
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
            , ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch (erro) {
        proximo(erro)
    }
})

// Atualizar fornecedor
roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204) // No Content
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

// Remover fornecedor
roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204) // No Content
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

const roteadorProdutos = require('./produtos')

const verificarFornecedor = async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        requisicao.fornecedor = fornecedor
        proximo()
    } catch (erro) {
        proximo(erro)
    }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador
