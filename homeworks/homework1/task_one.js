/*  Задание 1
    Используя Symbol.iterator, создайте объект "Музыкальная коллекция",
    который можно итерировать. Каждая итерация должна возвращать
    следующий альбом из коллекции.
    Создайте объект musicCollection, который содержит массив альбомов
    и имеет свойство-символ Symbol.iterator.
    Каждый альбом имеет следующую структуру:
    {
    title: "Название альбома",
    artist: "Исполнитель",
    year: "Год выпуска"
    }
    Реализуйте кастомный итератор для объекта musicCollection.
    Итератор должен перебирать альбомы по порядку.
    Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате:
    Название альбома - Исполнитель (Год выпуска)
*/

const musicCollection = {
    albums: [
        {
            title: "Album 1",
            artist: "Artist 1",
            year: "2001"
        },
        {
            title: "Album 2",
            artist: "Artist 2",
            year: "2002"
        },
        {
            title: "Album 3",
            artist: "Artist 3",
            year: "2003"
        },
        {
            title: "Album 4",
            artist: "Artist 1",
            year: "2004"
        },
        {
            title: "Album 5",
            artist: "Artist 3",
            year: "2005"
        }
    ],
    [Symbol.iterator]() {
        this.index = 0;
        return this;
    },
    next() {
        return this.index < this.albums.length 
            ? {done: false, value: this.albums[this.index++]}
            : {done: true};
    }
}

for (const album of musicCollection) {
    const outputStr = `${album.title} - ${album.artist}(${album.year})`
    console.log(outputStr);
}


