/**
 * Problem: Two Sum
 * Description: Find indices of the two numbers that add up to a specific target.
 * Input: [2, 7, 11, 15], target = 9
 * Output: [0, 1]
 */

function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
