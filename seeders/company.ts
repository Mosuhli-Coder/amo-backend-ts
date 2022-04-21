import { NextFunction, Request, Response } from "express";
import db from "../models";

const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { companyName, location, phoneNumber } = req.body;

  // const company = await db.Company.create({companyName, location, phoneNumber});

  try {
    const company = await db.Company.create({
      companyName,
      location,
      phoneNumber,
    });

    return res.json(company);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};
const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await db.Company.findAll();

    return res.json(companies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};
const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.params.companyId
    try{
        const companies = await db.Company.findOne({
            where: {companyId: companyId},
            include: 'employees',
        })

        return res.json(companies)
    }catch(err){
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
    }
};

export default { createCompany, getCompany, getCompanyById };
