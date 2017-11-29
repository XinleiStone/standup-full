var pet = {
    words: "...",
    speak: function (say) {
        console.log(say + ': ' + this.words);
    }
};

pet.speak('Speak');

var dog = {
    words: "waowao"
};

pet.speak.call(dog, "Speak");