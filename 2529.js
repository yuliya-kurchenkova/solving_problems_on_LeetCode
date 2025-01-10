// https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/

// 2529. Maximum Count of Positive Integer and Negative Integer
// Given an array nums sorted in non-decreasing order, return the maximum between the number of positive 
// integers and the number of negative integers.
// In other words, if the number of positive integers in nums is pos and the number of negative integers 
// is neg, then return the maximum of pos and neg.
// Note that 0 is neither positive nor negative.

// Example 1:
// Input: nums = [-2,-1,-1,1,2,3]
// Output: 3
// Explanation: There are 3 positive integers and 3 negative integers. The maximum count among them is 3.

// Example 2:
// Input: nums = [-3,-2,-1,0,0,1,2]
// Output: 3
// Explanation: There are 2 positive integers and 3 negative integers. The maximum count among them is 3.

// Example 3:
// Input: nums = [5,20,66,1314]
// Output: 4
// Explanation: There are 4 positive integers and 0 negative integers. The maximum count among them is 4.

// Example 4:
// Input: nums = [0, 0, 0]
// Output: 0


function maximumCount(nums) {
  return Math.max(getMaxCountPosNumbers(nums), getMaxCountNegNumbers(nums))
};

function getMaxCountPosNumbers(nums) {
  let start = 0;
  let end = nums.length - 1;
  let firstPosIndex = nums.length;

  while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (nums[mid] > 0) {
          firstPosIndex = mid;
          end = mid - 1;
      } else {
          start = mid + 1;
      }
  }

  const countPosNumbers = nums.length - firstPosIndex;
  return countPosNumbers;
}

function getMaxCountNegNumbers(nums) {
  let start = 0;
  let end = nums.length - 1;
  let lastNegIndex = -1;

  while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (nums[mid] < 0) {
          lastNegIndex = mid;
          start = mid + 1;
      } else {
          end = mid - 1;
      }
  }

  const countNegNumbers = lastNegIndex + 1;
  return countNegNumbers;
}


// Чтобы решить эту задачу, мы можем декомпозировать её на 3 части, 
// так как мы должны применить 2 раза бинарный поиск в цикле while для негативных и позитивных чисел. 
// В первом цикле мы ищем первое положительное число, 
// а во втором — последнее отрицательное число, чтобы затем узнать количество положительных и отрицательных чисел.

// Как узнать индексы?
// 1) Первый положительный индекс: когда условие для чисел > 0 срабатывает, 
// мы присваиваем переменной firstPosIndex значение mid, 
// так как предполагаем, что это будет первый индекс положительного числа. 
// Далее проверяем, а вдруг левее есть ещё положительное число, и тогда мы его перезапишем.
// 2) То же самое с поиском последнего отрицательного числа: 
// если условие для чисел < 0 выполняется, 
// мы присваиваем переменной lastNegIndex значение mid и смотрим правее, 
// вдруг есть ещё отрицательные числа.

// Как узнать количество негативных и позитивных чисел?
// 1) Чтобы узнать количество положительных чисел, 
// после бинарного поиска мы берём индекс первого положительного числа 
// и отнимаем его от длины всего массива: arr.length - firstPosIndex.
// 2) Чтобы узнать количество отрицательных чисел, 
// после бинарного поиска мы берём индекс последнего отрицательного числа 
// и прибавляем 1, потому что индексы начинаются с 0. 
// Например, если lastNegIndex = 2, это означает, что у тебя есть три отрицательных числа 
// (индексы 0, 1 и 2). Поэтому нужно добавить 1, чтобы получить общее количество.

// Что делать с числами, такими как 0, и с массивами вроде [0, 0, 0]?
// 1) Придерживаемся условий в циклах: 
// если мы ищем первое положительное число, то в условии важно прописать if (nums[mid] > 0); 
// если мы ищем последнее отрицательное число, то в условии важно прописать if (nums[mid] < 0).
// 2) Чтобы такие тесты проходили успешно, например, [0, 0, 0], 
// по умолчанию, когда мы объявляем переменные, устанавливаем значения: 
// для let firstPosIndex = nums.length; // так как если нет положительных чисел, 
// мы вернём 0, т.к. в конце мы всё равно вычитаем const countPosNumbers = nums.length - firstPosIndex;
// let lastNegIndex = -1; // если нет отрицательных чисел, то вернём 0, 
// т.к. в конце мы всё равно складываем const countNegNumbers = lastNegIndex + 1;
// Далее в третьей функции мы проверяем, что больше, и возвращаем то, что больше, 
// с помощью метода Math.max().
// Конечно, мы могли решить эту задачу с помощью цикла, проверяя каждое число 
// и складывая в два count — позитивные и негативные числа, O(n), 
// но это нормально при маленьких массивах. 
// А что если они огромные? Тогда лучше использовать бинарный поиск в любом случае, 
// так как временная сложность будет O(log n).