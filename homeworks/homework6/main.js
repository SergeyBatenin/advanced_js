const getURLForRandomPhoto = () => {
    // Вообще базовый урл и апи ключ у меня хранятся в отдельном файле config.js
    // const url = baseURL + 'photos/random/?client_id=' + apiKey;

    // const apiKey = 'ВАШ КЛЮЧ';
    const url = 'https://api.unsplash.com/photos/random/?client_id=' + apiKey;
    return url;
}

// fetch(getURLForRandomPhoto())
//     .then(res => res.json())
//     .then(result => console.log(result));
