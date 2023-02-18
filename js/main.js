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

// LOGIN & SIGIN FORM

const formularioLogin = document.querySelector('#login-form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
// SINGIN
const formularioSingin = document.querySelector('#singin-form');
const singinNombre = document.querySelector('#singinNombre');
const singinApellidos = document.querySelector('#singinApellidos');
const singinEmail = document.querySelector('#singinEmail');
const singinPassword = document.querySelector('#singinPassword1');
const repetirPassword = document.querySelector('#singinPassword2');
window.addEventListener('load', () => {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        enviarFormulario(loginEmail.value, loginPassword.value);
        // enviarFormulario('prueba.prueba@iescamp.es', 'prueba');
    });
    formularioSingin.addEventListener('submit', function (e) {
        e.preventDefault();
        registrarUsuario(singinNombre.value, singinApellidos.value, singinEmail.value, singinPassword.value);
    });
});

// FORMULARIO LOGIN
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
                    text: 'EMAIL o PASSWORD incorrecto',
                    icon: 'warning',
                    button: 'Continuar'
                }).then(function () {
                    window.location = 'index.html';
                });
            } else if (data != null) {
                sessionStorage.setItem('usuario', data[0].nombre);
                sessionStorage.setItem('idusuario', data[0].id);
                window.location = 'stock.html';
            }
        });
};

// FORMULARIO SINGIN
function registrarUsuario (param1, param2, param3, param4) {
    if (singinPassword.value === repetirPassword.value) {
        const datos = new FormData();
        datos.append('opcion', 'RS');
        datos.append('nombre', param1);
        datos.append('apellidos', param2);
        datos.append('email', param3);
        datos.append('password', param4);
        const url = 'php/coop.php';
        fetch(url, {
            method: 'POST',
            body: datos
        })
            .then((data) => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: 'COOPbyDWC',
                    text: 'USUARIO REGISTRADO CON EXITO',
                    icon: 'success',
                    button: 'Continuar'
                }).then(function () {
                    window.location = 'index.html';
                });
            });
    }
    // eslint-disable-next-line no-undef
    Swal.fire({
        title: 'COOPbyDWC',
        text: 'LAS CONTRASEÑAS DEBEN COINCIDIR',
        icon: 'warning',
        button: 'Continuar'
    });
};
