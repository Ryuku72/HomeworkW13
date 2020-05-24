// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");
const connection = require("../config/connection")

const burgers = {
  all : function(callback) {

    const question = "Select burgerID, Title, Sum(SpiceLvL) as SpiceLvL, Sum(Price) as Price, time(Time) as Time, date(Time) as Date, checkOut, Purchased from Ingredients Inner JOIN burgerOrder on IngredientID = Ingredients.id  Inner Join Burgers on BurgerID = Burgers.id group by BurgerID order by burgerID desc;"
    
    const answer = function (err, res) {
        let tableArray = [];
        if (err) throw (err);
        if (res) {
            for (let i = 0; i < res.length; i++) {
                tableArray.push(res[i]);
            }
        }
        callback(tableArray);
        //console.log(tableArray)
    }
    connection.query(question, answer);
}, 

  // The variables cols and vals are arrays.
  create: function(cols, cb) {
    orm.create("burgers", cols, function(res) {
      cb(res);
    });
  },
  
  update: function(btnID, callback) {

    orm.updateStatus(btnID, function(data){
      callback(data);
  });
},

  delete: function(condition, cb) {
    orm.delete("Burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers;
