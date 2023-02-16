const formularioLogin = document.querySelector('#login-form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
window.addEventListener('load', () => {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        // enviarFormulario(loginEmail.value, loginPassword.value);
        enviarFormulario('prueba.prueba@iescamp.es', 'prueba');
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
        .then((data) => mostrar(data));
};
function mostrar (e) {
    console.log(e);
}
