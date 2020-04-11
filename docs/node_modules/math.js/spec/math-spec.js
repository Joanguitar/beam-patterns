var math = require('../index');
var constants = require('../lib/constants');
var PI = constants.PI;

describe('#math.js', function() {

    it("Testing ceil function", function () {
        expect(math.ceil(13)).toEqual(20);
        expect(math.ceil(111)).toEqual(120);
        expect(math.ceil(90)).toEqual(90);
    });

    it("Testing round function", function () {
        expect(math.round(13)).toEqual(13);
        expect(math.round(11.4)).toEqual(11);
        expect(math.round(-20.51)).toEqual(-21);
    });

    it("Testing fround function", function () {
        expect(math.fround(13)).toEqual(13);
        expect(math.fround(1.337)).toEqual(1.3370000123977661);
        expect(math.fround(1.5)).toEqual(1.5);
    });

    it("Testing floor function", function () {
        expect(math.floor(45.95)).toEqual(45);
        expect(math.floor(-45.95)).toEqual(-46);
        expect(math.floor(5)).toEqual(5);
    });

    it("Testing random function", function () {
        expect(math.random()).toEqual(jasmine.any(Number));
    });

    it("Testing sign function", function () {
        expect(math.sign(3)).toEqual(1);
        expect(math.sign(-3)).toEqual(-1);
        expect(math.sign(NaN)).toBeNaN();
    });

    it("Testing drop digit functions", function () {
        expect(math.dropFirstDigit(4595)).toEqual(595);
        expect(math.dropFirstDigit(12345987)).toEqual(2345987);
        expect(math.dropLastDigit(12345987)).toEqual(1234598);
        expect(math.dropLastDigit(65890)).toEqual(6589);
        expect(math.dropDigit(65890,3)).toEqual(6590);
        expect(math.dropDigit(12853468,7)).toEqual(1285348);
    });

    it("Testing format function", function() {
        expect(math.format(4.66364, 2)).toEqual(4.66);
        expect(math.format(4.66364, 1)).toEqual(4.7);
        expect(math.format(1.23e-10, 1)).toEqual(0.0);
    });

    it("Testing abs function", function() {
        expect(math.abs(-4)).toEqual(4);
        expect(math.abs(14)).toEqual(14);
        expect(math.abs(-14.4)).toEqual(14.4);
    });

    it("Testing array functions", function() {
        expect([1,2,3,4,5]).toContain( math.randomElement([1,2,3,4,5]) );
        expect([534,34,435]).not.toContain( math.randomElement([1,2,3,4,5]) );
        expect(math.maxElement([1,2,100])).toEqual(100);
        expect(math.minElement([1, -10, 10, 100])).toEqual(-10);
    });

    it("Testing pow function", function() {
        expect(math.pow(3, 2)).toEqual(9);
        expect(math.pow(3, 3)).toEqual(27);
    });

    it("Testing square function", function() {
        expect(math.square(3)).toEqual(9);
        expect(math.square(15)).toEqual(225);
    });

    it("Testing imul function", function() {
        expect(math.imul(2,4)).toEqual(8);
        expect(math.imul(-2,-2)).toEqual(4);
    });

    it("Testing cube function", function() {
        expect(math.cube(3)).toEqual(27);
        expect(math.cube(0)).toEqual(0);
    });

    it("Testing sqrt function", function() {
        expect(math.sqrt(9)).toEqual(3);
        expect(math.sqrt(81)).toEqual(9);
    });

    it("Testing cbrt function", function() {
        expect(math.cbrt(27)).toEqual(3);
        expect(math.cbrt(null)).toEqual(0);
    });

    it("Testing exp function", function() {
        expect(math.exp(0)).toEqual(1);
        expect(math.exp(1)).toEqual(2.718281828459045);
    });

    it("Testing exp function", function() {
        expect(math.expm1(0)).toEqual(0);
        expect(math.expm1(1)).toEqual(1.718281828459045);
    });

    it("Testing between function", function() {
        expect(math.between(4, 7, 10)).toBeFalsy();
        expect(math.between(4, 4, 10)).toBeTruthy();
        expect(math.between(4, 3, 10)).toBeTruthy();
    });

    it("Testing trunv function", function() {
        expect(math.trunc(4.5632)).toEqual(4);
        expect(math.trunc(-0.123)).toEqual(0);
        expect(math.trunc(NaN)).toBeNaN();
    });

    it("Testing temperature functions", function() {
        expect(math.toFahrenheit(37)).toBeCloseTo(98.6);
        expect(math.toCelsius(98.6)).toBeCloseTo(37);
    });

    it("Testing hypot function", function() {
        expect(math.hypot(4,3)).toEqual(5);
        expect(math.hypot(4,3,5)).toEqual(7.0710678118654755);
        expect(math.hypot(-3)).toEqual(3);
    });

    it("Testing greatestCommonDivisor function", function() {
        expect(math.greatestCommonDivisor(2, 6)).toEqual(2);
        expect(math.greatestCommonDivisor(72, 24)).toEqual(24);
    });

    it("Testing factorial function", function() {
        expect(math.factorial(3)).toEqual(6);
        expect(math.factorial(5)).toEqual(20);
        expect(math.factorial(5)).toEqual(20);
        expect(math.factorial(15)).toNotBe(20);
    });

    it("Testing prime function", function() {
        expect(math.isPrime(37)).toBeTruthy();
        expect(math.isPrime(36)).toBeFalsy();
    });

    it("Testing even function", function() {
        expect(math.isEven(42)).toBeTruthy();
        expect(math.isEven(31)).toBeFalsy();
    });

    it("Testing odd function", function() {
        expect(math.isOdd(7)).toBeTruthy();
        expect(math.isOdd(14)).toBeFalsy();
    });

    it("Common log tests", function() {
        expect(math.log(-1)).toBeNaN();
        expect(math.log(1)).toEqual(0);
        expect(math.log(10)).toEqual(2.302585092994046);
        expect(math.log(0)).toBeNegativeInfinity();
    });

    it("Common log2 tests", function() {
        expect(math.log2(3)).toEqual(1.584962500721156);
        expect(math.log2(2)).toEqual(1);
        expect(math.log2(1)).toEqual(0);
        expect(math.log2(0)).toBeNegativeInfinity();
        expect(math.log2(-2)).toBeNaN();
        expect(math.log2(1024)).toEqual(10);
    });

    it("Common log10 tests", function() {
        expect(math.log10(2)).toEqual(0.3010299956639812);
        expect(math.log10(1)).toEqual(0);
        expect(math.log10(0)).toBeNegativeInfinity();
        expect(math.log10(-2)).toBeNaN();
        expect(math.log10(100000)).toEqual(5);
    });

    it("Common log1p tests", function() {
        expect(math.log1p(1)).toBeCloseTo(0.693, 0);
        expect(math.log1p(-1)).toBeNegativeInfinity();
        expect(math.log1p(-2)).toBeNaN();
    });

    it("Testing unit converters", function() {
        expect(math.feetToInches(3)).toEqual(36);
        expect(math.feetToMeters(32)).toEqual(9.7536);
        expect(math.feetToMiles(40000)).toBeCloseTo(7.6, 0);
        expect(math.feetToYards(123)).toEqual(41);
        expect(math.inchesToFeet(42)).toEqual(3.5);
        expect(math.inchesToMeters(123)).toEqual(3.1242);
        expect(math.inchesToMiles(45000)).toBeCloseTo(0.71, 0);
        expect(math.inchesToYards(42)).toBeCloseTo(1.17, 0);
        expect(math.milesToFeet(2.6)).toEqual(13728);
        expect(math.milesToInches(0.5)).toEqual(31680);
        expect(math.milesToMeters(11)).toBeCloseTo(17702.8, 0);
        expect(math.milesToYards(42)).toEqual(73920);
        expect(math.yardsToFeet(3)).toEqual(9);
        expect(math.yardsToInches(42)).toEqual(1512);
        expect(math.yardsToMeters(42)).toBeCloseTo(38.4048, 0);
        expect(math.yardsToMiles(42)).toBeCloseTo(0.024, 0);
    });

    it("Testing trigonometric functions", function() {
        expect(math.sin(0)).toEqual(0);
        expect(math.sin(1)).toBeCloseTo(0.8, 0);
        expect(math.sin(PI / 2)).toEqual(1);
        expect(math.sin(PI / 4)).toBeCloseTo(constants.SQRT2 / 2, 0); // also provide a function for Math.sqrt()

        expect(math.cos(0)).toEqual(1);
        expect(math.cos(PI)).toEqual(-1);

        expect(math.tan(1)).toBeCloseTo(1.557, 0);

        expect(math.acos(-2)).toBeNaN();
        expect(math.acos(2)).toBeNaN();
        expect(math.acos(1)).toEqual(0);
        expect(math.acos(0.5)).toBeCloseTo(1.047, 0);

        expect(math.asin(-2)).toBeNaN();
        expect(math.asin(0)).toEqual(0);
        expect(math.asin(1)).toBeCloseTo(1.57, 0);

        expect(math.acosh(-1)).toBeNaN();
        expect(math.acosh(0)).toBeNaN();
        expect(math.acosh(1)).toEqual(0);
        expect(math.acosh(2)).toBeCloseTo(1.32, 0);

        expect(math.atan(0)).toEqual(0);
        expect(math.atan(-0)).toEqual(-0);
        expect(math.atan(Infinity)).toBeCloseTo(1.57, 0);

        expect(math.atan2(0, 1)).toEqual(0);
        expect(math.atan2(1, 0)).toEqual(PI / 2);
        expect(math.atan2(math.sqrt(3), 1)).toEqual(PI / 3);
    });

    it("Testing d* arithmetic functions", function() {
        expect(math.dCeil(12.56789, 3)).toEqual(12.568);
        expect(math.dCeil(12.1234, 3)).toEqual(12.124);
        expect(math.dCeil(12.1230, 3)).toEqual(12.123);

        expect(math.dRound(12.56789, 3)).toEqual(12.568);
        expect(math.dRound(12.1234, 3)).toEqual(12.123);
        expect(math.dRound(12.1230, 3)).toEqual(12.123);
        
        expect(math.dFloor(12.56789, 3)).toEqual(12.567);
        expect(math.dFloor(12.1234, 3)).toEqual(12.123);
        expect(math.dFloor(12.1230, 3)).toEqual(12.123);
        
        expect(math.dTrunc(12.56789, 3)).toEqual(12.567);
        expect(math.dTrunc(12.1234, 3)).toEqual(12.123);
        expect(math.dTrunc(12.1230, 3)).toEqual(12.123);
    });

});


