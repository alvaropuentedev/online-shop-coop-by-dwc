const logout = document.querySelector('#logout');
const usuario = sessionStorage.getItem('usuario');
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
});

logout.addEventListener('click', function () {
    this.sessionStorage.removeItem('usuario');
});
