// 485. Max Consecutive Ones
// https://leetcode.com/problems/max-consecutive-ones/
// Given a binary array nums, return the maximum number of consecutive 1's in the array.

// Example 1:
// Input: nums = [1,1,0,1,1,1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

// Example 2:
// Input: nums = [1,0,1,1,0,1]
// Output: 2
 
// Constraints:
// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.


function getConsecutiveOnes(nums) {
  let start = 0;
  let end = 0;
  let maxSetSize = 0;

  while (end < nums.length) {
    if (nums[end] === 0) {
      let setSize = end - start;
      start = end + 1;
      maxSetSize = Math.max(setSize, maxSetSize);
    }
    end++;
  }

  return Math.max(maxSetSize, end - start);
}

// Как решить эту задачу? Возьмём за основу "Скользящее окно". 
// Нужно помнить, что у скользящего окна 2 состояния (правильное и неправильное) - (подходящие нам или нет). 
// Указатели (start и end) окна изначально будут смотреть на 1 элемент в массиве, и в цикле "end" 
// будет расширяться на одну позицию за одну итерацию, пока не встретит "0" (то, что нам не подходит). 
// Как только это произойдёт, то нам нужно:

// Посчитать размер правильного окна:

// Пример: дан массив [1, 1, 0, 1, 1, 1]. Start = 0, end = 2. Окно выглядит так - [1, 1, 0], оно не правильное, поэтому 
// если мы вычтем end - start, то мы получим правильный размер окна, а именно в данном случае 2. И каждый раз мы будем 
// знать текущие размеры правильных окон и сохранять в переменной maxSetSize, выбирая максимальное значение.

// Теперь "start" надо передвинуть (start = end + 1), чтобы продолжить поиск. Но не стоит забывать, что если у 
// нас массив только из 1, 1, 1, 1, 1, 1 или в конце 1, то в условие === 0 не зайдёт!!! Поэтому после цикла мы 
// знаем, что "end" всегда будет на 1 больше длины массива, а start будет указывать на начало правильного окна 
// (т.е. на 1 (первую)). Исходя из этого, мы после цикла вернём максимальное значение между maxSetSize и правильного окна, 
// которое не вошло в условие (end - start).
