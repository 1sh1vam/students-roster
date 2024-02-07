import Button from '@/components/buttons/Button';
import Sort from '@/components/roster/Sort';
import { STUDENT_TABLE_COLS } from '@/constants/students';
import { Student } from '@/types/students';

type StudentRosterProps = {
  students: Student[];
}

const StudentsRoster = ({ students }: StudentRosterProps) => {
  return (
    <div className="w-full px-5">
      <table className="text-content-2 font-medium font-poppins w-full">
        <thead>
          <tr className="text-left text-xs">
            {STUDENT_TABLE_COLS.map((column) => (
              <th key={column.fieldName} className="font-medium pb-5">
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.allowSort ? <Sort sortDirection='asc' /> : null}
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
                <td key={column} className="font-medium pb-5">
                  {(student as any)[column.fieldName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsRoster