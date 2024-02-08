import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import Student from "../models/student";

const router = express.Router();

router.post(
  "/api/students",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").toLowerCase().isEmail().withMessage("Invalid email address"),
    body("subjects").notEmpty().withMessage("Subjects is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const newStudent = await Student.create(req.body);
    
    res.status(201).send({
        data: newStudent
    })
  }
);

router.get('/api/students', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 5;

    const filters: Record<string, any> = {};
    if (req.query.subject) {
      filters.subjects = req.query.subject;
    }

    const students = await Student.findAndCountAll({
      where: filters,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    res.send({
      total: students.count,
      page,
      pageSize,
      data: students.rows,
    });
})

export { router as studentsRouter };
