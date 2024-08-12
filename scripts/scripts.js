let stayDarkTime = 3000;
let screenSaverTimeOut = 5000;
let refreshTime = 1000;
let refreshInfo = 5000;
let refreshUpcoming = 3000;
let refreshTimer = setInterval(updateList, refreshInfo); 
setInterval(updateTime, refreshTime); 
setInterval(updateUpcoming, refreshUpcoming); 
let infoCells = ['grocery-list', 'wish-list', 'chores'];
let isSet = false;
let isDark = false;

let componentLarge = 'alerts'; 
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const chores = ['Vaccum upstairs', 'Practice Guitar', 'Practice Piano'];
const wish = ['Decide on allowance', 'Decide Stuff Schedule', 'Silver Dollar City']; 
const grocery = ['dr. pepper', 'toilet-paper', 'salt', 'milk'];

const upcoming = ['NO GUITAR ON MONDAY', 'Piano Wednesday at 11', '3D Print Next Wednesday', 'Football Tickets Delivered this week ', 'Dungeons and Dragons Wednesday at 6'];

const meals = ['Pizza', 'Pot Pie', 'Shrimp', 'PeanutButter', 'salad', 'strawberries', 'pasta', 'bread/toast', 'cheese-toast'];
const alerts = ['Olivia\'s Birthday - August 10'];
  
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
}
function updateList(){	
	document.getElementById("chore-list").innerHTML = getRandomValue(chores);
	document.getElementById("wish-list").innerHTML = getRandomValue(wish);
}

function updateUpcoming(){ 

	var elUpcoming = document.getElementById("upcoming")
	var elAlerts = document.getElementById("alerts");
/*	if(componentLarge ==='alerts'){
		 componentLarge = 'upcoming';
		 elUpcoming.classList.add('alert-large');
		 elAlerts.classList.remove('alert-large');
 	} else {
		componentLarget = 'upcoming';
		elAlerts.classList.add('alert-large');
		elUpcoming.classList.remove('alert-large');
	}
*/
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



