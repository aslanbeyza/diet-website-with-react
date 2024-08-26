module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        address_line1: {type: DataTypes.STRING, required: true, allowNull: false},
        address_line2: {type: DataTypes.STRING, required: false, allowNull: true},
        city: {type: DataTypes.STRING, required: true, allowNull: false},
        state: {type: DataTypes.STRING, required: true, allowNull: false},
        postal_code: {type: DataTypes.STRING, required: true, allowNull: false},
        country: {type: DataTypes.STRING, required: true, allowNull: false},
        is_primary: {type: DataTypes.BOOLEAN, required: true, allowNull: false, defaultValue: false},
    });

    return Address;
};