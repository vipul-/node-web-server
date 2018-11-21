const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

const app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile("log.txt", `${log}\n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance");
// });

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    //res.send("Hello Express!");
    // res.send({
    //     name: "Vipul",
    //     fav_food: ["Pizza", "Burger", "Momo", "Hotdog", "Sandwitch"]
    // });
    res.render('index', {
        pageTitle: "Home Page",
        welcomeText: "Welcome to some site!"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        pageTitle: "About page"
    });
});

app.get('/bad', (req, res) => {
    res.send(
        {
            ErrorMessage: "Unable to fulfill request."
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});