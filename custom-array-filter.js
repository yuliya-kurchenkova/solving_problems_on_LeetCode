// Напишите полифил для метода filter
// arr.filter(callback(currentValue[, index[, array]])) {
//   // todo something 
//}[, thisArg])

let arr = [1, 2, 3, 4, 5, 6 , 7]


Array.prototype.myCustomFilter = function (cbFn, thisArg) {
  if (this == null) {
    throw new Error('Value can not be null or undefined');
  }

  if (typeof cbFn !== 'function') {
    throw new Error(`${cbFn} is not a function`);
  }

  let context = this;

  if (arguments.length > 1) {
    context = thisArg;
  }

  let o = Object(this);
  let result = []; // 1)

  for (let i = 0; i < o.length; i++) {
    if (i in o) {
      if (cbFn.call(context, this[i], i, o)) { // 1)
        result.push(this[i]) // 1)
      }
    }
  }

  return result; // 1)
}

let newResult = arr.myCustomFilter((item) => {
   return item > 5; // 1)
})

console.log(newResult);


// всё тоже самое как и полифил для forEach, кроме того что фильтр нам возвращает новый массив с
// элементами, которые подходят условию
// 1) если этот колбек с текущим контекстом и элементом и индексом === true
// то мы пушим в новый массив значения, и возвращаем этот новый массив, и в самом 
// массиве когда мы вызываем кастомный метод, то сами прописываем решение, которое нам надо, тоесть возвращаем true по факту