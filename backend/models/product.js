module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {type: DataTypes.STRING, required: true, allowNull: false},
        short_explanation: {type: DataTypes.STRING, required: true, allowNull: false, defaultValue: ''},
        slug: {type: DataTypes.STRING, required: true, allowNull: false, defaultValue: ''},
        photo_src: {type: DataTypes.STRING, required: true, allowNull: false, defaultValue: ''},
        comment_count: {type: DataTypes.INTEGER, required: true, allowNull: false, defaultValue: 0},
        average_star: {type: DataTypes.DECIMAL(10, 2), required: true, allowNull: false, defaultValue: 0.0},
    });

    Product.associate = function(models) {
        // Product has many reviews
        Product.hasMany(models.Review, { foreignKey: 'ProductId' });
        Product.hasMany(models.Category, { foreignKey: 'ProductId' });
    };

    return Product;
};