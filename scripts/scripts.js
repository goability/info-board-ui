
let stayDarkTime = 3000;
let screenSaverTimeOut = 5000;
let refreshTime = 1000;
let refreshInfo = 5000;
let refreshUpcoming = 3000;
let sliderHold = 10000;

let bar_chart_data = [];
let temp = 1 ;

//setInterval(updateList, refreshInfo); 
setInterval(updateTime, refreshTime); 
//setInterval(updateUpcoming, refreshUpcoming); 

let infoCells = ['grocery-list', 'wish-list', 'chores'];
let isSet = false;
let isDark = false;



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const chores = ['Vaccum upstairs', 'Practice Guitar', 'Practice Piano'];
const wish = ['Decide on allowance', 'Decide Stuff Schedule', 'Silver Dollar City']; 
const grocery = ['dr. pepper', 'toilet-paper', 'salt', 'milk'];

const upcoming = ['NO GUITAR ON MONDAY', 'Piano Wednesday at 11', '3D Print Next Wednesday', 'Football Tickets Delivered this week ', 'Dungeons and Dragons Wednesday at 6'];

const meals = ['Pizza', 'Pot Pie', 'Shrimp', 'PeanutButter', 'salad', 'strawberries', 'pasta', 'bread/toast', 'cheese-toast'];
const alerts = [' '];
  
document.getElementById("grocery-list").innerHTML = hydrate_list(grocery);
document.getElementById("meal-list").innerHTML = hydrate_list(meals);

function hydrate_list(item_list){
   let ul = document.createElement('ul');

   item_list.forEach(item => {
       let li = document.createElement('li');
	li.textContent = item;
	ul.appendChild(li);
     }
   )	 
	console.log(ul.outerHTML);   
	return ul.outerHTML; 
}

function screenSaver(turnOn=false)
{
	console.log('in timer');
//	clearInterval(sceenSaverTimer);
	infoCells.forEach(item => {
	 
	let el = document.getElementById(item);
	
	if (isDark || turnOn) {
	  el.classList.remove('dark');
	  theTimeOut=screenSaverTimeout;
	
	} else { 
	  el.classList.add('dark');
	  theTimeOut=stayDarkTime;
	}
	});
	isDark = !isDark;

	screenSaverTimer = setInterval(screenSaver, theTimeOut); 
}
function get_countdown_time_remaining()
{
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYears = new Date(nextYear, 0, 1); // Jan 1st of next year
    
    const timeLeft = newYears - now;
    
    // Convert to days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = (days)*24 + Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
	const paddedHours = String(hours).padStart(2, '0');
	const paddedMinutes = String(minutes).padStart(2, '0');
	const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}	
function updateTime() 
{ 
	const d = new Date();  
	d.setHours(d.getHours());
	var dayname = days[d.getDay()];
	var monthname = monthNames[d.getMonth()];
	var day = d.getDay();
	var dayOfMonth = d.getDate();
	var year = d.toLocaleDateString(undefined, {year: 'numeric'});
	var currentDate = `${dayname}  ${monthname} ${dayOfMonth}, ${year}  `; 
	document.getElementById("date").innerHTML = currentDate;
	var timeOptions = { hour:'numeric', minute:'numeric', hour12:true, second:'numeric'}; 
	document.getElementById("time").innerHTML = d.toLocaleString(undefined, timeOptions);
	document.getElementById("new_year_countdown").innerHTML = get_countdown_time_remaining();

}
function updateList(){	
	document.getElementById("chore-list").innerHTML = getRandomValue(chores);
	document.getElementById("wish-list").innerHTML = getRandomValue(wish);
}

function updateUpcoming(){ 

	var elUpcoming = document.getElementById("upcoming")
	var elAlerts = document.getElementById("alerts");
	elAlerts.classList.add('alert-large');
 
	elUpcoming.innerHTML = getRandomValue(upcoming);
	elAlerts.innerHTML = getRandomValue(alerts);
}

