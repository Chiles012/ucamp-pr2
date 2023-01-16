export const getItemLocalStorage = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
};

export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemLocalStorage = (key) => {
    localStorage.removeItem(key);
}
