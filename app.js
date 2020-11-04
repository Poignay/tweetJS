// on récupére notre dépendance externe - ici express.
const express = require('express');
const logger = require('morgan');
const path = require('path');
const tweets = require('./tweet.json');
const { v4: uuidv4 } = require('uuid');
// on construit notre application qui nous servira à créer nos routes
const app = express();
// on donne un port sur lequel notre serveur écoute
const port = 3000;

app.use(logger('dev'));

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

// notre première route !
// on envoi un Hello World si la requête est sur la racine.
app.get('/tweets', (req, res) => {
    res.render('tweets', { tweets: tweets });
});

app.get('/tweets/new', (req, res) => {
    res.render('new');
});

app.get('/tweets/:id', (req, res) => {
    const idtweet = req.params.id;
    const tweet2 = tweets.find((elem) => {
        return elem.id=== idtweet;
    });
    let tweet;
    for (let elem of tweets) {
        if(elem.id===idtweet){
            tweet=elem;
        }
    }
    res.render('tweet', { tweets: tweet2 });
});



app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.post('/tweets', (req, res) => {
   
    const body = req.body;
    body.id = uuidv4();
    tweets.push(body);
    res.redirect('/tweets');
});

// on écoute sur notre port.
app.listen(port, () => {
  console.log(`TweetJS listening at http://localhost:${port}`)
});
