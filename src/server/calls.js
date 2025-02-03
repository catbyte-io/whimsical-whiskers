import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

// Get Cat API key from environment file
const apiKey = process.env.CAT_API_KEY;

// Define URL parts
axios.defaults.baseURL = "https://api.thecatapi.com/v1/"
axios.defaults.headers.common['x-api-key'] = apiKey;