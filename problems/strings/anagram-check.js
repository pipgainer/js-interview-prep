/**
 * Problem: Check if two strings are anagrams.
 * Input: "listen", "silent"
 * Output: true
 */

function isAnagram(str1, str2) {
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// Test
console.log(isAnagram("listen", "silent")); // true
