import express from "express";
import ViteExpress from "vite-express";
import nunjucks from 'nunjucks';

import { characters, getBreedData, getBreedImages } from "./calls.js";
import { findPets } from "./finder.js";
import { validateZip } from "./validate.js";

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

/* Routes */

// Our endpoint for pets from Petfinder API
app.get('/api/fetch/:zipcode', async (req, res, next) => {
  const zipCode = req.params.zipcode;
  try {
    const petData = await findPets(zipCode);
    res.json({ animals: petData.animals });// Respond with animal data in json form
  } catch (error) {
    // Send error to middleware
    error.status = 500;
    next(error);
  }
});

// Our endpoint to validate zipcode input
app.get('/api/:zipcode', (req, res, next) => {
  const zip = req.params.zipcode;
  try {
    const isValidZip = validateZip(zip);
    res.json({ is_valid: isValidZip }); // Respond with validity in json form
  } catch (error) {
    // Send error to middleware
    error.status = 500;
    next(error);
  }
});

// Home
app.get('/', (req, res) => {
  // Pass character dictionary to object to access values
  const characterArray = Object.values(characters);

  // Assign a variable for the main image
  const neonCat = "/NeonAncient.png";

  // Render the index page, homepage, with the context for use in template
  res.render('index.njk', 
    { characters: characterArray, neonCat },
  );
});

// Character View
app.get('/:name', async (req, res, next) => {
  try {
    // Get character from character dictionary
    const characterString = req.params.name;
    const character = characters[characterString];

    // Exit if no character found
    if (!character) {
      const error = new Error('There is no data found for the character specified');
      error.status = 404;
      next(error);
    }

    /* If the character exists create the navigation and retrieve the breed information and images */
    // Create navigation by finding indices of characters
    const characterArray = Object.values(characters);

    // Find index of the current character
    const currentIndex = characterArray.findIndex(char => char.name === character.name);

    // Set the index of the previous and next characters
    const prevIndex = (currentIndex - 1 + characterArray.length) % characterArray.length;
    const nextIndex = (currentIndex + 1) % characterArray.length;

    // Set previous and next characters based on indices
    const prevCharacter = characterArray[prevIndex];
    const nextCharacter = characterArray[nextIndex];

    // Get and save character breed data
    const BreedData = await getBreedData(character.breed);
    const characterBreedData = BreedData[0];

    // Get and save character breed images
    const characterImages = await getBreedImages(characterBreedData.id);

    // Render the character template with context
    res.render('character.njk', { prevCharacter, nextCharacter, characterBreedData, character, characterImages, characters });

  } catch (error) {
    // Send to error handling middleware
    error.message = 'Breed data not found';
    error.status = 404;
    next(error);
  }
});

// Configure error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error.njk', { errorMessage: err.message || 'Something went wrong' });
});
