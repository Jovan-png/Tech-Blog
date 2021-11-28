const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt')
const sequalize = require('../config/connection');

class User extends Model{};

User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emaail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [5]
        }
    },
    hooks:{
async beforeCreate(newUserData){
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    return newUserData;
}
    },
    sequalize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User;