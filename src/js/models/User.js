import { getItemLocalStorage, setItemLocalStorage, removeItemLocalStorage } from '../utils/localStorage.js'

class User {

    id = null;
    name = '';
    email = '';
    password = '';

    constructor(data) {
        Object.assign(this, data)
    }

    save() {
        const users = getItemLocalStorage('users') || []
        this.id = users.length + 1
        users.push(this)
        setItemLocalStorage('users', users)
    }

    getAll() {
        return getItemLocalStorage('users') || []
    }

    filter(key, value) {
        var users = getItemLocalStorage('users') || [];
        users = users.filter(user => user[key] === value)
    }

    remove(id) {
        const users = getItemLocalStorage('users') || []
        const newUsers = users.filter(user => user.id !== id)
        setItemLocalStorage('users', newUsers)
    }

    update(id, data) {
        const users = getItemLocalStorage('users') || []
        const newUsers = users.map(user => {
            if (user.id === id) {
                user = data
            }
            return user
        })
        setItemLocalStorage('users', newUsers)
    }

    login(name, password) {
        const users = getItemLocalStorage('users') || []
        const user = users.find(user => user.name === name && user.password === password)
        if (user) {
            setItemLocalStorage('user', user)
            return user
        }
        return null
    }

    logout() {
        removeItemLocalStorage('user')
        window.location.href = '/login'
    }

    toJson() {
        return JSON.parse(JSON.stringify(this))
    }

    fromJson(json) {
        return Object.assign(this, json);
    }

}

export default User;