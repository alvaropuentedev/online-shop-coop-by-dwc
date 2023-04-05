const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const container = document.querySelector('#gallery-own-container');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const url = 'php/coop23.php';

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
                // DIV BUTTON
                const divButton = document.createElement('div');
                divButton.setAttribute('class', 'div-button');
                element.appendChild(divButton);
                // BUTTON
                const botonEliminar = document.createElement('button');
                const botonModificar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonModificar.textContent = 'Modificar';
                botonEliminar.setAttribute('id', articles[i].id);
                botonEliminar.setAttribute('class', 'btn btn-primary mb-2');
                botonModificar.setAttribute('id', articles[i].id);
                botonModificar.setAttribute('class', 'btn btn-primary ms-2 mb-2');
                botonEliminar.addEventListener('click', elimnarArticulo);
                divButton.appendChild(botonEliminar);
            }
        }
    } catch (error) {
        next.style.display = 'none';
    }
}

// ELIMINATE FUNC
function elimnarArticulo (e) {
    const idArticle = e.target.id;
    const formData = new FormData();
    formData.append('opcion', 'BA');
    formData.append('idarticulo', idArticle);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(() => {
            // eslint-disable-next-line no-undef
            swal.fire({
                title: 'COOPbyDWC',
                text: 'Artículo eliminado!',
                icon: 'success',
                button: 'Continuar'
            }).then(function () {
                window.location.reload();
            });
        });
}
