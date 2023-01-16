import { getItemLocalStorage } from './utils/localStorage.js';

document.addEventListener("DOMContentLoaded", () => {

    const user = getUser();

    if (!user) {
        window.location.href = '/login.html';
    } else {
        document.querySelector('#user-name').innerHTML = user.name;
    }

});

const getUser = () => {

    const user = getItemLocalStorage('user');

    if (user) {
        return user;
    }

}