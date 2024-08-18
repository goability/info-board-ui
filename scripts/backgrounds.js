document.addEventListener('DOMContentLoaded', () => {
    const moon = document.querySelector('.moon');
    const scene = document.querySelector('.scene');

    // Start the moon rising animation
    setTimeout(() => {
        moon.style.bottom = `${scene.clientHeight - 150}px`;
    }, 1000);

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
