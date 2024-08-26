const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Address = require('./address')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.OrderItem = require('./orderItem')(sequelize, Sequelize);
db.Payment = require('./payment')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.PriceInfo = require('./priceInfo')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

db.ProductCategory = sequelize.define('ProductCategory', {}, { timestamps: false });

db.Address.belongsTo(db.User, {foreignKey: 'UserId'});
db.User.hasMany(db.Address, {foreignKey: 'UserId'});

db.Category.belongsToMany(db.Product, {through: db.ProductCategory});
db.Product.belongsToMany(db.Category, {through: db.ProductCategory});

db.Order.belongsTo(db.User, {foreignKey: 'UserId'});
db.User.hasMany(db.Order, {foreignKey: 'UserId'});

db.Order.hasMany(db.OrderItem, {foreignKey: 'OrderId'});
db.OrderItem.belongsTo(db.Product, {foreignKey: 'ProductId'});

db.OrderItem.belongsTo(db.Product, {foreignKey: 'ProductId'});

db.Payment.belongsTo(db.Order, {foreignKey: 'OrderId'});

db.Product.hasOne(db.PriceInfo, {foreignKey: 'ProductId'});
db.PriceInfo.belongsTo(db.Product, {foreignKey: 'ProductId'});

db.Product.hasMany(db.Review, {foreignKey: 'ProductId'});
db.Review.belongsTo(db.Product, {foreignKey: 'ProductId'});

db.User.hasMany(db.Review, {foreignKey: 'UserId'});
db.Review.belongsTo(db.User, {foreignKey: 'UserId'});

module.exports = db;