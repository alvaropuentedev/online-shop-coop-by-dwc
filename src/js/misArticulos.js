const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const container = document.querySelector('#gallery-own-container');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const url = 'coop23.php';

let offset = 0;
const limit = 3;

// PREVIOUS BUTTON
previous.addEventListener('click', () => {
    if (offset !== 0) {
        container.innerHTML = '';
        next.style.display = '';
        offset -= 4;
        showOwnStock(offset, limit);
    }
});

// NEXT BUTTON
next.addEventListener('click', () => {
    container.innerHTML = '';
    offset += 4;
    showOwnStock(offset, limit);
});

// ONLOAD
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
    showOwnStock(offset, limit);
});

// SHOW OWN STOCK
function showOwnStock () {
    const formData = new FormData();
    formData.append('opcion', 'AV');
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            createGallery(data, offset, limit);
        });
}

// CREATE GALLERY
function createGallery (articles, offset, limit) {
    try {
        for (let i = offset; i <= offset + limit; i++) {
            if (idUser === articles[i].vendedor) {
                const element = document.createElement('div');
                element.id = 'div-article';
                element.setAttribute('class', 'text-center');
                container.appendChild(element);
                // IMG
                const imgArticle = document.createElement('img');
                imgArticle.id = 'img-article';
                imgArticle.src = 'archivos/' + articles[i].imagen;
                element.appendChild(imgArticle);
                // ARTICLE NAME
                const articleName = document.createElement('h3');
                articleName.textContent = articles[i].nombre;
                element.appendChild(articleName);
                // PRICE
                const precio = document.createElement('h4');
                const precioParse = parseFloat(articles[i].precio).toFixed(2);
                precio.textContent = precioParse + ' €';
                element.appendChild(precio);
            }
        }
    } catch (error) {
        next.style.display = 'none';
    }
}
