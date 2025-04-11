/**
 * Problem: Reverse an array
 * Description: Given an array, return it reversed without using built-in reverse().
 * Input: [1, 2, 3, 4]
 * Output: [4, 3, 2, 1]
 */

function reverseArray(arr) {
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

// Test
console.log(reverseArray([1, 2, 3, 4])); // [4, 3, 2, 1]
