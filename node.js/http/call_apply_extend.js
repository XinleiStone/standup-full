var pet = function(words) {
    this.words = words;
    this.speak = function() {
        console.log(this.words);
    };
};

var dog = function(words) {
    //pet.call(this, words);
    pet.apply(this, arguments);
};

var xiaogou = new dog("wo shi xiao gou");
xiaogou.speak();