const { Model, DataTypes} = require('sequelize');
const sequalize = require('../config/connection')



class Post extends Model{};


Post.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id:{

    },
    sequalize
})
module.exports = Post;