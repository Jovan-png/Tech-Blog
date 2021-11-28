const { Model, DataTypes} = require('sequelize');
const sequalize = require('../config/connection')



class Comment extends Model{};


Comment.init({
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true
},

});




module.exports = Comment;