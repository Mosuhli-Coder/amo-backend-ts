'use strict';
import {
  Model
} from 'sequelize';

interface EmployeeAttributes {
  employeeId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  idOrPassport: string;
  hourlyPay: string;
  monthlyPay: string;
  isDirector: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Employee extends Model<EmployeeAttributes> 
  implements EmployeeAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    employeeId!: string;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    idOrPassport!: string;
    hourlyPay!: string;
    monthlyPay!: string;
    isDirector!: string;
    static associate(models:any) {
      // define association here
      this.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
    }
  }
  Employee.init({
    employeeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    idOrPassport: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    hourlyPay: {
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    monthlyPay: {
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    isDirector: {
      type:DataTypes.BOOLEAN,
      defaultValue: DataTypes.False,
    },
  }, {
    sequelize,
    tableName: "employees",
    modelName: 'Employee',
  });
  return Employee;
};