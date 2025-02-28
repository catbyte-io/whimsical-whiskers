import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const clientId = process.env.PET_API_KEY;
const clientSecret = process.env.CLIENT_SECRET;

// Get access token for the Petfinder API
async function getToken() {
    try {
        const response = await axios.post(
            'https://api.petfinder.com/v2/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            })
        );
        return response.data;
    } catch (error) {
        console.error('There was an error authenticating...do you have an API key?', error);
    }
}

export { getToken }
