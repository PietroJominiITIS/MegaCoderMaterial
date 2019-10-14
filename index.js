const express = require('express');
const path = require('path');
let ip = require('ip');
const fs = require('fs');
const expbs = require('express-handlebars');

const app = express();

app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.get('/', (req, res) => {
    let cDir = dir;
    let query = req.query.path || '';
    if (query) cDir = path.join(cDir, query);
    let data = [];
    fs.readdir(cDir, (e, files) => {
        if (e) {
            console.log(e);
            res.status(400).send({
                error: 'Path not found',
                path: query,
                status: 'failure'
            });
            return;
        }
        else {
            files.forEach(f => {
                data.push({
                    name: f, 
                    isDirectory: fs.statSync(path.join(cDir, f)).isDirectory(), 
                    path: path.join(query, f)
                });
            });
            let upDir = '';
            if (fs == '') {
                upDir = '';
            } else {
                upDir = query.split(path.sep);
                upDir.pop();
                upDir = upDir.join(path.sep);
            }
            if (query != '') data.unshift({
                name: 'Up',
                isDirectory: true,
                path: upDir
            });
            res.render('fs', {
                data,
                dir: '/' + query
            });
        }
    });
});

localIp = ip.address() || '127.0.0.1';
const PORT = 3000;

app.listen(PORT, localIp, function (e) {
    if (e) console.log(e);
    else console.log('Running on IP:', localIp, 'PORT:', PORT);
});