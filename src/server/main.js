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
  const characterArray = Object.values(characters);
  res.render('index.njk', 
    { characters: characterArray },
  );
  console.log(characters);
});

// Character View
app.get('/character/:name', async (req, res) => {
  const characterString = req.params.name;
  const character = characters[characterString];

  if (character) {
    console.log(character.name);
    const BreedData = await getBreedData(character.breed);
    console.log(BreedData);
    const characterBreedData = BreedData[0];
    const characterImages = await getBreedImages(characterBreedData.id);
    console.log("breed data:"+characterBreedData.name);
    res.render('character.njk', { characterBreedData, character, characterImages, characters });
  } else {
    res.status(404).send('Character not found');
  }
});
