"use strict";

import { Model } from "sequelize";

interface CompanyAttributes {
  companyId: string;
  companyName: string;
  location: string;
  phoneNumber: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Company extends Model<CompanyAttributes> 
  implements CompanyAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    companyId!: string;
    companyName!: string;
    location!: string;
    phoneNumber!: string;
    static associate(models:any) {
      // define association here
      this.hasMany(models.Employee, {foreignKey: 'companyId', as: 'employees'})
      // Company.belongsToMany(models.Employee, {
      //   through: 'Employee'
      // })

    }
  }
  Company.init(
    {
      companyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Campany must have name'},
          notEmpty: {msg: 'Campany must not be empty'}
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Campany must have location'},
          notEmpty: {msg: 'Location must not be empty'}
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Campany must have phone number'},
          notEmpty: {msg: 'Phone number must not be empty'}
        }
      },
    },
    {
      sequelize,
      tableName: "companies",
      modelName: "Company",
    }
  );
  return Company;
};
