import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

// Get Cat API key from environment file
const apiKey = process.env.CAT_API_KEY;

// Define URL parts
axios.defaults.baseURL = "https://api.thecatapi.com/v1/"
axios.defaults.headers.common['x-api-key'] = apiKey;

// Warrior cats character data
const characters = [
    { name: 'Fireheart', link: 'character/fireheart', breed: 'Abyssinian'},
    { name: 'Bluestar', link: 'character/bluestar', breed: 'Russian_Blue'},
    { name: 'Graystripe', link: 'character/graystripe', breed: 'Maine_Coon'}
  ];

// Get character breed data from the CAT API
async function getBreedData(breed) {
  try {
    const response = await axios.get(
      '/breeds',
      { params: {
          breed: breed,
          limit: 10,
      }}
    );
    return response.data;
  } catch (error) {
      console.error('There was an error fetching breed data');
  }
};

// Get images by breed from the CAT API
async function getBreedImages(breed) {
  try {
    const response = await axios.get(
      'images/',
      { params: {
          breed: breed,
          limit: 10,
      }}
    );
    return response.data;
  } catch (error) {
    console.error('There was an error fetching cat images');
  }
};

// Exports
export { characters };
export { getBreedData };
export { getBreedImages };
