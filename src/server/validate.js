// Validate that zipcode is input correctly and is valid
async function validateZip(zipcode) {
    // Check that zipcode is a string
    if (typeof zipcode !== 'string') {
        return false;
    }

    // Test zipcode for validity
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    return zipCodePattern.test(zipcode);
}

export { validateZip }
