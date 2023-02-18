const usuario = sessionStorage.getItem('usuario');
const url = 'php/coop.php';
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
});
