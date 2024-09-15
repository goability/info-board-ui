document.addEventListener('DOMContentLoaded', function() {
    const whiteCircle = document.querySelector('.white-circle');
    const blackCircle = document.querySelector('.black-circle');

    // Start the white circle animation after a 1-second delay
    setTimeout(() => {
        whiteCircle.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%, 100% 0)';
        
        // After the white circle finishes (5s), start the black circle animation
        setTimeout(() => {
            // Change z-index so the black circle is on top
    
           // whiteCircle.style.zIndex = '1';
           whiteCircle.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%, 100% 0)';
            whiteCircle.style.backgroundColor = 'black'
           // whiteCircle.clipPath = 'polygon(0 0, 0 100%, 100% 100%, 100% 0)'

            //blackCircle.style.zIndex = '2';
            blackCircle.style.backgroundColor = 'white'
           // blackCircle.clipPath = 'polygon(100% 0, 100% 100%, 100% 100%, 100% 0)';
            
  
        }, 5000); // 5 seconds delay for the white circle animation to complete
    }, 1000); // 1 second delay before starting the first animation
});
