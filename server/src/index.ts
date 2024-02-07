import dotenv from 'dotenv';
dotenv.config();
import { app } from "./app";
import sequelize from './sequelize';

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    } catch(err) {
        console.log('failed to connect to db', err);
    }
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}

start();