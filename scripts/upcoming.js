let upcoming_data = [ 
    {
        "id": 1,
        "title": "Clean out around gas pipes",
        "description": "Gas company need access",
        "start_date" : "2024-08-31",
        "due_date": "2024-09-03 07:00:00",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 2,
        "title": "Labor Day Holiday",
        "description": "holiday",
        "start_date" : "2024-09-02",
        "due_date": "2024-09-02",
        "completed": false,
        "image_large_url" : "",
        "image_small_url" : ""
    },
    {
        "id": 3,
        "title": "Meet friends at park",
        "description": "meet up with friends",
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
            <strong>${item.title}</strong>
            <p>${item.description}</p>
            <p>${item.due_date}</p>
        </div>
        `;
        listItem.classList.add('upcoming-item');
        list.appendChild(listItem);
    });
}
