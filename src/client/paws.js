// Animation for page loads
function pageLoader() {
    // Find page center to position div
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create div element and set class to page-loader
    let loader = document.createElement('div');
    loader.className = 'page-loader';

    loader.style.left = centerX;
    loader.style.right = centerY;

    function setup()
}