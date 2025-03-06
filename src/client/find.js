import axios from 'axios';

// Load environment variables
const appUrl = import.meta.env.VITE_APP_URL;
const appPort = import.meta.env.VITE_APP_PORT;

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

// Get pets from the server
async function fetchPets(zipcode) {
    const validatedZip = await validateZip(zipcode);
    console.log(validatedZip);

    // If user has input a zipcode when the button is clicked
    if (zipcode && validatedZip.is_valid) {
        try {
            const response = await axios.get(
                `${appUrl}:${appPort}/api/fetch/${zipcode}`,
            );
            return response.data;
        } catch (error) {
            console.error('Could not fetch pets from the server', error);
        }
    }
    else {
        return ('Not valid zipcode');
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
        if (zipCode) {
            animalData = await fetchPets(zipCode);
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
