const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()
    server.use(cookieParser());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());

    server.get('/test', async (req, res) => {
        return res.json({
            test:"abc"
        })
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://url:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})