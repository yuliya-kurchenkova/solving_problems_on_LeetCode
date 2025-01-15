// Reduce
// 1) массив с числами 
// Если мы говорим про сложения цифр, то тут достаточно всё понятно
// метод reduce позволяет проитерироваться по каждому элементу и на каждой итерации есть некий аккумулятор,
// в котором мы сможем агрегировать какое-то значение, которое будет возвращено в качестве результата метода reduce

let array = [1, 2, 3, 4, 5];

let count = array.reduce((acc, elem) => {
  return acc + elem;
}, 0)

console.log(count); // 15



// Если мы говорим про массив со строками, то в данном случае мы собираем объект с ключами 'apple', 'banana' ....
let fruits = ['apple', 'banana', 'peach', 'orange'];

let resultFruits = fruits.reduce((acc, elem) => {
  acc[elem] = 1;
  return acc;
}, {}) // тут важно указать initialValue пустой объект, иначе не правильно сработает

console.log(resultFruits); // { apple: 1, banana: 1, peach: 1, orange: 1 }



// Разворачивание массива массивов не с помощью flat, а с помощью reduce 
let flattened = [[0, 1], [2, 3], [4, 5]]
  .reduce((acc, elem) => {
    return acc.concat(elem) // [...acc, ...elem] - или так, одинаковая запись
  }, [])

console.log(flattened); // [ 0, 1, 2, 3, 4, 5 ]



// Если дан двумерный массив целых чисел, верните выровненную версию массива со всеми целыми числами в отсортированном (возрастающем) порядке.
// Пример: [[3, 2, 1], [4, 6, 5], [], [9, 7, 8]],
// ваша функция должна вернуть [1, 2, 3, 4, 5, 6, 7, 8, 9].

const flattenAndSort = (array) => {
  return array
    .reduce((acc, elem) => [...acc, ...elem], [])
    .sort((a, b) => a - b)
}

console.log(flattenAndSort([[3, 2, 1], [4, 6, 5], [], [9, 7, 8]])); // 1, 2, 3, 4, 5, 6, 7, 8, 9]