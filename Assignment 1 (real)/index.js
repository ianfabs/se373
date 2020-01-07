const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const {name, list} = require("./profile.json");
const todos = require("./todo.json");

const port = 3000;
const html_pages = [
    "index",
    "read-todo"
];
const pages = [
    "",
    "todo",
    "fake-page",
    ...html_pages
];

const server = http.createServer((request, response) => {
    //const pathName = url.parse(request.url).pathname.substr(1);
    /* if (path.extname(pathName) == "html") {
        console.info("html page requested");
        if (html_pages.includes(path.basename(pathName, '.html'))) {
            console.info("page exists");
            fs.access(file, fs.constants.F_OK, (err) => {
                if (!err) {
                } else {
                    console.error(`${file} ${err ? 'does not exist' : 'exists'}`);
                }
            });
        }
    }else if (pages.includes(pathName)) {
        console.info("page found");
        // use Map where Key is pathName and Value is a function that handles specifics for that particular route.
    } */

    switch (request.url) {
        case "/index": {
            fs.readFile(path.join(__dirname, "./views/index.html"), (err, data) => {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data);
                }
                else {
                    console.error(err);
                    response.writeHead(500, {"Content-Type": "text/html"});
                    response.write(`
                        <h1>Internal Server Error</h1>
                        <p>${err}</p>
                    `);
                }
                response.end();
            })
            break;
        }
        case "/todo-read": {
            fs.readFile(path.join(__dirname, "./views/todo.html"), (err, data) => {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data);
                }
                else {
                    console.error(err);
                    response.writeHead(500, {"Content-Type": "text/html"});
                    response.write(`
                        <h1>Internal Server Error</h1>
                        <p>${err}</p>
                    `);
                }
                response.end();
            })
            break;
        }
        case "/todo": {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(todos, null, 2));
            response.end();
            break;
        }
        case "/fake_page": {
            response.writeHead(301, {
                'Location': 'index.html'
            });
            response.end();
            break;
        }
        default: {
            console.error("Error: 404");
            console.error("Page not found");
            response.writeHead(301, {'Location': `http://${request.headers.host}/index`});
            response.end();
            break;
        }
    }
});


server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})