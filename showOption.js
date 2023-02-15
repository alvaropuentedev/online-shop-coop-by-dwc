const inicio = document.querySelector('#inicio');
const singin = document.querySelector('#singin');
const login = document.querySelector('#login');
const dialogLogin = document.querySelector('#dialog-login');
const dialogSingin = document.querySelector('#dialog-singin');

inicio.addEventListener('click', () => {
    if (dialogLogin.style.visibility === 'visible') {
        dialogLogin.style.visibility = 'hidden';
    }
    if (dialogSingin.style.visibility === 'visible') {
        dialogSingin.style.visibility = 'hidden';
    }
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
