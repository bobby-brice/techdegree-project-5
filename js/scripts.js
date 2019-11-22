/*
    global variables
*/
const gallery = document.getElementById('gallery');
const modalDiv = document.getElementsByClassName('modal-container');
const modalInner = document.getElementsByClassName('modal');
let employeeData = [];
const card = document.getElementsByClassName('card');


/*
    function to fetch and check for HTTP errors before our fetchData function sends the data
*/
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log("Looks like there was a problem", error));
}

/*
    function to fetch data and call our helper functions
*/
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => data.results.map(data => {
        console.log(data);
        generateGallery(data);
        generateModal(data);
        employeeData.push(data);
    }))

/* 
function to handle HTTP errors
*/

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(`${response.status} -- ${response.statusText}`))
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
function to create the employee gallery in the DOM
*/
function generateGallery(person) {

    const galleryHTML = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${person.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
    </div>`

    gallery.innerHTML += galleryHTML;
}

/*
    function to add json data for modal html 
*/

function generateModal(person) {
    const year = person.dob.date.slice(0, 4); //formatting the DOB to match markup
    const month = person.dob.date.slice(5, 7);
    const day = person.dob.date.slice(8, 10);
    const newBirthday = `${month}-${day}-${year}`

    const modalDiv = document.createElement('div'); //creating the modal DIV and appending to the DOM after the gallery
    modalDiv.setAttribute('class', 'modal-container');
    gallery.parentNode.insertBefore(modalDiv, gallery.nextElementSibling);

    const modalHTML =
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${person.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}, ${person.location.state}</p>
                <hr>
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name} ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${newBirthday}</p>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`

    modalDiv.innerHTML += modalHTML;
    modalDiv.style.display = 'none';
}

//Currently, modal data is added and hidden on the page using the map function on the {results data}

//I tried to add an event listener to the card div to change the modal divs style.display to block but it returned 'card is not a function' and wouldn't fire

//Plan was to have the clicked modal display and then target the next and prev buttons to move to the sibling element

//Should I remove all the modal data from map and create a shell, then use the employeeData arrays index to dynamically add the card selected data to the modal div on click? 

//I've been stuck on this for such a long time now and nothings working so I need some advice to move forward



    


