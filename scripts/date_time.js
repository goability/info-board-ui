function generateLunarData() {
    const startDate = new Date('2024-09-06');
    const data = [];
    let illumination = 0.125;

    for (let i = 0; i < 365; i++) {
        // Format the date in MM-DD-YYYY format
        const formattedDate = `${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}-${startDate.getFullYear()}`;
        
        // Add the current row to the data
        data.push([illumination.toFixed(3), formattedDate]);

        // Update illumination and date
        illumination += 0.125;
        if (illumination > 0.999) {
            illumination = 0;
        }

        // Increment the date by one day
        startDate.setDate(startDate.getDate() + 1);
    }

    return data;
}

// Array of new moon dates for 2024 and 2025
const newMoonDates = [
    "01-11-2024", "02-09-2024", "03-10-2024", "04-08-2024", "05-08-2024", "06-06-2024", 
    "07-05-2024", "08-04-2024", "09-03-2024", "10-02-2024", "11-01-2024", "11-30-2024", 
    "12-30-2024", "01-28-2025", "02-26-2025", "03-28-2025", "04-27-2025", "05-27-2025", 
    "06-25-2025", "07-25-2025", "08-23-2025", "09-22-2025", "10-22-2025", "11-20-2025", 
    "12-20-2025"
];

// Helper function to parse date from "MM-DD-YYYY" format
function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);  // month is zero-indexed in JavaScript
}

// Function to calculate the difference in days between two dates
function daysBetween(date1, date2) {
    const oneDayMs = 24 * 60 * 60 * 1000;  // Milliseconds in a day
    return Math.round((date2 - date1) / oneDayMs);
}

// Function to calculate moon data (i and p) for a given date
function getMoonData(dateStr) {
    const inputDate = parseDate(dateStr);
    let referenceDate = null;
    
    // Find the most recent new moon date prior to the input date
    for (let i = newMoonDates.length - 1; i >= 0; i--) {
        const newMoonDate = parseDate(newMoonDates[i]);
        if (inputDate >= newMoonDate) {
            referenceDate = newMoonDate;
            break;
        }
    }

    if (!referenceDate) {
        throw new Error("No reference new moon date found.");
    }

    // Calculate days since the reference new moon date
    const daysSinceNewMoon = daysBetween(referenceDate, inputDate);
    const lunarCycleDays = 28.5;
    const cyclePosition = daysSinceNewMoon % lunarCycleDays;

    // Calculate illumination (i) and phase (p)
    let i = 0;
    let p = 0;
    let r = 3;

    if (cyclePosition <= lunarCycleDays / 2) {
        // Waxing phase: i increases by 0.07 per day
        i = Math.min(0.07 * cyclePosition, 0.99);
    } else {
        // Waning phase: i decreases by 0.07 per day
        i = Math.max(0.99 - 0.07 * (cyclePosition - lunarCycleDays / 2), 0);
    }

    // Phase (p) is proportional to the cycle position, converted to radians
    p = (cyclePosition / lunarCycleDays) * 2 * Math.PI;

    // Return result
    return {
        i: parseFloat(i.toFixed(3)),  // Illumination factor
        p: parseFloat(p.toFixed(3)),  // Phase in radians
        r: parseFloat(r.toFixed(3))
    };
}


function getMoonPhaseURL(targetDate){
    console.log(`Getting data for ${targetDate}`)
    // Example usage:
    const moonData = getMoonData(targetDate);//'09-17-2024'
    console.log(moonData);  // { i: 0.789, p: 5.94 }
    const url_template = "https://www.timeanddate.com/scripts/moon.php?i=MOON_ILLUMINATION&amp;p=MOON_P&amp;r=MOON_R";
 
    return url_template.replace("MOON_ILLUMINATION", moonData.i).replace("MOON_P", moonData.p).replace("MOON_R", moonData.r);
}

document.addEventListener('DOMContentLoaded', () => {
    refreshMoonPhaseImage();
    setDailyTimer();
});

function refreshMoonPhaseImage() {
    const elMoonPhase = document.getElementById('moon_phase_image');

    // Get today's date in the format "MM-DD-YYYY"
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}-${today.getFullYear()}`;

    // Get the moon phase URL for today's date
    const moonPhaseURL = getMoonPhaseURL(formattedDate);

    // Set the src of the image
    if (elMoonPhase && moonPhaseURL) {
        elMoonPhase.setAttribute('src', moonPhaseURL);
        // Alternatively, you can use:
        // elMoonPhase.src = moonPhaseURL;
    }
}
function setDailyTimer() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(3, 0, 0, 0); // Set to 3:00:00 AM
    targetTime.setMinutes(targetTime.getMinutes() - now.getTimezoneOffset() + 360); // Adjust for CST (UTC-6)

    if (targetTime <= now) {
        // If it's already past 3:00 AM CST, set for next day
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const msUntilTarget = targetTime - now;

    // Set a timeout for the first occurrence
    setTimeout(() => {
        refreshMoonPhaseImage();
        // Then set an interval for subsequent days
        setInterval(refreshMoonPhaseImage, 24 * 60 * 60 * 1000);
    }, msUntilTarget);
}

