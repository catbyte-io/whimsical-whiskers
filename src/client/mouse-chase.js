function paddingPaws() { 
  // Simple animation to make paw prints follow the cursor
  // https://stackoverflow.com/questions/15653801/rotating-object-to-face-mouse-pointer-on-mousemove
    document.addEventListener('mousemove', function(e) {
        let paw = document.createElement('div');
        paw.className = 'paw-print';

        // Position paw prints at current mouse x coordinate
        paw.style.left = e.pageX + 'px';
        // Position paw prints at current mouse y coordinate
        paw.style.top = e.pageY + 'px';

        // Add paw div element to page
        document.body.appendChild(paw);

        // Get rectangle of the div
        let pawBoundingRect = paw.getBoundingClientRect();
        // Get center of the div
        let pawCenter = {
            x: pawBoundingRect.left + pawBoundingRect.width/2,
            y: pawBoundingRect.right + pawBoundingRect.height/2
        };
        // Get angle and rotate
        let angle = Math.atan2(e.pageX - pawCenter.x, - (e.pageY - pawCenter.y)) * (180 / Math.PI);
        paw.style.transform = `rotate(${angle - 180}deg)`;

         // Add delay before showing paw
         setTimeout(function() {
            paw.style.opacity = '1';  // Ensure the paw is visible after delay
        }, 500);

        // Remove paw after 1 second
        setTimeout(function() {
            paw.remove();
        }, 1500);

    });
}

export { paddingPaws }
