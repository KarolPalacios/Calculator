const path = require('path');
const fs = require('fs/promises');
const http = require('http');

const app = http.createServer(async (request, response) =>{
    const url = request.url;

    if(url === '/'){
        const htmlPath = path.resolve('./calculadora/index.html');
        const html = await fs.readFile(htmlPath, 'utf-8');
        console.log(url);
        response.setHeader('Content-Type', 'text/html');
        response.write(html);
    };

    if(url.includes('style')){
        const stylePath = path.resolve(`./calculadora/${url}`);
        const styleSheet = await fs.readFile(stylePath, 'utf-8');
        response.setHeader('Content-Type', 'text/css');
        response.write(styleSheet);
    };

    if(url.includes('.js')){
        const jsPath = path.resolve(`./calculadora/${url}`);
        const js = await fs.readFile(jsPath, 'utf-8');
        response.setHeader('Content-Type', 'text/javascript');
        response.write(js);
    };

    response.end();
});

const PORT = 2000;

app.listen(PORT);

console.log('Servidor escuchando')