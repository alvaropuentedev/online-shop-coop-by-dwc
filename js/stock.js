const usuario = sessionStorage.getItem('usuario');
const container = document.querySelector('.gallery-container');
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
});
window.addEventListener('load', function () {
    showStock();
});
function showStock () {
    const formData = new FormData();
    formData.append('opcion', 'AV');
    const url = 'php/coop.php';
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((articles) => {
            for (let i = 0; i < articles.length; i++) {
                const element = document.createElement('div');
                container.appendChild(element);
                const imgArticle = document.createElement('img');
                imgArticle.id = 'img-article';
                imgArticle.src = 'img/' + articles[i].imagen;
                element.appendChild(imgArticle);
            }
        });
}
