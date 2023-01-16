import { getItemLocalStorage } from './utils/localStorage.js';
import Task from './models/Task.js';
import User from './models/User.js';

const logout = document.querySelector('#logout');
const container = document.querySelector('.container__tasks');
const selectUsers = document.querySelector('#users');
const selectUsersUpdate = document.querySelector('#update-users');
const createTaskAction = document.querySelector('#create-task-action');
const updateTaskAction = document.querySelector('#update-task-action');

document.addEventListener("DOMContentLoaded", () => {

    const user = getUser();

    if (!user) {
        window.location.href = '/login.html';
    } else {
        document.querySelector('#user-name').innerHTML = user.name;
    }

    logout.addEventListener('click', logoutAction);

    getTasks();

    const users = new User().getAll();

    if (users.length > 0) {
        users.forEach(user => {
            selectUsers.innerHTML += `
                <option value="${user.name}">${user.name}</option>
            `;
            selectUsersUpdate.innerHTML += `
                <option value="${user.name}">${user.name}</option>
            `;
        });
        
    } else {
        selectUsers.innerHTML = `
            <option value="">No hay usuarios</option>
        `;
        selectUsersUpdate.innerHTML = `
            <option value="">No hay usuarios</option>
        `;
    }

    updateTaskAction.addEventListener('click', () => {
        const id = document.querySelector('#id-task').value;
        const title = document.querySelector('#update-title').value;
        const description = document.querySelector('#update-description').value;
        const user = document.querySelector('#update-users').value;

        const tasks = getItemLocalStorage('tasks') || [];
        const task = tasks.find(task => task.id === parseInt(id));

        const updateTask = new Task({
            id,
            title,
            description,
            status: task.status,
            user_id: user
        });

        updateTask.update(id, {
            title,
            description,
            status: task.status,
            user_id: user
        });

        container.innerHTML = '';

        getTasks();

        $('#update-task').modal('hide');

    });

    createTaskAction.addEventListener('click', () => {
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const user = document.querySelector('#users').value;

        const task = new Task({
            title,
            description,
            status: 'pending',
            user_id: user
        });

        task.save();

        container.innerHTML = '';

        getTasks();

        $('#create-task').modal('hide')

    });

});

const getTasks = () => {

    const tasks = new Task().getAll();

    if (tasks.length > 0) {
        tasks.forEach(task => {
            container.innerHTML += `
                <div class="card col-3 ${task.status}">
                    <div class="container__tasks--task__title">
                        <h2>${task.title}</h2>
                        <div>
                            <i data-bs-toggle="modal" data-bs-target="#update-task" onclick="edit(${task.id})" class="bi bi-pencil"></i>
                            <i onclick="remove(${task.id})" class="bi bi-trash"></i>
                            ${task.status === 'pending' ? `<i onclick="done(${task.id})" class="bi bi-check2"></i>` : ''}
                        </div>
                    </div>
                    <div class="container__tasks--task__description">
                        <p>${task.description}</p>
                        <div class="user">
                            ${task.user_id ? `<p>Asignado a: ${task.user_id}</p>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        container.innerHTML = `
            <div class="container__tasks--empty">
                <h3>No hay tareas</h3>
            </div>
        `;
    }
}

const logoutAction = () => {
    console.log('logout');
    localStorage.removeItem('user');
    alert('Sesión cerrada');
    window.location.href = '/login.html';
}

const getUser = () => {

    const user = getItemLocalStorage('user');

    if (user) {
        return user;
    }

}