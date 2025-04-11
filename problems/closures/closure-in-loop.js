/**
 * Problem: Closure in Loop
 * Output: 0 1 2
 */

for (var i = 0; i < 3; i++) {
    (function (index) {
        setTimeout(() => console.log(index), 1000);
    })(i);
}
