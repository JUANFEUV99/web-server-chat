const express = require('express');
const exphbs = require('express-handlebars');
const bp = require('body-parser');

let port = process.env.PORT || 8000;

const app = express();
app.use(bp.urlencoded({ extended: false }));

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');


app.get('/', (req, res) => {
    res.render('home');
});

let users = [];
let cadena = () => {
    let st = '';
    users.forEach(user => {
        st += `${user}\n`;
    });
    return st;
};

app.get('/main', (req, res) => {
    let usr = req.query.user;
    if (usr != 'undefined') {
        users.push(usr);
    }
    res.render('main', {
        users: cadena()
    });
});


app.listen(port, () => {
    console.log(`Working on port ${port}`);
});