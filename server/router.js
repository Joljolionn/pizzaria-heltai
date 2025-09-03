import { fileURLToPath } from 'url';
import express from 'express'
import path from 'path'
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express()

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/index.html'), (err, data) => {
        if(err){
            res.status(500).send('500 - Erro interno no Servidor')
        } else {
            res.status(200).type('text/html').send(data)
        }
    })
})

router.get('/cardapio', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/cardapio.html'), (err, data) => {
        if(err){
            res.status(500).send('500 - Erro interno no Servidor')
        } else {
            res.status(200).type('text/html').send(data)
        }
    })
})

router.get('/pedido', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/pedido.html'), (err, data) => {
        if(err){
            res.status(500).send('500 - Erro interno no Servidor')
        } else {
            res.status(200).type('text/html').send(data)
        }
    })
})


export default router;