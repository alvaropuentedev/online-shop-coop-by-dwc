const usuario = sessionStorage.getItem('usuario');
const formSelect = document.querySelector('.form-select');
const sellForm = document.querySelector('#sell-form');
const url = 'php/coop.php';

// USER NAME
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
    showCategory();
});

function showCategory () {
    const formData = new FormData();
    formData.append('opcion', 'TC');
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const option = document.createElement('option');
                option.textContent = data[i].nombre;
                option.setAttribute('value', data[i].id);
                formSelect.appendChild(option);
            }
        });
}
