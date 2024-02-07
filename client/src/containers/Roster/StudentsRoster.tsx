import Sort from '@/components/roster/Sort';
import { STUDENT_TABLE_COLS } from '@/constants/students';
import { Student } from '@/types/students';
import EmptyRoster from './EmptyRoster';
import Spinner from '@/components/loaders/Spinner';

type StudentRosterProps = {
  students: Student[];
  loading?: boolean;
}

const StudentsRoster = ({ students, loading }: StudentRosterProps) => {
  if (!students.length && !loading) {
    return <EmptyRoster />
  }

  return (
    <div className="w-full px-5">
      <table className="text-content-2 font-medium font-poppins w-full">
        <thead>
          <tr className="text-left text-xs">
            {STUDENT_TABLE_COLS.map((column) => (
              <th key={column.fieldName} className="font-medium pb-5 px-2">
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.allowSort ? <Sort sortDirection="asc" /> : null}
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {students.map((student, index) => (
            <tr key={index}>
              {STUDENT_TABLE_COLS.map((column) => (
                <td key={column.fieldName} className="font-medium pb-5 px-2">
                  {(student as any)[column.fieldName]}
                </td>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}

export default StudentsRoster