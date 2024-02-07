import Button from "@/components/buttons/Button";
import ContentBox from "@/components/general/ContentBox";
import SearchBox from "@/components/inputs/SearchBox";
import EmptyRoster from "./EmptyRoster";
import { useState } from "react";
import StudentsRoster from "./StudentsRoster";
import AddStudentForm from "./AddStudentForm";
import CustomSelect from "@/components/inputs/CutomSelect";
import { SUBJECTS } from "@/constants/subjects";
import RosterEntrySelect from "@/components/roster/RosterEntrySelect";
import Pagination from "@/components/roster/Pagination";

const Roster = () => {
  const students = [{
    id: 1,
    name: '123123',
    email: 'werwer',
    subjects: 'dfd'
  }];

  const [studentFilterText, setStudentFilterText] = useState('');
  const [subjectFilter, setSubjectFilter] = useState(SUBJECTS[0].value);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const openStudentForm = () => setShowForm(true);
  const closeStudentForm = () => setShowForm(false);

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col gap-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <RosterEntrySelect onChange={setPageSize} />
        <div className="flex flex-col gap-2 items-start md:flex-row md:items-center">
          <CustomSelect
            containerClass="w-[120px]"
            options={SUBJECTS}
            defaultOption={SUBJECTS[0].value}
            onChange={(val) => setSubjectFilter(val as string)}
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
        {students.length ? (
          <StudentsRoster students={students} />
        ) : (
          <EmptyRoster addStudent={openStudentForm} />
        )}
      </ContentBox>
      {totalPages ? (
        <Pagination
          itemsPerPage={pageSize}
          totalItems={totalPages}
          currentPage={currentPage}
          paginate={console.log}
        />
      ) : null}
      {showForm ? (
        <AddStudentForm
          addStudent={openStudentForm}
          closeForm={closeStudentForm}
        />
      ) : null}
    </div>
  );
};

export default Roster;
