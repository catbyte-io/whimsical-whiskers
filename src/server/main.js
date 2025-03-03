import express from "express";
import ViteExpress from "vite-express";
import nunjucks from 'nunjucks';

import { characters, getBreedData, getBreedImages } from "./calls.js";
import { getToken } from "./token.js";

// Define server application
const app = express();

// Configure app to use nunjucks for templating
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Configure static directories
app.use(express.static('public'));
app.use(express.static('src/client'));

// Set port and address where the application will be served
const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

// Create bindings
ViteExpress.bind(app, server);

// Routes

// Get token for Petfinder API
app.get('/get-token', async (req, res) => {
  try {
    const tokenData = await getToken();
    res.json({ access_token: tokenData.access_token, token_type: tokenData.token_type, expires_in: tokenData.expires_in });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Home
app.get('/', (req, res) => {
  // Pass character dictionary to object to access values
  const characterArray = Object.values(characters);
  const neonCat = "/NeonAncient.png";
  res.render('index.njk', 
    { characters: characterArray, neonCat },
  );
  console.log(characters);
});

// Character View
app.get('/:name', async (req, res) => {
  // Get character from character dictionary
  const characterString = req.params.name;
  const character = characters[characterString];

  // If the character exists...
  if (character) {
    console.log(character.name);

    // Create navigation by finding indexes of characters
    const characterArray = Object.values(characters);
    console.log(characterArray);
    // Find index of the current character
    const currentIndex = characterArray.findIndex(char => char.name === character.name);
    console.log(currentIndex);
    const prevIndex = (currentIndex - 1 + characterArray.length) % characterArray.length;
    const nextIndex = (currentIndex + 1) % characterArray.length;

    const prevCharacter = characterArray[prevIndex];
    const nextCharacter = characterArray[nextIndex];

    // Get and save character breed data
    const BreedData = await getBreedData(character.breed);
    console.log(BreedData);
    const characterBreedData = BreedData[0];

    // Get and save character breed images
    const characterImages = await getBreedImages(characterBreedData.id);
    console.log("breed data:"+characterBreedData.name);
    res.render('character.njk', { prevCharacter, nextCharacter, characterBreedData, character, characterImages, characters });
  } else {
    res.status(404).send('Character not found');
  }
});
