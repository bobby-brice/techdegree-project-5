//Fetching the data

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log("Looks like there was a problem", error))
}

Promise.all([
        fetchData('https://randomuser.me/api/?results=12')
    ])
    .then(result => { 
        console.log(result);
        generateGallery(result);   
    })


//helper functions

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateGallery(results) {
    const galleryHTML = results.map(item => {
        console.log(item);

        const htmlString = `
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${ item.picture.large }" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${ item.name.first } ${ item.name.last }</h3>
                        <p class="card-text">${ item.email }</p>
                        <p class="card-text cap">${ item.location.city }, ${ item.location.state }</p>
                    </div>
                </div>
        `;
        return htmlString;
    }).join('');

    document.getElementById('gallery').appendChild(galleryHTML);
}

