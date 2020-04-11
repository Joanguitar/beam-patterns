module.exports = {

    random: function() {
        return Math.random();
    },

    randomElement: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    factorial: function(n) {
        return n * (n-1);
    }
};
