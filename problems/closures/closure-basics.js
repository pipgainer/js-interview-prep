/**
 * Problem: Closure Basics
 * Output: 5
 */

function outer() {
    let count = 5;
    return function inner() {
        return count;
    };
}

const fn = outer();
console.log(fn()); // 5
