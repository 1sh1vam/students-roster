import Button from '@/components/buttons/Button';
import { STUDENT_TABLE_COLS } from '@/constants/students';

type EmptyRosterProps = {
  addStudent?: () => void;
}

const EmptyRoster = ({ addStudent }: EmptyRosterProps) => {
  return (
    <div className="h-full px-5 py-3 flex flex-col">
        <div className="flex flex-row items-center justify-between">
            {STUDENT_TABLE_COLS.map((column) => <p key={column.fieldName} className="text-xs text-content-2 font-medium">{column.label}</p>)}
        </div>
        <div className="flex-1 flex flex-row items-center justify-center text-center">
            <div>
                <p className="text-sm text-content-2 mb-2">You do not have any students on the roster</p>
                <Button onClick={addStudent} variant="ghost">Add Student</Button>
            </div>
        </div>
    </div>
  )
}

export default EmptyRoster