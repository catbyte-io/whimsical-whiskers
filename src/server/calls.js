// Axios for API calls
import axios from 'axios';

// Dotenv for loading environment variables
import dotenv from 'dotenv';
dotenv.config();

// Get Cat API key from environment file
const apiKey = process.env.CAT_API_KEY;

// Define URL parts
const baseUrl = "https://api.thecatapi.com/v1/"

// Warrior cats character data
const characters = {
    fireheart: { name: 'Fireheart', link: '/fireheart', breed: 'Abyssinian'},
    bluestar: { name: 'Bluestar', link: '/bluestar', breed: 'Russian_Blue'},
    graystripe: { name: 'Graystripe', link: '/graystripe', breed: 'Maine_Coon'},
    ravenpaw: { name: 'Ravenpaw', link: '/ravenpaw', breed: 'Bombay'}
};

// Get character breed data from the CAT API
async function getBreedData(breed) {
  try {
    const response = await axios.get(
      `${baseUrl}/breeds/search?`,
      { params: {
          name: breed,
          limit: 1,
      },
        headers: {
          'x-api-key': apiKey,
        }}
    );
    return response.data;
  } catch (error) {
      console.error('There was an error fetching breed data:', error);
  }
};

// Get images by breed from the CAT API
async function getBreedImages(breed) {
  try {
    const response = await axios.get(
      `${baseUrl}/images/search?`,
      { params: {
          breed_ids: breed,
          limit: 10,
      }}
    );
    return response.data;
  } catch (error) {
    console.error('There was an error fetching cat images:', error);
  }
};

// Exports
export { characters };
export { getBreedData };
export { getBreedImages };
