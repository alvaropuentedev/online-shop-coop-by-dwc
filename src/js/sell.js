const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const formSelect = document.querySelector('.form-select');
const sellForm = document.querySelector('#sell-form');
const imgSelected = document.querySelector('#img-selected');
const formFile = document.querySelector('#form-file');
const inputVendedor = document.querySelector('#vendedor');
const url = 'php/coop.php';

// USER NAME
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
    inputVendedor.setAttribute('value', usuario);
    showCategory();
    imgPreview();
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

function imgPreview () {
    formFile.addEventListener('change', imgPreview);
    imgSelected.src = URL.createObjectURL(event.target.files[0]);
}
