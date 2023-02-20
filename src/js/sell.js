const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const sellForm = document.querySelector('#sell-form');
const imgSelected = document.querySelector('#img-selected');
const formFile = document.querySelector('#form-file');
const inputVendedor = document.querySelector('#vendedor');
const category = document.querySelector('.form-select');
const articleName = document.querySelector('#name-article');
const price = document.querySelector('#price');
const descripcion = document.querySelector('#text-description');
const url = 'php/coop.php';
// ONLOAD
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
    inputVendedor.setAttribute('value', usuario);
    showCategory();
    imgPreview();
});

// SUBMIT FORM
sellForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sellArticle(category.value, articleName.value, price.value, descripcion.value);
});

// SHOW CATEGORY
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
                category.appendChild(option);
            }
        });
}

// IMG PREVIEW
async function imgPreview () {
    formFile.addEventListener('change', function (e) {
        if (e.target.files[0].type.match('image/*')) {
            imgSelected.src = URL.createObjectURL(e.target.files[0]);
        } else {
            // eslint-disable-next-line no-undef
            Swal.fire({
                title: 'COOPbyDWC',
                text: 'ELIGE UN FORMATO DE IMAGEN CORRECTO (PNG/JPG)',
                icon: 'warning',
                button: 'Continuar'
            }).then(imgPreview);
        }
    });
}

// PUT ARTICLE TO SELL
function sellArticle (param1, param2, param3, param4) {
    if (param1 < 1) {
        // eslint-disable-next-line no-undef
        Swal.fire({
            title: 'COOPbyDWC',
            text: 'DEBE SELECCIONAR UNA CATEGORÍA',
            icon: 'warning',
            button: 'Continuar'
        });
    } if (param1 > 0) {
        const formData = new FormData();
        formData.append('opcion', 'RA');
        formData.append('categoria', param1);
        formData.append('nombre', param2);
        formData.append('precio', param3);
        formData.append('imagen', formFile.files[0]);
        formData.append('descripcion', param4);
        formData.append('vendedor', idUser);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(() => {
            // eslint-disable-next-line no-undef
                Swal.fire({
                    title: 'COOPbyDWC',
                    text: 'Artículo puesto a la venta',
                    icon: 'success',
                    button: 'Continuar'
                }).then(function () {
                    window.location = 'stock.html';
                });
            });
    }
}
