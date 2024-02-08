import Sort from '@/components/roster/Sort';
import { STUDENT_TABLE_COLS } from '@/constants/students';
import { Student } from '@/types/students';
import EmptyRoster from './EmptyRoster';
import Spinner from '@/components/loaders/Spinner';
import { SortConfigT } from '@/utils/students';
import React from 'react';

type StudentRosterProps = {
  students: Student[];
  loading?: boolean;
  sortConfig: SortConfigT;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfigT>>
}

const StudentsRoster = ({ students, loading, sortConfig, setSortConfig }: StudentRosterProps) => {

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      const config = { ...prev };

      if (config.key === key) {
        if (config.direction === 'desc') {
          config.key = null;
          config.direction = undefined
        }
        config.direction = 'desc';
      } else {
        config.key = key as SortConfigT['key'];
        config.direction = 'asc';
      }

      return config;
    });
  };

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
                  {column.allowSort ? (
                    <Sort
                      sortDirection={
                        sortConfig.key === column.fieldName
                          ? sortConfig.direction
                          : undefined
                      }
                      onClick={() => handleSort(column.fieldName)}
                    />
                  ) : null}
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

const MemoizedStudentsRoster = React.memo(StudentsRoster);
export default MemoizedStudentsRoster;