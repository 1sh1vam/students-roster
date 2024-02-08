import { Student } from "@/types/students";

export const filterStudents = (students: Student[], searchText?: string) => {
  if (!searchText) return students;

  const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search

  return students.filter(
    (student) =>
      regex.test(student.name) ||
      regex.test(student.email) ||
      regex.test(student.id.toString())
  );
};

export type SortConfigT = {
  key: "name" | "id" | null;
  direction?: "asc" | "desc";
};

export const sortStudents = (students: Student[], sortConfig: SortConfigT) => {
  const key = sortConfig.key;
  if (!key) {
    return students;
  }

  const studentsCopy = [ ...students ];

  studentsCopy.sort((a, b) => {
    const aFieldVal = a[key];
    const bFieldVal = b[key];

    const keyA =
      typeof aFieldVal === "string" ? aFieldVal.toLowerCase() : aFieldVal;
    const keyB =
      typeof bFieldVal === "string" ? bFieldVal.toLowerCase() : bFieldVal;

    if (sortConfig.direction === "asc") {
      return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
    } else if (sortConfig.direction === "desc") {
      return keyB < keyA ? -1 : keyB > keyA ? 1 : 0;
    }

    return 0;
  });

  return studentsCopy
};
