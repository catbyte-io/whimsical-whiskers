import axios from 'axios';

// Load environment variables
const appUrl = import.meta.env.VITE_APP_URL;
const appPort = import.meta.env.VITE_APP_PORT;

// Define URL parts
const baseUrl = 'https://api.petfinder.com/v2/animals';

// Get token from the server
async function fetchToken() {
    try {
        const response = await axios.get(
            `${appUrl}:${appPort}/get-token`,
        );
        return response.data;
    } catch (error) {
        console.error('Could not fetch token from the server', error);
    }
}

// Make a request to the Petfinder API based on zipcode
async function findPets(zipcode) {
    // First obtain access token from our server route
    const tokenData = await fetchToken();
    const accessToken = tokenData.access_token;

    // Make API call to Petfinder
    try {
        const response = await axios.get(
            `${baseUrl}`,
            { params: {
                type: 'Cat',
                location: zipcode,
                limit: '6',

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

// Set up the button to find pets
function setupFind(element) {
    // Button text
    element.innerHTML = 'Find my new pet';

    // Listen for button click
    element.addEventListener("click", async () => {
        // Obtain the input value for the zipcode
        const zipCode = document.querySelector('#zipCode').value;

        // If user has input a zipcode when the button is clicked
        if (zipCode) {
            const petData = await findPets(zipCode);
            console.log(petData);
        }
    });
}



export { setupFind }
