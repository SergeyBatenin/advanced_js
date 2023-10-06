// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];
    constructor(books) {
        try {
            if (books === undefined || books.length === 0) {
                throw new Error('Вы не передали книг в коллекцию');
            }

            if (new Set(books).size < books.length) {
                throw new Error('В списке содержались дубликаты');
            }

            books.forEach(book => {
                this.#books.push(book);
            });
        } catch (error) {
            console.error(error);
        }

    }
    get allBooks() {
        return this.#books;
    }
    addBook(title) {
        try {
            if (!this.hasBook(title)) {
                this.#books.push(title);
            } else {
                throw new Error('Такая книга уже есть в коллекции');
            }
        } catch (error) {
            console.error(error);
        }
    }
    removeBook(title) {
        try {
            if (this.hasBook(title)) {
                this.#books = this.#books.filter(book => book !== title);
            } else {
                throw new Error('Такой книги нет в коллекции');
            }
        } catch (error) {
            console.error(error);
        }
    }
    hasBook(title) {
        return this.#books.includes(title);
    }
}


// Исключение конструктор без параметров
const undefinedLibrary = new Library();

// Исключение пустой массив в параметрах
const emptyLibrary = new Library([]);

// Исключение дубликаты в параметрах
const dublicateLibrary = new Library(['Book 1', 'Book 2', 'Book 1']);

// Корректное созадние
const library = new Library(['Book 1', 'Book 2', 'Book 3', 'Book 4']);

console.log(library.allBooks); // ['Book 1', 'Book 2', 'Book 3', 'Book 4']

// Исключение добавление дубликата
library.addBook('Book 1');

// исключение удаление несуществующей книги
library.removeBook('Book 5');

// Корректные добавление и удаление книг
library.addBook('Book 6');
library.removeBook('Book 3');

console.log(library.allBooks); // ['Book 1', 'Book 2', 'Book 4', 'Book 6']