// Страница просмотра отзывов:
// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом,
// данный отзыв удаляется из LocalStorage).

import { loadDataFromLS, saveDataToLS } from './utils.js';


// метод для удаления из local storage удаленного комментария
// возвращает количество оставшихся комментариев для товара
const removeReviewFromLS = (productName, id) => {
    const data = loadDataFromLS('productReviews');
    const targetProductId = data.findIndex(el => el.product === productName);
    const targetReviewId = data[targetProductId].reviews.findIndex(review => review.id === id);
    data[targetProductId].reviews.splice(targetReviewId, 1);
    saveDataToLS('productReviews', data);
    return data[targetProductId].reviews.length;
}

// метод для добавления события удаления отзыва со страницы и из local storage
const addEventForRemoveReview = (buttonEl) => {
    buttonEl.addEventListener('click', (e) => {
        const parentDiv = buttonEl.parentNode;
        const reviewId = parentDiv.id.split('_')[1];
        const productName = parentDiv.parentNode.firstChild.textContent;
        const remaindReviews = removeReviewFromLS(productName, reviewId);
        if (remaindReviews === 0) {
            parentDiv.parentNode.appendChild(generateDivWithoutReview());
        }
        parentDiv.remove();
    })
}


// метод генерации заглушки, если у товара нет отзывов
const generateDivWithoutReview = () => {
    const divEl = document.createElement('div');
    divEl.id = 'dummy';
    const titleEl = document.createElement('p');
    titleEl.textContent = "Для данного товара еще нет отзывов";
    divEl.appendChild(titleEl);
    return divEl;
}

// метод генерации блока отзывов для конкретного товара
const generateReviewElement = (item) => {
    const detailsEl = document.createElement('details');
    detailsEl.style.border = '1px solid black';
    detailsEl.style.width = '500px';
    detailsEl.style.marginBottom = '20px';

    const summaryEl = document.createElement('summary');
    summaryEl.textContent = item.product;
    detailsEl.appendChild(summaryEl);

    // Если отзывов нет, то генерируем заглушку
    // иначе формируем блок с отзывами
    if (item.reviews.length === 0) {
        const dummy = generateDivWithoutReview();
        dummy.style.borderTop = '1px solid black';
        detailsEl.appendChild(dummy);
    } else {
        for (const review of item.reviews) {
            const reviewDiv = document.createElement('div');
            reviewDiv.style.borderTop = '1px solid black';
            reviewDiv.id = `review_${review.id}`;

            const reviewAuthor = document.createElement('h4');
            reviewAuthor.textContent = review.author;
            const reviewText = document.createElement('p');
            reviewText.textContent = review.text;
            const removeButton = document.createElement('button');
            removeButton.id = 'removeBtn';
            removeButton.textContent = 'Удалить отзыв'
            addEventForRemoveReview(removeButton);

            reviewDiv.appendChild(reviewAuthor);
            reviewDiv.appendChild(reviewText);
            reviewDiv.appendChild(removeButton);

            detailsEl.appendChild(reviewDiv);
        }
    }

    return detailsEl;
}

// метод генерации контента для отображения пользователю
const generateReviewContent = () => {
    const data = loadDataFromLS('productReviews');
    for (const item of data) {
        const productDiv = generateReviewElement(item);

        reviews.appendChild(productDiv);
    }
}

// Сохранили данные в local storage
// saveDataToLS('productReviews', initialData);

// Выводим их на экран
generateReviewContent();

// localStorage.clear();