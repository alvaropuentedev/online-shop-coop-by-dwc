const inicio = document.querySelector('#inicio');
const signin = document.querySelector('#signin');
const login = document.querySelector('#login');
const dialogLogin = document.querySelector('#dialog-login');
const dialogSignin = document.querySelector('#dialog-signin');

// VISIBLE OR HIDDEN FOR EACH OPCION

inicio.addEventListener('click', () => {
    window.location = 'index.html';
});
signin.addEventListener('click', () => {
    dialogSignin.setAttribute('open', 'true');
    dialogLogin.removeAttribute('open');
});
login.addEventListener('click', () => {
    dialogLogin.setAttribute('open', 'true');
    dialogSignin.removeAttribute('open');
});

// LOGIN & SIGIN FORM

const formularioLogin = document.querySelector('#login-form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
// signin
const formulariosignin = document.querySelector('#signin-form');
const signinNombre = document.querySelector('#signinNombre');
const signinApellidos = document.querySelector('#signinApellidos');
const signinEmail = document.querySelector('#signinEmail');
const signinPassword = document.querySelector('#signinPassword1');
const repetirPassword = document.querySelector('#signinPassword2');
window.addEventListener('load', () => {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        enviarFormulario(loginEmail.value, loginPassword.value);
        // enviarFormulario('prueba.prueba@iescamp.es', 'prueba');
    });
    formulariosignin.addEventListener('submit', function (e) {
        e.preventDefault();
        registrarUsuario(signinNombre.value, signinApellidos.value, signinEmail.value, signinPassword.value);
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

// FORMULARIO signin
function registrarUsuario (param1, param2, param3, param4) {
    if (signinPassword.value === repetirPassword.value) {
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
