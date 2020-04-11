# math.js [![npm](https://img.shields.io/npm/dt/math.js.svg)]() [![David](https://img.shields.io/david/toubou91/math.js.svg)]()
> A simple math library written in Javascript

## Install
[![https://nodei.co/npm/math.js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/math.js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/math.js)

## Use
```javascript
// load the module
var math = require('math.js');

// ask for a number's ceil
math.ceil(13);
```

### Arithmetic functions
```javascript
// Get a number's ceil
math.ceil(13);    // returns 13
math.ceil(13.4);  // returns 14

// Get a number's ceil on the 2nd decimal digit
math.dCeil(14.14, 2);   // returns 14.14
math.dCeil(14.143, 2);  // returns 14.15

// Get a number's round on the 2nd decimal digit
math.dRound(14.14, 2);   // returns 14.14
math.dRound(14.143, 2);  // returns 14.14

// Get a number's floor on the 2nd decimal digit
math.dFloor(14.14, 2);   // returns 14.14
math.dFloor(14.143, 2);  // returns 14.14

// Get a number's trunc on the 2nd decimal digit
math.dTrunc(14.14, 2);   // returns 14.14
math.dTrunc(14.143, 2);  // returns 14.14
```

## Test
To execute the library's tests, first install the project dependencies:

```
$ npm install
```

Then, run the tests
```
$ npm test
```
