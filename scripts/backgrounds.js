document.addEventListener('DOMContentLoaded', () => {
    const moon = document.querySelector('.moon');
    const scene = document.querySelector('.scene');

    // Function to animate the moon rising and resetting
    function startMoonAnimation() {
        moon.style.transform = 'translateX(-50%) translateY(0)'; // Start moon at bottom
        setTimeout(() => {
            moon.style.transform = `translateX(-50%) translateY(-${scene.clientHeight - 150}px)`; // Animate moon rising
        }, 1000); // Start rising after 1 second

        // After the rise completes, reset the moon after a delay of 5 seconds
        setTimeout(() => {
            moon.style.transform = 'translateX(-50%) translateY(0)'; // Reset moon position to bottom
        }, 11000); // Reset after 10 seconds of rising + 1 second delay
    }

    // Start the moon animation loop every 15 seconds (10s rising + 5s delay)
    setInterval(startMoonAnimation, 15000);

    // Start the first moon rise immediately
    startMoonAnimation();

    // Add stars to the scene
    for (let i = 0; i < 1000; i++) {
        createStar();
    }

    for (let i = 0; i < 50; i++) {  // You can adjust the number of iterations as needed
        let top = Math.floor(Math.random() * 1000);
        let left = Math.floor(Math.random() * 1000);
        let minWidth = 300;
        let maxWidth = 800;

        buildCloudParts(
            { width:  Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth, height: Math.floor(Math.random() * (100 - 50 + 1)) + 50, top: top, left: left },
            { width:  Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth, height: Math.floor(Math.random() * (100 - 50 + 1)) + 50, top: top, left: left },
            { width:  Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth, height: Math.floor(Math.random() * (100 - 50 + 1)) + 50, top: top, left: left },
            { width:  Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth, height: Math.floor(Math.random() * (100 - 50 + 1)) + 50, top: top, left: left }
        );
    }
});

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    document.querySelector('.scene').appendChild(star);
}

function buildCloudParts(...partsData) {
    const cloud = document.getElementById('scene'); // Assuming you have a container element with id 'cloud'


    const parts = partsData.map((part, index) => ({
        width: part.width,
        height: part.height + (index * 10),
        top: part.top - (index * 30),
        left: part.left,
        opacity: Math.max(0.3 - (index * 0.1), 0.1)
    }));

    parts.forEach(part => {
        const cloudPart = document.createElement('div');
        cloudPart.className = 'cloud-part';
        cloudPart.style.width = `${part.width}px`;
        cloudPart.style.height = `${part.height}px`;
        cloudPart.style.top = `${part.top}px`;
        cloudPart.style.left = `${part.left}px`;
        cloudPart.style.opacity = part.opacity;
        cloud.appendChild(cloudPart);
    });
}
