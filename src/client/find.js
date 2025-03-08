import axios from 'axios';

import noPhoto from './noPhoto.jpg';

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

// Update the animal profile with new data
function updateAnimalProfile(animal) {
    // Clear the profile to start fresh
    animalProfile.innerHTML = '';

    // Add animal profile photo
    let animalPhoto = document.createElement('img');
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
    let animalName = document.createElement('h3');
    animalName.innerHTML = `${name}`;
    animalProfile.appendChild(animalName);

    /* Add contact info */

    const contact = animal.contact;

    // Adoption center address
    let centerCity = contact.address.city;
    let centerState = contact.address.state;
    if (centerCity && centerState) {
        let centerAddr = document.createElement('h4');
        centerAddr.innerHTML = `${centerCity}, ${centerState}`;
        animalProfile.appendChild(centerAddr);
    }

    // Create table and rows to hold info
    let contactInfo = document.createElement('table');
    let contactRow1 = document.createElement('tr');

    contactInfo.appendChild(contactRow1);

    /* Create table data elements */

    // Adoption center phone
    let centerPhone = contact.phone;
    if (centerPhone) {
        let phoneColumn = document.createElement('td');
        let contactPhone = document.createElement('a');
        contactPhone.href = `tel:${centerPhone}`;
        contactPhone.innerHTML = `Call: ${centerPhone}`;
        phoneColumn.appendChild(contactPhone);
        contactRow1.appendChild(phoneColumn);
    }

    // Adoption center email
    let centerEmail = contact.email;
    if (centerEmail) {
        let emailColumn = document.createElement('td');
        let contactEmail = document.createElement('a');
        contactEmail.href = `mailto:${centerEmail}`;
        contactEmail.innerHTML = `Email: ${centerEmail}`;
        emailColumn.appendChild(contactEmail);
        contactRow1.appendChild(emailColumn);
    }

    // Add the contact info table to the page
    animalProfile.appendChild(contactInfo);
};

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

        // Set variables to start new
        var counter = 0;
        var animalData;

        // Obtain the input value for the zipcode
        const zipCode = document.querySelector('#zipCode').value;

        // Validate
        if (zipCode) {
            // Fetch pets from our API endpoint
            animalData = await fetchPets(zipCode);
            console.log(animalData);

            // Get the number of animals found
            const numAnimals = animalData.animals.length;

            // Display animal data if there are animals to show
            if (animalData && animalData.animals && numAnimals > 0) {
                // Create navigation buttons
                let prevButton = document.createElement('button');
                let nextButton = document.createElement('button');

                prevButton.className = 'icon';
                nextButton.className = 'icon';

                let prevIcon = document.createElement('i');
                let nextIcon = document.createElement('i');

                prevIcon.className = 'bi bi-caret-left-fill';
                nextIcon.className = 'bi bi-caret-right-fill';

                prevButton.appendChild(prevIcon);
                nextButton.appendChild(nextIcon);

                // Add nav buttons to page
                prevPage = document.getElementById('prevPage');
                let prev = document.createElement('p');
                prev.innerHTML = 'Prev';
                nextPage = document.getElementById('nextPage');
                let next = document.createElement('p');
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
    });
}


export { setupFind }
