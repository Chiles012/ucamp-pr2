import User from './models/User.js';

const form = document.querySelector('#form-login');

document.addEventListener("DOMContentLoaded", () => {

    if (form.attachEvent) {
        form.attachEvent("submit", login);
    } else {
        form.addEventListener("submit", login);
    }

});

function login(e) {
    
    e.preventDefault();

    const name = document.querySelector('#user').value;
    const password = document.querySelector('#pass').value;

    if (name === '' || password === '') {
        alert('Todos los campos son obligatorios');
        return;
    } else {
        const user = new User();
        const userLogged = user.login(name, password);
        if (userLogged) {
            window.location.href = '/index.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }

}