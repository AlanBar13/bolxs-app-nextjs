export const saveToLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLS = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeFromLS = (key) => {
    localStorage.removeItem(key);
}