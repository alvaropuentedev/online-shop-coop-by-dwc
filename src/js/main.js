const inicio = document.querySelector('#inicio');
const signup = document.querySelector('#signup');
const login = document.querySelector('#login');
const dialogLogin = document.querySelector('#dialog-login');
const dialogsignup = document.querySelector('#dialog-signup');

// VISIBLE OR HIDDEN FOR EACH OPCION

inicio.addEventListener('click', () => {
    window.location = 'index.html';
});
signup.addEventListener('click', () => {
    dialogsignup.setAttribute('open', 'true');
    dialogLogin.removeAttribute('open');
});
login.addEventListener('click', () => {
    dialogLogin.setAttribute('open', 'true');
    dialogsignup.removeAttribute('open');
});

// LOGIN & SIGIN FORM

const formularioLogin = document.querySelector('#login-form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
// signup
const formulariosignup = document.querySelector('#signup-form');
const signupNombre = document.querySelector('#signupNombre');
const signupApellidos = document.querySelector('#signupApellidos');
const signupEmail = document.querySelector('#signupEmail');
const signupPassword = document.querySelector('#signupPassword1');
const repetirPassword = document.querySelector('#signupPassword2');
window.addEventListener('load', () => {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        enviarFormulario(loginEmail.value, loginPassword.value);
        // enviarFormulario('prueba.prueba@iescamp.es', 'prueba');
    });
    formulariosignup.addEventListener('submit', function (e) {
        e.preventDefault();
        registrarUsuario(signupNombre.value, signupApellidos.value, signupEmail.value, signupPassword.value);
    });
});

// FORMULARIO LOGIN
function enviarFormulario (param1, param2) {
    const datos = new FormData();
    datos.append('opcion', 'SR');
    datos.append('email', param1);
    datos.append('password', param2);
    const url = 'coop23.php';
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
                    window.location.reload();
                });
            } else if (data != null) {
                sessionStorage.setItem('usuario', data[0].nombre);
                sessionStorage.setItem('idusuario', data[0].id);
                window.location = 'stock.html';
            }
        });
};

// FORMULARIO signup
function registrarUsuario (param1, param2, param3, param4) {
    if (signupPassword.value === repetirPassword.value) {
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
            .then(() => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: 'COOPbyDWC',
                    text: 'USUARIO REGISTRADO CON EXITO',
                    icon: 'success',
                    button: 'Continuar'
                }).then(function () {
                    window.location.reload();
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
