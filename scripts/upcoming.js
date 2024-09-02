let upcoming_data = [ 
    {
        "id": 1,
        "title": "Ethan",
        "description": "Mow grass, laundry",
        "start_date" : "2024-08-31",
        "due_date": "2024-09-03",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 2,
        "title": "Violet",
        "description": "Litter box, kitchen table",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 3,
        "title": "Olivia",
        "description": "Take Practice test, dishes",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 3,
        "title": "Ivy",
        "description": "Yard dog poop",
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
    list.innerHTML = ''; // Clear existing items

    upcoming_data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class='upcoming-item'>
            <h1>${item.title}</h1>
            <p>${item.description}</p>
        </div>
        `;
        listItem.classList.add('upcoming-item');
        list.appendChild(listItem);
    });
}
