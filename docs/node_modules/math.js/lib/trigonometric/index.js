module.exports = {
// Trigonometric functions
    sin: function (n) {
        return Math.sin(n);
    },

    cos: function (n) {
        return Math.cos(n);
    },

    tan: function (n) {
        return Math.tan(n);
    },

    acos: function (n) {
        return Math.acos(n);
    },

    asin: function (n) {
        return Math.asin(n);
    },

    acosh: function (n) {
        return Math.acosh(n);
    },

    atan: function (n) {
        return Math.atan(n);
    },

    /**
     * Arc tangent of two numbers. Both arguments are used to determine the quadrant of the result.
     * @param y
     * @param x
     * @returns {number} an angle expressed in radians
     */
    atan2: function (y, x) {
        return Math.atan2(y, x);
    }

};
