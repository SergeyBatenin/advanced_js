const getDate = () => {
    const date = new Date();
    const day = Number(date.getDate()) < 10 ? '0' + date.getDate() : date.getDate();
    const month = Number(date.getMonth()) < 10 ? '0' + date.getMonth() : date.getMonth();

    return `${day}.${month}.${date.getFullYear()}`;
}

const getURLForRandomPhoto = () => {
    // Базовый урл и апи ключ у меня хранятся в отдельном файле config.js, который скрыт .gitignore
    // return baseURL + 'photos/random/?client_id=' + apiKey;

    // const apiKey = 'ВАШ КЛЮЧ';
    return 'https://api.unsplash.com/photos/random/?client_id=' + apiKey;
}

const setDayPhoto = () => {
    const today = getDate();

    const spanDate = document.querySelector('.date');
    if (spanDate.innerHTML !== today) {
        spanDate.innerHTML = today;

        fetch(getURLForRandomPhoto())
            .then(response => response.json())
            .then(answer => {
                const photoDiv = document.querySelector('.photo');
                photoDiv.src = answer.urls.small;
                photoDiv.alt = answer.alt_description;

                const author = document.querySelector('.author');
                author.innerHTML = answer.user.name;

                const likesCount = document.querySelector('.like_count');
                likesCount.innerHTML = answer.likes;
            })
            .catch(err => console.log(err));
    }
}

const likePhoto = () => {
    const likeCountSpan = document.querySelector('.like_count');
    const likesCount = Number(likeCountSpan.textContent);

    if (likeBtn.id === 'notLike') {
        likeBtn.id = 'like';
        likeBtn.src = './heart.svg';
        likeBtn.alt = 'Сердечко, нравится фотка';
        likeCountSpan.innerHTML = likesCount + 1;
    } else {
        likeBtn.id = 'notLike';
        likeBtn.src = './like.png';
        likeBtn.alt = 'Палец вверх, можно лайкнуть фото';
        likeCountSpan.innerHTML = likesCount - 1;
    }


}

const likeBtn = document.querySelector('.like_btn');
likeBtn.addEventListener('click', likePhoto);



setInterval(setDayPhoto, 1000);
