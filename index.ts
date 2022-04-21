import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
import db from './models'
import seederCompany from "./seeders/company";
import seederEmployee from "./seeders/employee";

// const createCompany = () => {
//     company.map(company => {
//         db.Company.create(company);
//     })
// }
// createCompany();

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Company EndPoint
app.post('/api/v1/company', seederCompany.createCompany)
app.get('/api/v1/companies', seederCompany.getCompany)
app.get('/api/v1/companies/:companyId', seederCompany.getCompanyById)

// Employee EndPoint
app.post('/api/v1/employee', seederEmployee.createEmployee)
app.get('/api/v1/employees', seederEmployee.getEmployee)
app.get('/api/v1/employee/:employeeId', seederEmployee.getEmployeeById)


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})