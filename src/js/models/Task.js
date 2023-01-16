import { getItemLocalStorage, setItemLocalStorage } from "../utils/localstorage"

class Task {

    id = null
    title = ''
    description = ''
    status = 'pending'
    user_id = null

    constructor(data) {
        Object.assign(this, data)
    }

    save() {
        const tasks = getItemLocalStorage('tasks') || []
        this.id = date.length + 1
        tasks.push(this)
    }

    getAll() {
        return getItemLocalStorage('tasks') || []
    }

    filter(key, value) {
        var tasks = getItemLocalStorage('tasks') || [];
        tasks = tasks.filter(task => task[key] === value)
    }

    remove(id) {
        const tasks = getItemLocalStorage('tasks') || []
        const newTasks = tasks.filter(task => task.id !== id)
        setItemLocalStorage('tasks', newTasks)
    }

    update(id, data) {
        const tasks = getItemLocalStorage('tasks') || []
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                task = data
            }
            return task
        })
        setItemLocalStorage('tasks', newTasks)
    }

    assignUser(user) {
        this.user_id = user.id
        this.update(this.id, this)
    }

    getByUser(user) {
        const tasks = getItemLocalStorage('tasks') || []
        return tasks.filter(task => task.user_id === user.id)
    }

    toJson() {
        return JSON.parse(JSON.stringify(this))
    }

    fromJson(json) {
        return Object.assign(this, json);
    }

}

export default Task