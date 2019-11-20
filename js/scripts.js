//Fetching the data
fetchData('https://randomuser.me/api/?results=12')
.then(data => data.results)
.then(generateHTML)



function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log("Looks like there was a problem", error))
}


//helper functions

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

<<<<<<< HEAD
function generateGallery(results) {
    const galleryHTML = results.map(item => {
        console.log(item);
        const {
            results: [{
               name,
               picture,
               email,
               location
            }]
        } = item;

        const htmlString = `
=======
function generateHTML(data) {
    
    data.forEach(item => {
        
        const galleryHTML = `
>>>>>>> a7d614a72a5a9e646edcc010c1333900fe89de55
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${ item.picture.large }" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${ item.name.first } ${ item.name.last }</h3>
                        <p class="card-text">${ item.email }</p>
                        <p class="card-text cap">${ item.location.city }, ${ item.location.state }</p>
                    </div>
                </div>`
                document.getElementById('gallery').innerHTML += galleryHTML;
    });
    
    const modalHTML = `
        
        `
}

