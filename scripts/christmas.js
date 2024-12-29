
const christmasImages = [
  '../images/christmas/c1.png',
  '../images/christmas/c2.png',
  '../images/christmas/c3.png',
  '../images/christmas/c4.png',
  '../images/christmas/c5.png',
  '../images/christmas/c6.png',
  '../images/christmas/c7.png',
  '../images/christmas/c8.png'
];
// Function to rotate Christmas images daily at midnight
function rotateChristmasImage() {
  // Get current date to use as index
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  // Calculate index using modulo to cycle through array
  const imageIndex = 5;
  
  // Set the image source
  document.getElementById('christmas_image').src = christmasImages[imageIndex];

  console.log('Image changed to:', christmasImages[imageIndex]);
}
console.log('here');
// Initial call to set first image
rotateChristmasImage();

// Set up timer to check for midnight
setInterval(() => {
  const now = new Date();
  if(now.getHours() === 0 && now.getMinutes() === 0) {
    rotateChristmasImage();
  }
}, 36000); // Check every hour