function getRandomValue(item_list){
	var array_len = item_list.length;
	var randomIndex = Math.floor( Math.random() * array_len);
	return item_list[randomIndex];
} 
function toggleTimer()
{
	isSet = !isSet;
	toggleText = isSet ? "Stop" : "Start";
	
	document.getElementById("toggleButton").innerHTML = toggleText;

}
function get_image_urls(searchTerm, maxResults) {
	const apiKey = '';
	const cx = '';
	const imageUrls = [];
  
	const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&searchType=image&num=${maxResults}`;

	return fetch(url)
		.then(response => response.json())
		.then(data => {
			// Define valid image extensions
			const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
			
			// Filter the URLs to only include those with valid image extensions
			const filteredUrls = data.items
				.map(item => item.link)  // Extract the URLs
				.filter(url => validExtensions.some(ext => url.toLowerCase().endsWith(`.${ext}`))); // Filter by valid extensions
			
			// Push the filtered URLs into the imageUrls array
			filteredUrls.forEach(url => {
				imageUrls.push(url);
			});
			console.log('got some images');
			console.log(imageUrls);
			return imageUrls;  // Resolve the promise with the imageUrls array
		})
		.catch(error => {
			console.error('Error:', error);
			throw error;  // Reject the promise in case of an error
		});
}

async function cycleBackgroundImagesForChildren(parentDivId, interval) {
    // Example usage:
    let max_results = document.getElementById("button_bar").childElementCount;
   
	const fun_images = await get_image_urls('amori', max_results).then(imageUrls => {
		console.log('Fetched image URLs:', imageUrls);
	}).catch(error => {
		console.error('Error fetching image URLs:', error);
	});
	

    console.log('got images' + fun_images);
    console.log('DOM loaded');

    // Get the parent div element by its ID
    const parentDivElement = document.getElementById(parentDivId);

    // Get all child elements of the parent div
    const childElements = parentDivElement.children;

    // Initialize the index to keep track of the current image
    let currentIndex = 0;
    console.log(`cycling background images ${childElements.length} imagecount= ${fun_images}`);

    // Set an interval to change the background image at a specified interval
    setInterval(() => {
        // Update the background image of each child element
        for (let i = 0; i < childElements.length; i++) {
            console.log(fun_images[currentIndex]);
            // Set the background image of the child element to the current image URL
            childElements[i].style.backgroundImage = `url('${fun_images[currentIndex]}')`;
        }

        // Increment the index
        currentIndex++;

        // Reset the index if it exceeds the number of images
        if (currentIndex >= fun_images.length) {
            currentIndex = 0;
        }
    }, interval);
}

async function loadDataItems(dataName) {
	try {
	  const response = await fetch(`http://localhost:9000/${dataName}.json`);
	  console.log(`getting data from ${dataName}`);
	  return await response.json();
	} catch (error) {
	  console.error(`Error loading data for ${dataName}:`, error);
	}
  }

document.addEventListener('DOMContentLoaded', () => {
	const slider = document.getElementById('image_slider'); // Select the sliding image container

	// Function to slide the image up
function slideUp() {
    slider.style.bottom = '0'; // Bring the slider up to the view
	console.log('sliding up');
}

// Function to slide the image down
function slideDown() {
    slider.style.bottom = '-100%'; // Move the slider back off the screen
}
	  //let configEndpoint = 'http://localhost://7000/config.json';

	  //console.log('DOM loaded, loading configuration from');
	  document.title = "Information Board";

	      // Slide the image up, wait for a while, and slide it back down

/*
	  const refreshBarChart = () => {
		loadDataItems('bar_chart_data').then(data => {
			console.log(data);
			bar_chart_data = data;
			createBarChart('barChart', bar_chart_data, temp++); // Adjust the chart height by changing the third parameter		  
		  });
		
		};
	  setInterval(refreshBarChart, 100000);
	  */
	//cycleBackgroundImagesForChildren('button_bar', 3000) // Changes background every 3 seconds
});