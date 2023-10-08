// Страница добавления отзыва:
// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

import { loadDataFromLS, saveDataToLS } from './utils.js';

let globalId = 5;

addNewReview.addEventListener('click', (e) => {
    const newReview = {
        id: globalId++,
        author: authorName.value,
        text: reviewText.value
    }
    const data = loadDataFromLS('productReviews');
    const targetProductId = data.findIndex(el => el.product === goods.value);
    data[targetProductId].reviews.push(newReview);
    saveDataToLS('productReviews', data);
})