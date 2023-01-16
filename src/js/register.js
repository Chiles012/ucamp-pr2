import User from './models/User.js';

const form = document.querySelector('#form-register');

document.addEventListener("DOMContentLoaded", () => {

    if (form.attachEvent) {
        form.attachEvent("submit", register);
    } else {
        form.addEventListener("submit", register);
    }

});

function register(e) {

    console.log('Registrando usuario...');

    e.preventDefault();

    console.log('Registrando usuario...');

    const name = document.querySelector('#user').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-pass').value;

    const user = {
        name,
        email,
        password,
        confirmPassword
    }

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Todos los campos son obligatorios');
        return;
    } else if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    } else {
        const newUser = new User(user);
        newUser.save();
        alert('Usuario registrado con éxito');
        window.location.href = '/login.html';
    }

}