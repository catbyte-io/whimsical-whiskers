function paddingPaws() { 
  // Simple animation to make paw prints follow the cursor
    document.addEventListener('mousemove', function(e) {
        let paw = document.createElement('div');
        paw.className = 'paw-print';
        // Position paw prints at current mouse x coordinate
        paw.style.left = e.pageX + 'px';
        // Position paw prints at current mouse y coordinate
        paw.style.top = e.pageY + 'px';

        // Add paw div element to page
        setTimeout(function() {
            document.body.appendChild(paw);
        }, 500);

        // Remove paw after 1 second
        setTimeout(function() {
            paw.remove();
        }, 1500);

    });
}

export { paddingPaws }
