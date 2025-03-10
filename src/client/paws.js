// Animation for page loads - alternating paw prints
export function pageLoader() {
    // Create div element and set class to page-loader and set id
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.id = 'loader';

    // Rotate the div 45 degrees to the left and set transparency
    loader.style.transform = `rotate(-45deg)`;
    loader.style.opacity = '0.8';

    // Add the loader to the bocy element
    document.body.appendChild(loader);

    // Set size for drawing canvas
    const canvasSize = 200; 

    // Create p5.js sketch animation (https://p5js.org/reference/p5/p5/)
    function sketch(p) {
        p.setup = function() {
            // Set loader as parent element of the canvas
            p.createCanvas(canvasSize, canvasSize).parent('loader');

            // No shape outlines
            p.noStroke();

            // Set frames per second to slow down the animation
            p.frameRate(3);
        };

        // Set sizes
        const pawSize = 12;
        const beanSize = 7.5; 

        // Offset for paw spacing
        const offset = 35;

        // Starting points of shapes on the canvas
        const xStart = 150;
        const yStart = 175;

        // Set variables for paw locations
        let x = xStart;
        let y = yStart;

        // Shapes for individual paws
        function drawPaw(posX, posY) {
            // Color fill for shapes
            p.fill(89, 216, 230);
            // Main pad
            p.ellipse(posX, posY+4, pawSize, pawSize+2);
            p.ellipse(posX+4, posY+4, pawSize, pawSize+2);
            p.ellipse(posX-4, posY+4, pawSize, pawSize+2);  
            p.ellipse(posX, posY-2, pawSize-2, pawSize-4);
            p.ellipse(posX-2, posY-2, pawSize-2, pawSize-4); 
            p.ellipse(posX+2, posY-2, pawSize-2, pawSize-4); 

            // Toe Beans
            p.ellipse(posX-14, posY-15, beanSize, beanSize+5);
            p.ellipse(posX+14, posY-15, beanSize, beanSize+5);
            p.ellipse(posX-6, posY-27, beanSize, beanSize+6);
            p.ellipse(posX+6, posY-27, beanSize, beanSize+6);
            
        }

        // Draw a rectangle the size of the canvas to act as an eraser to reset canvas after 4 prints
        function drawRect() {
            // Anything drawn after this will erase pixels
            p.erase();

            // Draw a rectangle the size of the canvas
            p.rect(0, 0, canvasSize, canvasSize);
        }

        // Drawing instructions per frame
        p.draw = function() {
            // Unset eraser
            p.noErase();

            // Draw a paw at the current values of x and y
            drawPaw(x, y);
            
            // Decrement x and y by the offset value so paws are alternated and advance
            x -= offset;
            y -= offset;
            
            // Reset x to simulate alternating paws and avoid going far to the left
            if (x < 110) {
                x = xStart;
            }
            
            // Reset y to set paw steps at the beginning of the canvas and avoid stepping out of it
            if (y < 25) {
                y = yStart;
                
                // Draw eraser rectangle to clear canvas so paw prints are not overlapped
                drawRect();
            }
        };
    }

    // Create the p5.js sketch
    new p5(sketch);

    // Remove the sketch after 5 seconds
    setTimeout(() => {
        loader.remove();
    }, 4700);
}
