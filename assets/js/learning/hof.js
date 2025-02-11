let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let doubleNumber = [];
let result = 0;

// 1. FOREACH

// function showNumber(number) {
//   console.log(`Ini nomor Ke :  ${number}`);

//   result += number;
// }

// numbers.forEach(showNumber);

// console.log(result);

// numbers.forEach((number) => {
//   doubleNumber.push(number * 2);
// });

// console.log(doubleNumber);

//2.  MAP
// const doubleNumbers = numbers.map((number) => {
//   return number * 2;
// });

// console.log(doubleNumbers);

// doubleNumbers.forEach((doubleNumber) => {
//   result += doubleNumber;
// });

console.log(result);

// 3. FILTER
// const candidates = [
//   {
//     name: "A",
//     score: 70,
//     expectedSalary: 500,
//     prefferdPosition: "Frontend",
//   },
//   {
//     name: "B",
//     score: 40,
//     expectedSalary: 200,
//     prefferdPosition: "Fullstack",
//   },
//   {
//     name: "C",
//     score: 90,
//     expectedSalary: 900,
//     prefferdPosition: "Backend",
//   },
//   {
//     name: "D",
//     score: 80,
//     expectedSalary: 700,
//     prefferdPosition: "Fullstack",
//   },
// ];

// const criteria = {
//   score: 70,
//   expectedSalary: 1000,
//   prefferdPosition: "Backend",
// };

// const passCandidates = candidates.filter((candidate) => {
//   if (
//     candidate.score >= criteria.score &&
//     candidate.expectedSalary <= criteria.expectedSalary &&
//     candidate.prefferdPosition === criteria.prefferdPosition
//   )
//     return true;

//   return false;
// });

// console.log(passCandidates);

// 4. REDUCE
const sum = numbers.reduce((previous, current) => {
  console.log("previous :", previous);
  console.log("current :", current);
  console.log("previous + current :", previous + current);
  return previous + current;
});

console.log(sum);
