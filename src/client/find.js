import axios from 'axios';

import noPhoto from './noPhoto.jpg';

// Load environment variables
const appUrl = import.meta.env.VITE_APP_URL;
const appPort = import.meta.env.VITE_APP_PORT;

// Validate zipcode with our server
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

// Get animals from our server
async function fetchAnimals(zipcode) {
    // Identify our element to contain any error messages
    const errorMessage = document.getElementById('errorMessage');

    // Validate the zipcode using custom validator
    const validatedZip = await validateZip(zipcode);

    // If user has input a zipcode when the button is clicked then fetch animals
    if (validatedZip && validatedZip.is_valid) {
        try {
            const response = await axios.get(
                `${appUrl}:${appPort}/api/fetch/${zipcode}`,
            );
            return response.data;
        } catch (error) {
            console.error('Could not fetch animals from the server', error);
        }
    } else if (!validatedZip.is_valid) {
        errorMessage.innerHTML = 'Please enter a valid zip';
    }
}

// Update the animal profile with new data
function updateAnimalProfile(animal) {
    const animalProfile = document.getElementById('animalProfile');
    const errorMessage = document.getElementById('errorMessage');

    // Clear data from animalProfile to start fresh
    animalProfile.innerHTML = '';

    // Clear error messages
    errorMessage.innerHTML = '';

    // Add animal profile photo
    const animalPhoto = document.createElement('img');
    animalPhoto.className = 'profile-photo';
    const photoUrls = animal.photos;
    if (photoUrls && photoUrls.length > 0) {
        animalPhoto.src = photoUrls[0].large;
    }
    else {
        animalPhoto.src = noPhoto;
    }
    animalProfile.appendChild(animalPhoto);

    // Add animal name
    const name = animal.name;
    const animalName = document.createElement('h3');
    animalName.innerHTML = `${name}`;
    animalProfile.appendChild(animalName);

    /* Add contact info */

    const contact = animal.contact;

    // Adoption center address
    const centerCity = contact.address.city;
    const centerState = contact.address.state;
    if (centerCity && centerState) {
        const centerAddr = document.createElement('h4');
        centerAddr.innerHTML = `${centerCity}, ${centerState}`;
        animalProfile.appendChild(centerAddr);
    }

    // Create table and rows to hold info
    const contactInfo = document.createElement('table');
    const contactRow1 = document.createElement('tr');

    contactInfo.appendChild(contactRow1);

    /* Create table data elements */

    // Adoption center phone
    const centerPhone = contact.phone;
    if (centerPhone) {
        const phoneColumn = document.createElement('td');
        const contactPhone = document.createElement('a');
        contactPhone.href = `tel:${centerPhone}`;
        contactPhone.innerHTML = `${centerPhone}`;
        phoneColumn.appendChild(contactPhone);
        phoneColumn.className = 'left';
        contactRow1.appendChild(phoneColumn);
    }

    // Adoption center email
    const centerEmail = contact.email;
    if (centerEmail) {
        const emailColumn = document.createElement('td');
        const contactEmail = document.createElement('a');
        contactEmail.href = `mailto:${centerEmail}`;
        contactEmail.innerHTML = `Email`;
        emailColumn.appendChild(contactEmail);
        emailColumn.className = 'left';
        contactRow1.appendChild(emailColumn);
    }

     // Add the contact info table to the page
     animalProfile.appendChild(contactInfo);

    // Adoption URL
    const animalUrl = animal.url;
    if (animalUrl) {
        const centerLink = document.createElement('a');
        centerLink.href = `${animalUrl}`;
        centerLink.innerHTML = 'Go to adoption page';
        animalProfile.appendChild(centerLink);
    }

};

// Evoke the Petfinder API to display animals for adoption
async function displayAnimals() {
    // Set variables to start new
    let counter = 0;
    let animalData = {};

    // Obtain the input value for the zipcode
    const zipCode = document.querySelector('#zipCode').value;

    // Validate
    if (zipCode) {
        // Fetch pets from our API endpoint
        animalData = await fetchAnimals(zipCode);
        console.log(animalData);

        // Display animal data if there are animals to show
        if (animalData && animalData.animals && animalData.animals.length > 0) {
            // Get the number of animals found
            const numAnimals = animalData.animals.length;

            // Clear existing navigation buttons to avoid duplication
            const prevPage = document.getElementById('prevPage');
            const nextPage = document.getElementById('nextPage');
            prevPage.innerHTML = '';
            nextPage.innerHTML = '';

            // Create navigation buttons
            const prevButton = document.createElement('button');
            const nextButton = document.createElement('button');

            prevButton.className = 'icon';
            nextButton.className = 'icon';

            const prevIcon = document.createElement('i');
            const nextIcon = document.createElement('i');

            prevIcon.className = 'bi bi-caret-left-fill';
            nextIcon.className = 'bi bi-caret-right-fill';

            prevButton.appendChild(prevIcon);
            nextButton.appendChild(nextIcon);

            // Add nav buttons to page
            const prev = document.createElement('p');
            prev.innerHTML = 'Prev';
            const next = document.createElement('p');
            next.innerHTML = 'Next';

            prevPage.appendChild(prevButton);
            prevPage.appendChild(prev);
            nextPage.appendChild(nextButton);
            nextPage.appendChild(next);

            /* Adapted from the default Vite file 'counter.js' */

            const setCounter = (count) => {
              counter = count;
            };

            /* Listen for the navigation arrows to be clicked to display the next animal profile, 
             using the value of counter to access different ones*/
            prevButton.addEventListener("click", () => {
                setCounter((counter - 1 + numAnimals) % numAnimals);
                updateAnimalProfile(animalData.animals[counter]);
            });
            nextButton.addEventListener("click", () => {
                setCounter((counter + 1) % numAnimals);
                updateAnimalProfile(animalData.animals[counter]);
            });

            // Display the first animal
            updateAnimalProfile(animalData.animals[counter]);
        }
    }
} 

// Set up the button to find pets
function setupFind(element1, element2) {
    // Button text
    element1.innerHTML = 'Find my new pet';

    // Listen for button click
    element1.addEventListener("click", async () => {
        displayAnimals();
    });

    // Listen for 'Enter' press
    element2.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            displayAnimals();
        }
    });
}


export { setupFind }
