const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 8080
const mongoose = require('mongoose')
const cors = require('cors')

/**
 * CARREGANDO MODELS
 * E DEFINIDO MONGOOSE
 */

require('./models/Post')
const Posts = mongoose.model('post')

//preparando bodyParser para trabalhar com json
app.use(express.json())

/**
 * Configurando o Cors para:
 * 1 - permitir acesso de qualquer url/aplicação
 * 2 - permitir acesso atraves dos metodos 'GET,PUT,POST,DELETE' 
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    app.use((cors()))
    next()
})

/**
 * CONFIGURANDO CONEXÃO COM MONGODB COM TRATAMENTO DE ERRO
 */

mongoose.connect('mongodb://localhost/testeFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexão com Mongo')
}).catch((error) => {
    console.log('Sem conexão com mongo')
});


/**
 * CADASTRAR ITEM
 */

app.post('/api', (req, res) => {
    const newPost = Posts.create(req.body, (error) => {
        if (error) return res.status(400).json({
            message: "error: Desculpe não conseguimos postar nada!"
        })

        return res.status(200).json({
            message: "Postado com sucesso"
        })
    })
})


/**
 * LISTANDO POST
 */

app.get('/', (req, res) => {
    Posts.find({}).then((data) => {
        return res.json(data)
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Error: dados não encontrado!"
        })
    })
})

/**
 * BUSCAR POST PELO ID
 */


app.get('/api/:id', (req, res) => {
    Posts.findOne({ _id: req.params.id }).then((data) => {
        return res.json(data)
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Error: dados não encontrado!"
        })
    })
})

/**
 * EDITANDO POST
 */

app.put('/api/:id', (req, res) => {
    const myPost = Posts.updateOne({ _id: req.params.id }, req.body, (error) => {
        if (error) return res.status(400).json({
            message: "Não foi possivel editar a postagem"
        })
        return res.json({
            message: "Postagem editada com sucesso!"
        })
    })
})

/**
 * DELETANDO POST
 */

app.delete('/api/:id', (req, res) => {
    const myPost = Post.deleteOne({ _id: req.params.id }, (error) => {
        if (error) return res.status(400).json({
            message: "Não foi possivel deletar o post!"
        })
        return res.json({
            message: "Post deletado com sucesso!"
        })
    })
})


/*o servidor está ouvindo*/
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})
