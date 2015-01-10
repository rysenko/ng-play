var FixturesGenerator = (function () {
    function FixturesGenerator () {}
    FixturesGenerator.prototype.getStr = function () {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    };
    FixturesGenerator.prototype.getName = function () {
        var name = this.getStr();
        return name.charAt(0).toUpperCase() + name.slice(1);
    };
    FixturesGenerator.prototype.getEmail = function () {
        return this.getStr() + '@' + this.getStr() + '.com';
    };
    FixturesGenerator.prototype.getAge = function () {
        return Math.floor(Math.random() * 60 + 20);
    };
    FixturesGenerator.prototype.getGender = function () {
        return Math.random() > 0.5 ? 'Male' : 'Female';
    };
    FixturesGenerator.prototype.getUser = function (index) {
        return {
            Id: index,
            FirstName: this.getName(),
            LastName: this.getName(),
            Email: this.getEmail(),
            Age: this.getAge(),
            Gender: this.getGender()
        }
    };
    FixturesGenerator.prototype.getUsers = function (numUsers) {
        var persons = [];
        for (var i = 0; i < numUsers; i++) {
            persons.push(this.getUser(i));
        }
        return persons;
    };
    return FixturesGenerator;
})();

module.exports = new FixturesGenerator();