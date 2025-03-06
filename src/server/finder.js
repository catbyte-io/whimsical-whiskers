import axios from "axios";

import { getToken } from "./token.js";

// Define URL parts
const baseUrl = 'https://api.petfinder.com/v2/animals';

// Make a request to the Petfinder API based on zipcode
async function findPets(zipcode) {
    // First obtain access token from our server route
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;

    // Make API call to Petfinder
    try {
        const response = await axios.get(
            `${baseUrl}`,
            { params: {
                type: 'Cat',
                location: zipcode,
                limit: '10',

            },
              headers: {
                'Authorization': `${tokenData.token_type} ${accessToken}`,
              }}
        );
        return response.data;
    } catch (error) {
        console.error('Could not fetch pets at this time', error);
    }

}

export { findPets }
