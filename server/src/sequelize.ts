import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URI!, {
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false 
          }
    }
});

export default sequelize;