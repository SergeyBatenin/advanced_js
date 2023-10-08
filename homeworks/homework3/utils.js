// метод сохранения данных в local storage
export const saveDataToLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// метод получения данных из local storage
export const loadDataFromLS = (key) => {
    const jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData);
}