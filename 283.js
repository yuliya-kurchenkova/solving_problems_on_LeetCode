// 283. Move Zeroes
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.

// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// Example 2:
// Input: nums = [0]
// Output: [0]

// Constraints:
// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1
// Follow up: Could you minimize the total number of operations done?



// Решим эту задачу проходом справа налево с помощью reduceRight

let reducer = (acc, elem) => {
  return elem === 0 ? [...acc, elem] : [elem, ...acc]
}

let moveZeros = (arr) => arr.reduceRight(reducer, []);

console.log(moveZeros([0,1,0,3,12])); // [1, 3, 12, 0, 0]



// [...acc, elem] - что значит?
// по текущему массиву (справа на лево) идём и если встречаем "0", то подклеиваем его справа
// если elem не "0", то он подклеивается справа, как и задумано изначальным массивом