import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
import db from './models'
import seeder from "./seeders/company";

// const createCompany = () => {
//     company.map(company => {
//         db.Company.create(company);
//     })
// }
// createCompany();

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Company
app.post('/api/v1/company', seeder.createCompany)
app.get('/api/v1/companies', seeder.getCompany)
app.get('/api/v1/companies/:companyId', seeder.getCompanyById)


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})