/*  Задание 2
    Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

    Необходимо создать систему управления этими заказами, которая позволит:
    Отслеживать, какой повар готовит какое блюдо.
    Записывать, какие блюда заказал каждый клиент.
    Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

    Повара и их специализации:
    Виктор - специализация: Пицца.
    Ольга - специализация: Суши.
    Дмитрий - специализация: Десерты.

    Блюда и их повара:
    Пицца "Маргарита" - повар: Виктор.
    Пицца "Пепперони" - повар: Виктор.
    Суши "Филадельфия" - повар: Ольга.
    Суши "Калифорния" - повар: Ольга.
    Тирамису - повар: Дмитрий.
    Чизкейк - повар: Дмитрий.

    Заказы:
    Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
    Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
    Клиент Ирина заказала: Чизкейк.
*/

const relationships = new Map();
relationships.set('Пицца "Пепперони"', 'viktor');
relationships.set('Пицца "Маргарита"', 'viktor');
relationships.set('Суши "Филадельфия"', 'olga');
relationships.set('Суши "Калифорния"', 'olga');
relationships.set('Тирамису', 'dmitriy');
relationships.set('Чизкейк', 'dmitriy');

const dishesIdentification = new Map();
dishesIdentification.set('1', 'Пицца "Пепперони"')
dishesIdentification.set('2', 'Пицца "Маргарита"')
dishesIdentification.set('3', 'Суши "Филадельфия"')
dishesIdentification.set('4', 'Суши "Калифорния"')
dishesIdentification.set('5', 'Тирамису')
dishesIdentification.set('6', 'Чизкейк')

const restaraunt = {
    cooks: [],
    orders:[],
    chefSkills: relationships,
    dishesIdentifier: dishesIdentification,
    [Symbol.iterator]() {
        this.index = 0;
        return this;
    },
    next() {
        return this.index < this.orders.length
        ? {done: false, value: this.orders[this.index++]}
        : {done: true};
    }
}

const controller = {
    establishment: restaraunt,
    generateDishesList(dishesID) {
        const orderedDishes = [];
        for (const dishID of dishesID) {
            const dishName = this.establishment.dishesIdentifier.get(dishID);
            orderedDishes.push(dishName);
        }
        return orderedDishes;
    },
    makeOrder(clientName, orderedDishes) {
        // Создаем заказ с именем клиента и массивом заказанных блюд
        const order = {
            client: clientName,
            dishes: []
        };

        // const dishes = orderedDishes.split(" ");
        for (const dish of orderedDishes) {
            // получаем повара, который готовит блюдо и формируем объект с этой парой
            // добавляем эту пару в сформированный заказ клиента
            const cook = this.establishment.chefSkills.get(dish);
            const ord = {dishName: dish, cookName: cook};
            order.dishes.push(ord);
        }
        // Добавляем наш заказ в список в нашем заведении
        this.establishment.orders.push(order);
    },
    printOrdersHistory() {
        if (this.establishment.orders.length === 0) {
            alert("Заказов еще не было");
            return;
        }
        let outputAll = 'Список заказов:\n'
        for (const order of this.establishment) {
            let outputClient = `${order.client} заказал(а): `
            for (const dish of order.dishes) {
                outputClient += `${dish.dishName}, `
            }
            outputAll += `${outputClient.substring(0,outputClient.length - 2)}\n`
        }
        alert(outputAll);
    }
}

// controller.makeOrder('Алексей', ['Пицца "Пепперони"', 'Тирамису']);
// controller.makeOrder('Мария', ['Суши "Калифорния"', 'Пицца "Маргарита"']);
// controller.makeOrder('Ирина', ['Чизкейк']);
// controller.printOrdersHistory();

let flag = true;
const mainMenu = `Для оформления заказа введите - 1\nДля просмотра всех заказов введите - 2\nДля выхода введите - 0\n`
const dishesMenu = `Введите номера блюд через пробел\n'Пицца "Пепперони" - 1\nПицца "Маргарита" - 2\nСуши "Филадельфия" - 3\nСуши "Калифорния" - 4\nТирамису - 5\nЧизкейк - 6\n`

while(flag) {
    const userChoice = Number(prompt(mainMenu));
    switch(userChoice) {
        case 1:
            const clientName = prompt("Введите ваше имя");
            const dishesID = prompt(dishesMenu);
            const orderedDishes = controller.generateDishesList(dishesID.split(" "));
            controller.makeOrder(clientName, orderedDishes);
            break;
        case 2:
            controller.printOrdersHistory();
            break;
        case 0:
            flag = false;
            break;
        // default:
        //     flag = false;
        //     break;
    }
}