require('dotenv').config()

const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8080

const cssPath = path.join(__dirname, 'public', 'css', 'style.css')
const htmlPath = path.join(__dirname, 'public', 'index.html')
const jsPath = path.join(__dirname, 'public', 'app.js')

const server = http.createServer((request, response) => {

    if(request.url.indexOf('.html') != -1) {
        fs.readFile(htmlPath, (error, data) => {
            if(error) {
                return console.log(error)
            }
            response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
            response.write(data)
            response.end()
        })
    }

    if(request.url.indexOf('.css') !== -1) {
        fs.readFile(cssPath, (error, data) => {
            if(error) {
                return console.log(error)
            }

            response.writeHead(200, { 'Content-Type': 'text/css;charset=UTF-8' })
            response.write(data)
            response.end()
        })
    }
    
    if(request.url.indexOf('.js') !== -1) {
        fs.readFile(jsPath, (error, data) => {
            if(error) {
                return console.log(error)
            }

            response.writeHead(200, { 'Content-Type': 'text/javascript'})
            response.write(data)
            response.end()
            
        })
    }
})

server.listen(port, console.log(`vinicius-goncalves | Server started at port ${port}`))