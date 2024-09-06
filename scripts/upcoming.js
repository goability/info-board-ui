let upcoming_data = [ 
    {
        "id": 1,
        "title": "Mom",
        "description": "Hair Leave at 1:30 !",
        "start_date" : "2024-08-31",
        "due_date": "2024-09-03",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 2,
        "title": "Dad",
        "description": "Find 19v cable",
        "start_date" : "2024-08-31",
        "due_date": "2024-09-03",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 5,
        "title": "Violet",
        "description": "Litter box, upstairs laundry and trash",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 4,
        "title": "Olivia",
        "description": "Kitchen dishes and table, room trash",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 6,
        "title": "Ivy",
        "description": "Yard dog poop",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 3,
        "title": "Ethan",
        "description": "Bathroom, laundry, trash",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    }
];
populateUpcomingList();

//TODO Pull from an API
// loadDataItems('statesAndCapitalData');

function populateUpcomingList() {
    const list = document.getElementById('upcoming_list');
   // list.innerHTML = ''; // Clear existing items

    upcoming_data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class='upcoming-item'>
            <h1>${item.title}</h1>
            <span>${item.description}</span>
        </div>
        `;
        listItem.classList.add('upcoming-item');
        list.appendChild(listItem);
    });
}
