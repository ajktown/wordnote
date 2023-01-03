/**
 * This file is a must for jest to compile your TS spec (test) data 
 * into javascript file. To learn more, check out the documents below.
 * 
 * https://jestjs.io/docs/getting-started#using-typescript
 * 
 * This file was auto generated by the following command on Console
 * $ yarn test config:init
 */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// TODO: Somehow the moduleNameMapper new setting causes the problem of yarn test, where individual test passes no problem.