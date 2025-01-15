// Написать полифил для reduce
// arr.reduce(callback( accumulator, currentValue, [, index[, array]]) [, initialValue])

// по дефолту если мы передадим пустой массив и не пропишем initialValue, то настоящий reduce нам выдаст ошибку


Array.prototype.myCustomReduce = function (cbFn, initialValue) {
  if (this == null) {
    throw new Error('Value can not be null or undefined');
  }

  if (typeof cbFn !== 'function') {
    throw new Error(`${cbFn} is not a function`);
  }

  let result;
  let i = 0;
  let o = Object(this);

  if (arguments.length >= 2) {
    result = initialValue; // если есть initialValue
  } else {
    result = o[i];
    i++;

    if (i >= o.length) { // если мы пытаемся пройтись по пустому массиву и без initialValue
      throw new Error('empty array and not initial value');
    }
  }

  for (; i < o.length; i++) {
    if (i in o) {
      result = cbFn(result, this[i], i, this)
    }
  }

  return result;
}

let reduceResultCount = [1, 2, 3].myCustomReduce((acc, elem) => {
  return acc + elem;
}, 0)

let reduceConcat = [[0, 1], [2, 3], [4, 5]].myCustomReduce((acc, elem) => {
  return acc.concat(elem); // или [...acc, ...elem]
}, [])

let reduceConcatAndSort = [[3, 2, 1], [4, 6, 5], [], [9, 7, 8]].myCustomReduce((acc, elem) => {
  return acc
    .concat(elem) // или [...acc, ...elem]
    .sort((a, b) => a - b); // мутирует исходный массив
}, [])

let reduceTransformObject = ['apple', 'banana', 'peach', 'orange'].myCustomReduce((acc, elem) => {
  acc[elem] = 1
  return acc;
}, {}) // тут важно записать initialValue, иначе не так сработает (в принципе также как и в настоящем reduce)

console.log(reduceResultCount); // 6
console.log(reduceConcat); // [ 0, 1, 2, 3, 4, 5 ]
console.log(reduceConcatAndSort); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(reduceTransformObject); // { apple: 1, banana: 1, peach: 1, orange: 1 }






