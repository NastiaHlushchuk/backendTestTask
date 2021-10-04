
const Sequelize = require('sequelize');
const config = require('../config').db;

const UserModel = require('./User');
const ItemModel = require('./Item');
const TokenModel = require('./Token');
const ImageModel = require('./Image');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
});

sequelize
    .authenticate(Sequelize.QueryOptions)
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, Sequelize.DataTypes);
const Item = ItemModel(sequelize, Sequelize.DataTypes);
const Token = TokenModel(sequelize, Sequelize.DataTypes);
const Image = ImageModel(sequelize, Sequelize.DataTypes);

Token.User = Token.belongsTo(User);
User.Token = User.hasOne(Token);
Item.User = Item.belongsTo(User);
User.Items = User.hasMany(Item);
Image.Item = Image.belongsTo(Item);
Item.Images = Item.hasMany(Image);

db.User = User;
db.Item = Item;
db.Token = Token;
db.Image = Image;

module.exports = db;
