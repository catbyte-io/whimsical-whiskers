import express from "express";
import ViteExpress from "vite-express";
import nunjucks from 'nunjucks';

import { characters, getBreedData, getBreedImages } from "./calls.js";

const app = express();

// Configure app to use nunjucks for templating
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.use(express.static('src/client'));

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

ViteExpress.bind(app, server);

// Routes

// Home
app.get('/', (req, res) => {
  res.render('index.njk', 
    { characters },
  );
});

// Character View
app.get('/character/:name', async (req, res) => {
  const characterName = req.params.name;
  const characterString = characterName.toLowerCase;
  const character = characters.find(c => c.name.toLowerCase === characterString);

  if (character) {
    const characterBreed = await getBreedData(character.breed);
    res.render('character.njk', { characterBreed, characterName, characters });
  } else {
    res.status(404).send('Character not found');
  }
});
