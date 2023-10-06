// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                author: "Author 1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                author: "Author 2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                author: "Author 3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                author: "Author 4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

let globID = 4;

const addReview = (divId, data) => {
    if (divId.children.length > 1 && divId.children[1].id == 'noReview') {
        divId.children[1].remove();
    }

    const reviewDiv = document.createElement('div');
    reviewDiv.id = `review_${data.id}`;

    const reviewAuthor = document.createElement('h4');
    reviewAuthor.textContent = data.author;

    const reviewText = document.createElement('p');
    reviewText.textContent = data.text;

    reviewDiv.appendChild(reviewAuthor);
    reviewDiv.appendChild(reviewText);

    divId.appendChild(reviewDiv);
}

const initializationPage = (targetElement, itemData) => {
    if (itemData.length === 0) {
        const comment = document.createElement('p');
        comment.id = 'noReview';
        comment.textContent = "Отзывов о данном товаре еще не оставляли";
        targetElement.appendChild(comment);
    } else {
        for (const review of itemData) {
            addReview(targetElement, review);
        }
    }
}

for (const item of initialData) {
    if (item.product.startsWith("Apple")) {
        initializationPage(apple, item.reviews);
    } else if (item.product.startsWith("Samsung")) {
        initializationPage(samsung, item.reviews);
    } else if (item.product.startsWith("Sony")) {
        initializationPage(sony, item.reviews);
    }

}

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const goods = document.querySelectorAll('#good');

    for (let radio of goods) {
        if (radio.checked) {
            try {
                if (review.value.length < 50) {
                    throw new Error('Комментарий слишком короткий');
                }
                if (review.value.length > 500) {
                    throw new Error('Комментарий слишком длинный');
                }

                const newReview = {
                    id: ++globID,
                    author: author.value,
                    text: review.value
                }

                let productName;
                switch (radio.value) {
                    case 'apple':
                        productName = "Apple iPhone 13";
                        break;
                    case 'samsung':
                        productName = "Samsung Galaxy Z Fold 3";
                        break;
                    case 'sony':
                        productName = "Sony PlayStation 5";
                        break;
                }

                const targetElement = document.getElementById(radio.value);
                addReview(targetElement, newReview);

                for (const item of initialData) {
                    if (item.product === productName) {
                        item.reviews.push(newReview);
                        break;
                    }
                }


            } catch (error) {
                console.error(error);
            }
        }
    }
})