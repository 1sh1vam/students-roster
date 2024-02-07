import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Student extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare subjects: string;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    subjects: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'students',
    modelName: 'Student'
  }
);

export default Student;
