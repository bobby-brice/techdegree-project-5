/*
    global variables
*/
const gallery = document.getElementById('gallery');
const modalDiv = document.createElement('div'); //creating the modal DIV and appending to the DOM after the gallery
modalDiv.setAttribute('class', 'modal-container');
gallery.parentNode.insertBefore(modalDiv, gallery.nextElementSibling);
modalDiv.style.display = 'none';
let employeeData = []; //empty array to hold the json object
const card = document.getElementsByClassName('card');


/*
    function to fetch and check for HTTP errors and provide input to the supporting functions
*/

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => addGallery(data))
    .then(data => generateCard(data))
    .catch(error => console.log("Looks like there was a problem", error))


/* 
function to create the employee gallery in the DOM
*/
function addGallery(data) {
    employeeData = data.results;
    const person = employeeData;

    person.forEach(user => {
        const galleryHTML = `
        <div class="card">
             <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>`;

        // Add  to gallery
        gallery.innerHTML += galleryHTML;

    });

}
        
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

/*
    function to add json data for modal html 
*/

function generateModal(i) {

    const employee = employeeData[i]; 

    const year = employee.dob.date.slice(0, 4); //formatting the DOB to match markup
    const month = employee.dob.date.slice(5, 7);
    const day = employee.dob.date.slice(8, 10);
    const newBirthday = `${month}-${day}-${year}`

    const modalHTML = //html template literal to add array data dynamically 
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${newBirthday}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`

    modalDiv.innerHTML = modalHTML;

/*
    modal functions for open/close/prev/next
*/
    const close = document.getElementById('modal-close-btn');
    const next = document.getElementById('modal-next');
    const prev = document.getElementById('modal-prev');

    close.addEventListener('click', () => {
        modalDiv.style.display = 'none';
    })


    next.addEventListener('click', () => {
        generateModal(i + 1);
        modalDiv.style.display = 'block';
    })


    prev.addEventListener('click', () => {
        generateModal(i - 1);
        modalDiv.style.display = 'block';

    })
    employeeNumber(i);
    }
    
/*
    Function to show or hide the next and previous buttons when the beginning/end of the employee card
*/
    function employeeNumber(i) {
        const next = document.getElementById('modal-next');
        const prev = document.getElementById('modal-prev');
        if (i <= 0) {
            prev.style.display = 'none';
        } else if (i >= 11) {
            next.style.display = 'none';
        }
    }

/*
    Event listener to call the generateModal at the selected card index and display it
*/
    function generateCard() {
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener('click', function () {
                generateModal(i);
                modalDiv.style.display = 'block';
            })
        }
    }

/*
    SEARCH FUNCTIONALITY SECTION
*/
    const searchContainer = document.querySelector('.search-container');
    const searchForm = document.createElement('form');
    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'get');
    searchContainer.appendChild(searchForm); //sets up the form element and appends to the container

    searchForm.innerHTML = ` 
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `; //suggested markup

    const searchInput = document.getElementById('search-input'); //targeting the search input and submit
    const submit = document.getElementById('search-submit');

    submit.addEventListener('click', searchEmployee); //on submit uses a callback to trigger the search function

    function searchEmployee (e) {
        
        for (let i = 0; i < card.length; i++) {
            const name = card[i].querySelector('#name').textContent.toLowerCase(); //normalize the content
            if (name.includes(searchInput.value.toLowerCase())) { //if the input includes the search value
                card[i].style.display = "flex";
            } else {
                e.preventDefault();
                card[i].style.display = 'none';
            }
        }
    }

