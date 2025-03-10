// Simple animation to make paw prints follow the cursor
// https://stackoverflow.com/questions/60837081/how-to-create-a-new-element-on-cursor-dom
// https://stackoverflow.com/questions/15653801/rotating-object-to-face-mouse-pointer-on-mousemove
function paddingPaws() {
    // Track last time and set minimum interval to show paws
    let lastPawTime = 0;
    const minInterval = 300;

    // Track the previous center to calulate the difference between the previous and current center
    let previousCenter = {
        x: null,
        y: null
    };
    let angle = 0;

    document.addEventListener('mousemove', function(e) {

        // Get the current time and check if the minimum inverval has passed
        const currentTime = Date.now();
        // If not enough time has passed, return without adding prints
        if (currentTime - lastPawTime < minInterval) {
            return;
        }
        // Set last paw time to now
        lastPawTime = currentTime;

        // Create the div element and add class
        const paw = document.createElement('div');
        paw.className = 'paw-print';

        // Position paw prints at current mouse x coordinate
        paw.style.left = `${e.pageX}px`;
        // Position paw prints at current mouse y coordinate
        paw.style.top = `${e.pageY}px`;

         // Add paw div element to page
         document.body.appendChild(paw);

        // Get rectangle perimeter and center of the div
        let pawBoundingRect = paw.getBoundingClientRect();
        let pawCenter = {
            x: pawBoundingRect.left + pawBoundingRect.width / 2,
            y: pawBoundingRect.top + pawBoundingRect.height / 2
        };

        // Get angle and rotate - We must use inverted atan to account for coordinate system
        if (previousCenter.x !== null && previousCenter.y !== null) {
            angle = Math.atan2(pawCenter.x - previousCenter.x, -(pawCenter.y - previousCenter.y)) * (180 / Math.PI);
        }
        else {
            angle = Math.atan2(e.pageX - pawCenter.x, -(e.pageY - pawCenter.y)) * (180 / Math.PI);
        }
        paw.style.transform = `rotate(${angle}deg)`; // Apply rotation to div
        console.log(angle);

        // Assign previous center the value of the current paw center before the event starts over
        previousCenter = pawCenter;
        console.log(pawCenter);

         // Add delay before showing paw
         setTimeout(function() {
            paw.style.opacity = '1';
        }, 500);

        // Remove paw after 1 second
        setTimeout(function() {
            paw.remove();
        }, 1500);

    });
}

export { paddingPaws }
