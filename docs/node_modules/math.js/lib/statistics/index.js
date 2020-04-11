module.exports = {

    minElement: function(arr) {
        return Math.min.apply(null, arr);
    },

    maxElement: function(arr) {
        return Math.max.apply(null, arr);
    },

    between: function (val, min, max) {
        return min<=val==val<=max;
    }
}
