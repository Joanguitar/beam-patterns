module.exports = {

    ceil: function(val) {
        return Math.ceil(val / 10) * 10;
    },

    round: function(n) {
        return Math.round(n);
    },

    fround: function(n) {
        return Math.fround(n)
    },

    /**
     * Returns the largest integer less than or equal to the given number.
     * @param n
     * @returns {number}
     */
    floor: function(n) {
        return Math.floor(n);
    },

    sign: function(n) {
        return Math.sign(n);
    },

    abs: function(n) {
        return Math.abs(n)
    },

    imul: function(a, b) {
        return Math.imul(a, b);
    },

    pow: function(base, exp) {
        return Math.pow(base, exp);
    },

    square: function(val) {
        return val * val;
    },

    cube: function(val) {
        return val * val * val;
    },

    sqrt: function(n) {
        return Math.sqrt(n);
    },

    cbrt: function (n) {
        return Math.cbrt(n);
    },

    exp: function (n) {
        return Math.exp(n);
    },

    expm1: function(n) {
        return Math.expm1(n);
    },

    trunc: function(n) {
        return Math.trunc(n);
    },

    greatestCommonDivisor: function gcd(x, y) {
        var remainder = x % y;
        if (remainder === 0) {
            return y;
        }

        return gcd(y, remainder);
    },

    log: function (n) {
        return Math.log(n);
    },

    log2: function (n) {
        return Math.log2(n);
    },

    log10: function (n) {
        return Math.log10(n);
    },

    log1p: function(n) {
        return Math.log1p(n);
    },

    hypot: function(...arr) {
        return Math.hypot(...arr);
    }, 

    /**
     * Performs ceil in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dCeil: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        console.log('dCeil', num, n, multiplyValue, Math.ceil(num / multiplyValue) * multiplyValue)
        return Math.ceil(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs round in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dRound: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.round(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs floor in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dFloor: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.floor(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs trunc in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dTrunc: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.trunc(num * multiplyValue) / multiplyValue;
    }

};
