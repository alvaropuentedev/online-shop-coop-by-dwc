const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const container = document.querySelector('.gallery-container');
const url = 'php/coop.php';

// USER NAME
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
    showStock();
});
function showStock () {
    const formData = new FormData();
    formData.append('opcion', 'AV');
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((articles) => {
            for (let i = 0; i < articles.length; i++) {
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
                const boton = document.createElement('button');
                boton.textContent = 'comprar';
                boton.setAttribute('id', articles[i].id);
                boton.setAttribute('class', 'btn btn-primary mb-2');
                boton.addEventListener('click', buyArticle);
                divButton.appendChild(boton);
            }
        });
}
// BUY FUCTION
function buyArticle (e) {
    const idArticle = e.target.id;
    const formData = new FormData();
    formData.append('opcion', 'CA');
    formData.append('idarticulo', idArticle);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(() => {
            // eslint-disable-next-line no-undef
            swal.fire({
                title: 'COOPbyDWC',
                text: 'Artículo vendido!',
                icon: 'success',
                button: 'Continuar'
            }).then(function () {
                window.location.reload();
            });
        });
}
