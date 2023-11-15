// import { describe, expect, test } from "vitest";

// import {
//   testPasswordContainsNumber,
//   testPasswordContainsSpecialCharacter,
//   testPasswordContainsUppercaseLetter,
//   testPasswordLength,
// } from "../utils/testPasswordStrength";

// describe("testPasswordLength", () => {
//   test("Tests that an empty string returns false", () => {
//     expect(testPasswordLength("")).toBe(false);
//   });

//   test("Tests that strings of length less than 8 return false", () => {
//     expect(testPasswordLength("1")).toBe(false);
//     expect(testPasswordLength("a")).toBe(false);
//     expect(testPasswordLength("!")).toBe(false);
//     expect(testPasswordLength("B")).toBe(false);
//     expect(testPasswordLength("aB1!#")).toBe(false);
//     expect(testPasswordLength("abC12!#")).toBe(false);
//   });

//   test("Tests that strings of length of at least 8 return true", () => {
//     expect(testPasswordLength("12345678")).toBe(true);
//     expect(testPasswordLength("abcdefgh")).toBe(true);
//     expect(testPasswordLength("!!!!!!!!")).toBe(true);
//     expect(testPasswordLength("1234abcdABCD!#$*")).toBe(true);
//   });
// });

// describe("testPasswordContainsUppercaseLetter", () => {
//   test("Tests that a string with no uppercase letter returns false", () => {
//     expect(testPasswordContainsUppercaseLetter("")).toBe(false);
//     expect(testPasswordContainsUppercaseLetter("1")).toBe(false);
//     expect(testPasswordContainsUppercaseLetter("abc123!#")).toBe(false);
//   });

//   test("Tests that a string with an uppercase letter returns true", () => {
//     expect(testPasswordContainsUppercaseLetter("A")).toBe(true);
//     expect(testPasswordContainsUppercaseLetter("abcD123!#")).toBe(true);
//   });
// });

// describe("testPasswordContainsNumber", () => {
//   test("Tests that a string with no numbers returns false", () => {
//     expect(testPasswordContainsNumber("")).toBe(false);
//     expect(testPasswordContainsNumber("a")).toBe(false);
//     expect(testPasswordContainsNumber("abcABC!#")).toBe(false);
//   });

//   test("Tests that a string with a number returns true", () => {
//     expect(testPasswordContainsNumber("1")).toBe(true);
//     expect(testPasswordContainsNumber("abcD123!#")).toBe(true);
//   });
// });

// describe("testPasswordContainsSpecialCharacter", () => {
//   test("Tests that a string with no special characters returns false", () => {
//     expect(testPasswordContainsSpecialCharacter("")).toBe(false);
//     expect(testPasswordContainsSpecialCharacter("a")).toBe(false);
//     expect(testPasswordContainsSpecialCharacter("abcABC123")).toBe(false);
//   });

//   test("Tests that a string with a special character returns true", () => {
//     expect(testPasswordContainsSpecialCharacter("!")).toBe(true);
//     expect(testPasswordContainsSpecialCharacter("abcD123!#")).toBe(true);
//   });
// });
