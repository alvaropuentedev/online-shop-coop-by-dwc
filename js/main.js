const inicio = document.querySelector('#inicio');
const singin = document.querySelector('#singin');
const login = document.querySelector('#login');
const dialogLogin = document.querySelector('#dialog-login');
const dialogSingin = document.querySelector('#dialog-singin');

// VISIBLE OR HIDDEN FOR EACH OPCION

inicio.addEventListener('click', () => {
    window.location = 'index.html';
});
singin.addEventListener('click', () => {
    if (dialogLogin.style.visibility === 'visible') {
        dialogLogin.style.visibility = 'hidden';
    }
    if (dialogSingin.style.visibility === 'hidden') {
        dialogSingin.style.visibility = 'visible';
    }
});
login.addEventListener('click', () => {
    if (dialogLogin.style.visibility === 'hidden') {
        dialogLogin.style.visibility = 'visible';
    }
    if (dialogSingin.style.visibility === 'visible') {
        dialogSingin.style.visibility = 'hidden';
    }
});

// LOGIN FORM

const formularioLogin = document.querySelector('#login-form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
window.addEventListener('load', () => {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        enviarFormulario(loginEmail.value, loginPassword.value);
        // enviarFormulario('prueba.prueba@iescamp.es', 'prueba');
    });
});

function enviarFormulario (param1, param2) {
    const datos = new FormData();
    datos.append('opcion', 'SR');
    datos.append('email', param1);
    datos.append('password', param2);
    const url = 'php/coop.php';
    fetch(url, {
        method: 'POST',
        body: datos
    })
        .then((response) => response.json())
        .then((data) => {
            if (data === null) {
                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: 'COOPbyDWC',
                    text: 'Debe iniciar sesión!',
                    icon: 'warning',
                    button: 'Continuar'
                }).then(function (result) {
                    window.location = 'index.html';
                });
            } else if (data != null) {
                mostrar(data);
            }
        });
};
function mostrar (e) {
    console.log(e);
    window.location = 'stock.html';
}
