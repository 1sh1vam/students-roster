import Button from "@/components/buttons/Button";
import ContentBox from "@/components/general/ContentBox";
import SearchBox from "@/components/inputs/SearchBox";
import { useMemo, useState } from "react";
import StudentsRoster from "./StudentsRoster";
import AddStudentForm from "./AddStudentForm";
import CustomSelect from "@/components/inputs/CutomSelect";
import { SUBJECTS } from "@/constants/subjects";
import RosterEntrySelect from "@/components/roster/RosterEntrySelect";
import Pagination from "@/components/roster/Pagination";
import { useStudents } from "@/hooks/useStudents";

const Roster = () => {
  const [showForm, setShowForm] = useState(false);  
  const [studentFilterText, setStudentFilterText] = useState('');
  const [subjectFilter, setSubjectFilter] = useState(SUBJECTS[0].value);
  const [tablePage, setTablePage] = useState(1);

  const {
    students,
    setPageSize,
    fetchStudents,
    currentPage,
    pageSize,
    fetchStudentsState,
    totalRecords,
  } = useStudents({ subjectFilter });

  const totalPages = Math.ceil(totalRecords / pageSize);

  const currentPageStudents = useMemo(() => {
    const startIndex = (tablePage-1) * pageSize;
    if (students.length < startIndex) {
      return []
    }

    const endIndex = startIndex + Math.min(pageSize, students.length - startIndex)

    return students.slice(startIndex, endIndex);
  }, [pageSize, tablePage, students])

  const handleSubjectChange = async (val: string) => {
    setSubjectFilter(val)
    // resetPagination();
    return fetchStudents(0, pageSize, val)
  }

  const handlePageSizeChange = async (size: number) => {
    setPageSize(size);
    // Reset the page to 1
    setTablePage(1);

    // If the page size is more than the data length fetch data with new pagesize
    if (students.length < size) {
      // resetPagination()
      return fetchStudents(0, size, subjectFilter)
    }
  }

  const handlePagination = async (pageNo: number) => {
    setTablePage(pageNo);

    const totalPages = (pageNo - 1) * pageSize;

    // If page is not fetched then only fetch new pages
    if (students.length <= totalPages) {
      return fetchStudents(currentPage)
    }
  }

  const openStudentForm = () => setShowForm(true);
  const closeStudentForm = () => setShowForm(false);

  console.log({ totalPages, currentPage, tablePage })
  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col gap-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <RosterEntrySelect onChange={handlePageSizeChange} />
        <div className="flex flex-col gap-2 items-start md:flex-row md:items-center">
          <CustomSelect
            containerClass="w-[120px]"
            options={SUBJECTS}
            defaultOption={SUBJECTS[0].value}
            onChange={(val) => handleSubjectChange(val as string)}
          />
          <SearchBox
            onSearch={(val) => setStudentFilterText(val)}
            clearSearch={() => setStudentFilterText("")}
            placeholder="Find Student"
          />
          <Button onClick={openStudentForm}>Add Student</Button>
        </div>
      </div>
      <ContentBox className="overflow-auto py-[13px]">
        <StudentsRoster loading={fetchStudentsState.status === 'loading'} students={currentPageStudents} />
      </ContentBox>
      {totalPages ? (
        <Pagination
          totalPages={totalPages}
          currentPage={tablePage}
          paginate={handlePagination}
        />
      ) : null}
      {showForm ? (
        <AddStudentForm
          closeForm={closeStudentForm}
        />
      ) : null}
    </div>
  );
};

export default Roster;
