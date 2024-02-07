import { useState } from "react";
import Modal from "@/components/general/Modal";
import XIcon from "@/assets/icons/close.svg?react";
import Input from "@/components/inputs/Input";
import Label from "@/components/inputs/Label";
import CustomSelect from "@/components/inputs/CutomSelect";
import Button from "@/components/buttons/Button";
import { Student } from "@/types/students";
import { SUBJECTS } from "@/constants/subjects";
import { useStudents } from "@/hooks/useStudents";
import Spinner from "@/components/loaders/Spinner";

type AddStudentFormProps = {
  closeForm: () => void;
};

const studentObj = {
  name: '',
  email: '',
  subjects: SUBJECTS[0].value,
}

const AddStudentForm = ({ closeForm }: AddStudentFormProps) => {
  const [student, setStudent] = useState<Omit<Student, 'id'>>(studentObj);

  const { addStudent, addStudentState } = useStudents({});

  const handleChange = (fieldName: keyof Student, value: string) => {
    setStudent((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = async () => {
    await addStudent(student);
    closeForm()
  }

  const allFieldsFilled = Object.values(student).every((val) => !!val);

  return (
    <Modal
      wrapChildren
      wrapperClass="flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-4 md:px-0"
    >
      <div className="w-[480px] flex flex-col p-6 rounded-lg bg-neutral-light shadow-[0px_12px_28px_0px_rgba(22,22,22,0.50)]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold text-content-1">Add a new Student</p>
          <div onClick={closeForm} className="cursor-pointer text-content-2">
            <XIcon />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6">
          <Input
              value={student.name}
              onChange={({ target }) =>
                handleChange("name", target.value)
              }
              containerClass="w-[274px]"
              label="Student Name"
            />
            <Input
              value={student.email}
              onChange={({ target }) =>
                handleChange("email", target.value)
              }
              containerClass="w-[274px]"
              label="Email"
            />

          <Label containerClass="w-[274px]" text="Subject">
            <CustomSelect
              options={SUBJECTS}
              defaultOption={SUBJECTS[0].value}
              onChange={(val) => handleChange('subjects', val as string)}
            />
          </Label>
        </div>
        {addStudentState.status === 'failed' ? <p className="text-sm text-primary-red">{addStudentState.msg!}</p> : null}
        <Button onClick={handleSave} disabled={!allFieldsFilled} className="self-end flex items-center gap-1">
          {addStudentState.status === 'loading' ? <Spinner /> : null}
          Add Student
        </Button>
      </div>
    </Modal>
  );
};

export default AddStudentForm;
