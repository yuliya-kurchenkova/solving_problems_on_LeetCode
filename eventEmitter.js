// EventEmitter паттерн в программирование 
// это такой паттерн, суть которого заключается в том, чтобы дать возможность с любого места у вашем приложении сообщить о каком-либо событии.
// по факту это применение addEventListener('click', () => {})
// обычно 3 метода: on (subscribe), off (unsubscribe) и emit, для “подписки” на событие, “отписки” от него и для инициирования события соответственно.
// также надо хранить наши эвенты и колбеки
/* так должен выглядеть events
  events = { 
    drop: [func1, func2, funcN],
    close: [func1, func2, funcN],
  } 

  но мы усовершенствуем его и сделаем через Map и Set
  Map(3) {
  'click' => Set(1) { [Function (anonymous)] },
  'click2' => Set(1) { [Function: customFn] },
  'click3' => Set(1) { [Function: customFn] }
 }
*/

class EventEmitter {
  #events = new Map();

  on(eventName, cbFn) {

    if (this.#events.has(eventName)) {
      this.#events.get(eventName).add(cbFn)
    } else {
      this.#events.set(eventName, new Set([cbFn]))
    }
    
  }

  off(eventName, cbFn) {
    if (!cbFn) {
      this.#events.delete(eventName)
      return
    } 
    const fns = this.#events.get(eventName) // но если у нас передан и eventName и cbFn, то нам надо по ключу получить Set и там уже удалить функцию
    
    if (fns) {
      fns.delete(cbFn)
    }
  }

  emit(eventName, ...payLoad) { // payLoad - это параметры, которые мы будем передавать в наши колбеки
    const fns = this.#events.get(eventName); // это Set
    if (!fns) {
      return
    }

    fns.forEach(fn => {
      try {
        fn.apply(this, payLoad) // payLoad - массив, пишем apply для того, чтобы ф-ция вызывалась в контексте эмитера
      } catch (error) {
        console.error(error)
      }
    }); 

  }
}

const eventEmitter = new EventEmitter();

const customFn = function (num1, num2) {
  console.log('customFn', num1 + num2);
}

eventEmitter.on('click', (arr) => console.log(arr))
eventEmitter.on('click2', customFn)
eventEmitter.on('click2', customFn) // тут по итогу только одна ф-ция , так как у нас Set не пропустит одинаковые функции на одно и тоже событие
eventEmitter.emit('click2', 1, 2) // customFn 3
eventEmitter.emit('click', 1, 2) // 1


eventEmitter.off('click2', customFn)


