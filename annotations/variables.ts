let apples: number = 5;
// if we try to assign a string to apples, we will get an error
// apples = '10'; // error
// apples = 10; // ok

let speed: string = "fast"; // ok
// speed = 10; // error
let hasName: boolean = true; // ok

let nothingMuch: null = null; // ok
let nothing: undefined = undefined; // ok

// built in objects
let now: Date = new Date(); // ok

// Array
let colors: string[] = ["red", "green", "blue"]; // ok
// the square brackets indicate that colors is an array of strings ==> string[]
let myNumbers: number[] = [1, 2, 3]; // ok
let truths: boolean[] = [true, false, true]; // ok

// Classes
// this is a type annotation for an instance of a class
class Car {}
let car: Car = new Car(); // ok

// Object literal
// this is a type annotation for an object literal
let point: { x: number; y: number } = {
    // semicolon is used to separate the properties
    x: 10,
    y: 20,
}; // ok
// point = { x: 20 }; // error
// point = { x: '10', y: 20 }; // error
// point = { x: 20, y: 10, z: 30 }; // error

// Function
// this is a type annotation for a function that takes two numbers and returns a number
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
}; // ok

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json); // ok
console.log(coordinates); // { x: 10, y: 20 }

// 2) When we declare a variable on one line and initialize it later
let words = ["red", "green", "blue"];
let foundWord: boolean; // ok
for (let i = 0; i < words.length; i++) {
    if (words[i] === "green") {
        foundWord = true;
    }
} // ok


// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false; // ok
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
        numberAboveZero = numbers[i];
    }
} // ok
// numberAboveZero = 'hello'; // error

// 4) When a function returns the 'any' type
const add = (a: number, b: number): number => {
    return a + b;
}; // ok

// 5) When a function returns the 'void' type
const subtract = (a: number, b: number): void => {
    a - b;
}; // error
// const subtract = (a: number, b: number): void => {
//     console.log(a - b);
// }; // ok

// 6) When we want to define a function on one line and initialize it later
let multiply: (a: number, b: number) => number; // ok
multiply = (a: number, b: number) => {
    return a * b;
}; // ok

// 7) When we want to define an object with properties that have different types
let weather: { date: Date; weather: string } = {
    date: new Date(),
    weather: "sunny",
}; // ok
// weather = { date: '2020-10-10', weather: 'sunny' }; // error
// weather = { date: new Date(), weather: 10 }; // error
