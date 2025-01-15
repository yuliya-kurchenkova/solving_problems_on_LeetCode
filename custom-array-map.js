// Напишите полифил для метода map
// arr.map(callback(currentValue[, index[, array]])) {
//   // todo something 
//}[, thisArg])
// возвращает новый массив, внутри которого каждый элемент будет преобразован таким образом,
// так как мы пропишем в колбеке 

let arr = [1, 2, 3, 4, 5];


Array.prototype.myCustomMap = function (cbFn, thisArg) {
  if (this == null) {
    throw new Error('Value can not be null or undefined');
  }

  if (typeof cbFn !== 'function') {
    throw new Error('not a function');
  }

  let context = this;

  if (arguments.length > 1) {
    context = thisArg;
  }

  let o = Object(this);
  let newArray = []; // 1
  let i = 0;

  while (i < o.length) {
    if (i in o) {
      let newValue = cbFn.call(context, this[i], i, o); // 1)
      newArray[i] = newValue; // 1)
      // или newArray.push(newValue); // 1) тоже самое что и выше
    }

    i++;
  }

  return newArray;
}

let newArray = arr.myCustomMap((item) => {
  return item * 2; // 2
})

console.log(newArray);

// Так же как и в myCustomForEach 
// 1) то есть отличие в том что возвращается новый массив и по факту cbFn.call(context, this[i], i, o); и будет
// и будет возвращать новые значения 