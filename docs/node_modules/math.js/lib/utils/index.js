module.exports = {
    isPrime: function(n) {
        for (var i = 2 ; i < n ; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return n > 1;
    },

    isEven: function(n) {
        return n % 2 === 0;
    },

    isOdd: function(n) {
        return !this.isEven(n);
    },

    format: function(val, decimals) {
        return ( val.toFixed(decimals) )/1;
    },

    dropFirstDigit: function(n) {
        return Number(n.toString().substring(1));
    },

    dropLastDigit: function(n) {
        return Number(n.toString().substring(0, n.toString().length-1));
    },

    dropDigit: function(n, pos) {
        return Number(n.toString().substring(0, pos-1).concat(n.toString().substring(pos, n)));
    }
};
