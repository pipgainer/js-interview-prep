# 📌 Event Loop in JavaScript - Deep Explanation

---

## 🌍 What is the Event Loop?

The **Event Loop** is a mechanism in JavaScript that manages the **execution of multiple pieces of code over time**, especially asynchronous operations like:

- I/O
- Timers (like `setTimeout`)
- Promises
- Events (e.g., clicks)

JavaScript is **single-threaded**, so it can do **one thing at a time**. But thanks to the Event Loop, it can still handle **asynchronous** tasks efficiently.

---

## 🧠 How does the Event Loop work?

### 📦 Components:

1. **Call Stack** – Keeps track of function calls.
2. **Web APIs (Browser APIs)** – Handles async tasks like timers, AJAX, DOM events.
3. **Callback Queue / Task Queue (Macro-task queue)** – Stores callback functions like from `setTimeout`, `setInterval`.
4. **Microtask Queue** – Stores microtasks like `Promise.then`, `queueMicrotask`.

---

## 🔁 Event Loop Flow

1. Execute everything in the **Call Stack**.
2. If Call Stack is empty:
   - Run all **Microtasks** from the **Microtask Queue** (until it’s empty).
   - Then run the **next Macro-task** from the **Callback Queue**.
3. Repeat.

> 🔥 Microtasks always run before Macro-tasks (if the stack is empty).

---

## 🧪 Example 1 – Basic Event Loop with setTimeout and Promises

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

console.log("End");
```

### 🧠 Output:

```
Start
End
Promise 1     // from Microtask Queue
Timeout 1     // from Callback (Macro-task) Queue
```

---

## 🧪 Example 2 – Microtask before Macrotask

```js
setTimeout(() => console.log("Macro-task (timeout)"), 0);

Promise.resolve().then(() => {
  console.log("Micro-task (promise)");
});
```

### 🧠 Output:

```
Micro-task (promise)
Macro-task (timeout)
```

---

## ⚙️ Microtask Queue

- Executed **after** the current script (synchronous code) but **before** any `setTimeout`, `setInterval`, etc.
- Includes:
  - `Promise.then`
  - `Promise.catch`
  - `Promise.finally`
  - `queueMicrotask()`

```js
queueMicrotask(() => {
  console.log("Microtask from queueMicrotask");
});
```

---

## ⚙️ Task Queue (Macro-task Queue)

Includes:

- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- `requestAnimationFrame`

```js
setTimeout(() => {
  console.log("setTimeout (macro-task)");
}, 0);
```

---

## 🧪 Example 3 – Microtask inside a Macrotask

```js
setTimeout(() => {
  console.log("Timeout 1");

  Promise.resolve().then(() => {
    console.log("Microtask inside Timeout");
  });
}, 0);
```

### 🧠 Output:

```
Timeout 1
Microtask inside Timeout
```

---

## 🧪 Example 4 – Multiple Microtasks

```js
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
  })
  .then(() => {
    console.log("Promise 2");
  });

queueMicrotask(() => {
  console.log("Microtask 1");
});
```

### 🧠 Output:

```
Promise 1
Promise 2
Microtask 1
```

(Note: `.then` returns another Promise, hence it gets queued as another microtask.)

---

## ⚡ Async/Await and the Event Loop

`async/await` is syntax sugar for Promises. Awaited functions get queued in the **microtask queue** after the current function finishes.

### 🧪 Example 5 – Async/Await Behavior

```js
async function asyncFunc() {
  console.log("Inside asyncFunc");
  await Promise.resolve();
  console.log("After await");
}

console.log("Start");
asyncFunc();
console.log("End");
```

### 🧠 Output:

```
Start
Inside asyncFunc
End
After await
```

---

## 🔁 Visual Order Summary

```
Call Stack
↓
Microtask Queue (Promises, queueMicrotask)
↓
Macrotask Queue (setTimeout, setInterval)
↓
Event Loop runs this cycle continuously
```

---

## 🧪 Example 6 – Final Mixed Test

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

queueMicrotask(() => {
  console.log("4");
});

console.log("5");
```

### 🧠 Output:

```
1
5
3
4
2
```

---

## 🔍 Node.js Specifics

- `process.nextTick()` is a microtask (but runs **before** regular microtasks).
- `setImmediate()` is a macrotask but runs after I/O events.

---

## 📝 Summary Notes

- JavaScript is **single-threaded**, but async code runs using the **event loop**.
- Microtasks (Promises, queueMicrotask) always run before macro-tasks (setTimeout).
- Each event loop cycle:
  1. Executes sync code in Call Stack
  2. Executes all Microtasks
  3. Executes one Macro-task
