import { Student } from "@/types/students";

export const filterStudents = (students: Student[], searchText?: string) => {
    if (!searchText) return students;

    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search

    return students.filter((student) => regex.test(student.name))
}

