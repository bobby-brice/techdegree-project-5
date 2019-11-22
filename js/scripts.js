/*
    global variables
*/
const gallery = document.getElementById('gallery');
const modalDiv = document.createElement('div'); //creating the modal DIV and appending to the DOM after the gallery
modalDiv.setAttribute('class', 'modal-container');
gallery.parentNode.insertBefore(modalDiv, gallery.nextElementSibling);
modalDiv.style.display = 'none';
let employeeData = [];
const card = document.getElementsByClassName('card');


/*
    function to fetch and check for HTTP errors and provide input to the supporting functions
*/

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => addGallery(data))
    .then(data => randomCard(data))
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

    const modalHTML =
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
    


    $('#modal-close-btn').click(function () {
        $('.modal-container').hide();
    })


    $('button#modal-next').click(function () {
        generateModal(i + 1);
        $('.modal-container').show()

    })


    $('button#modal-prev').click(function () {
        generateModal(i - 1);
        $('.modal-container').show()

    })
    userNumber(i);
    }
    

    function userNumber(i) {
        if (i <= 0) {
            $('button#modal-prev').hide();
        } else if (i >= 11) {
            $('button#modal-next').hide();
        }

    }
    // Add Event Listener to each Card Element
    function randomCard() {
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener('click', function () {
                generateModal(i);
                $('.modal-container').show();
            })
        }
    }

