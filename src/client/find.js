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
            `${appUrl}:${appPort}/api/get-token`,
        );
        return response.data;
    } catch (error) {
        console.error('Could not fetch token from the server', error);
    }
}

// Validate zipcode with the server
async function validateZip(zipcode) {
    try {
        const response = await axios.get(
            `${appUrl}:${appPort}/api/${zipcode}`,
        );
        return response.data;
    } catch (error) {
        console.error('Invalid zipcode', error);
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

// Set up the button to find pets
function setupFind(element) {
    // Button text
    element.innerHTML = 'Find my new pet';

    // Get the photo element
    const animalProfile = document.getElementById('animalProfile');

    // Listen for button click
    element.addEventListener("click", async () => {
        // Clear data from animalProfile to start fresh
        animalProfile.innerHTML = '';

        var animalData;

        // Obtain the input value for the zipcode
        const zipCode = document.querySelector('#zipCode').value;

        // Validate
        const validatedZip = await validateZip(zipCode);
        console.log(validatedZip);

        // If user has input a zipcode when the button is clicked
        if (zipCode && validatedZip.is_valid) {
            animalData = await findPets(zipCode);
            console.log(animalData);

            // Display animal data
            if (animalData && animalData.animals && animalData.animals.length > 0) {
                const animal = animalData.animals[0];
                console.log(animal);
                const photoUrls = animal.photos;
                if (photoUrls && photoUrls.length > 0) {
                    let animalPhoto = document.createElement('img');
                    animalPhoto.src = photoUrls[0].small;
                    animalPhoto.className = 'profile-photo';
                    animalProfile.appendChild(animalPhoto);
                }
            }
        }
    });
}



export { setupFind }
