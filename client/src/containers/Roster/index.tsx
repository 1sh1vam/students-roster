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
import { SortConfigT, filterStudents, sortStudents } from "@/utils/students";

const Roster = () => {
  const [showForm, setShowForm] = useState(false);  
  const [studentFilterText, setStudentFilterText] = useState('');
  const [subjectFilter, setSubjectFilter] = useState(SUBJECTS[0].value);
  const [tablePage, setTablePage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfigT>({ key: null })

  const {
    students,
    setPageSize,
    fetchStudents,
    currentPage,
    pageSize,
    fetchStudentsState,
    totalRecords,
  } = useStudents({ subjectFilter });

  const filteredStudents = useMemo(() => filterStudents(students, studentFilterText), [students, studentFilterText]);
  const sortedStudents = useMemo(() => sortStudents(filteredStudents, sortConfig), [filteredStudents, sortConfig]);

  const totalNoOfStudents = studentFilterText ? filteredStudents.length : totalRecords;
  const totalPages = Math.ceil(totalNoOfStudents / pageSize);

  const currentPageStudents = useMemo(() => {
    const startIndex = (tablePage-1) * pageSize;
    if (sortedStudents.length < startIndex) return [];

    const endIndex = startIndex + Math.min(pageSize, sortedStudents.length - startIndex)

    return sortedStudents.slice(startIndex, endIndex);
  }, [pageSize, tablePage, sortedStudents])

  const handleSubjectChange = async (val: string) => {
    setTablePage(1);
    setSubjectFilter(val)
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
    
    // If page is not fetched then only fetch new pages
    if (students.length <= (pageNo - 1) * pageSize) {
      const size = (pageNo - currentPage);

      for (let i = 0; i<size; i++) {
        await fetchStudents(currentPage + i);
      }
    }
  }

  const openStudentForm = () => setShowForm(true);
  const closeStudentForm = () => setShowForm(false);

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
        <StudentsRoster
          loading={fetchStudentsState.status === "loading"}
          students={currentPageStudents}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </ContentBox>
      {totalPages ? (
        <Pagination
          totalPages={totalPages}
          currentPage={tablePage}
          paginate={handlePagination}
        />
      ) : null}
      {showForm ? <AddStudentForm closeForm={closeStudentForm} /> : null}
    </div>
  );
};

export default Roster;
