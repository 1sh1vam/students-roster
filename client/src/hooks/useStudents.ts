import axiosClient from "@/lib/http/axios";
import { StateT } from "@/types/states";
import { Student, StudentResponseT } from "@/types/students";
import { useEffect, useState } from "react";

type UseStudentsProps = {
  subjectFilter?: string
}

export const useStudents = ({ subjectFilter }: UseStudentsProps) => {
  const [students, setStudents] = useState<Student[]>([]);

  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [fetchStudentsState, setFetchStudentsState] = useState<StateT>({ status: 'loading' });
  const [addStudentState, setAddStudentState] = useState<StateT>({ status: 'init' });

  useEffect(() => {
    fetchStudents();
  }, [])


  const fetchStudents = async (pageNo = 0, size = pageSize, subject = subjectFilter) => {
    try {
      setFetchStudentsState({ status: 'loading' });
      let query = `?page=${pageNo+1}&pageSize=${size}`;
      if (subjectFilter) query += `&subject=${subject}`;

      const response = await axiosClient<StudentResponseT>('/api/students' + query)
      const resData = response.data;
      setTotalRecords(resData.total);
      setCurrentPage(resData.page);
      setStudents((prev) => pageNo ? [...prev, ...resData.data] : resData.data);
      setFetchStudentsState({ status: 'success' });
    } catch(err) {
      setFetchStudentsState({ status: 'failed', msg: (err as Error).message })
    }
  }

  const addStudent = async (payload: Omit<Student, 'id'>) => {
    try {
      setAddStudentState({ status: 'loading' });
      await axiosClient.post<StudentResponseT>('/api/students', payload)
      setAddStudentState({ status: 'success' });
    } catch(err) {
      setAddStudentState({ status: 'failed', msg: (err as Error).message });
      throw err;
    }
  }

  return {
    students,
    fetchStudents,
    addStudent,
    setPageSize,
    pageSize,
    currentPage,
    setCurrentPage,
    totalRecords,
    fetchStudentsState,
    addStudentState,
  }
}