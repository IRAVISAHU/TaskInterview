const http = require('http')
const port = 3000
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Hello, world!')
    }
});
server.listen(port, () => {
    console.log(`server running on port ${port}`)
});
