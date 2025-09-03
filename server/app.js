import express from 'express'
import router from './router.js'
const app = express()


app.use('/', router)

app.set('port', 4500)

const server = app.listen(app.get('port'), () => {

    console.log("[OK] - Servidor em PORT " + server.address().port)
})