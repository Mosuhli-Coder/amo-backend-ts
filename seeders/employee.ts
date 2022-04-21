import { NextFunction, Request, Response } from "express";
import db from "../models";

const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    let {companyId, firstName, lastName, phoneNumber, idOrPassport, hourlyPay, monthlyPay, isDirector} = req.body

    try{
        const company = await db.Company.findOne({where: {companyId: companyId}})

        const employee = await db.Employee.create({firstName, lastName, phoneNumber, idOrPassport, hourlyPay, monthlyPay, isDirector, companyId: company.id})
        
        return res.json(employee)
    }catch(err) {
        console.log(err)
        return res.status(500).json({ err: "Something went wrong" })
    }
};
const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // const employees = await Employee.findAll({include: [{model: Company, as: 'company'}]}) 
        const employees = await db.Employee.findAll({include: ['company']}) 

        return res.json(employees)
    }catch(err) {
        console.log(err)
        return res.status(500).json({ err: "Something went wrong" })
    }
};
const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId
    try{
        const employee = await db.Employee.findOne({
            where: {employeeId: employeeId},
            include: 'company',
        })

        return res.json(employee)
    }catch(err){
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
    }
};

export default { createEmployee, getEmployee, getEmployeeById };
