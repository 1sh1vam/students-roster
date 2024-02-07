import CustomSelect from "../inputs/CutomSelect";

type RosterEntrySelectProps = {
  onChange: (val: number) => void;
};

const rosterEntrySizes = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
];

const RosterEntrySelect = ({ onChange }: RosterEntrySelectProps) => {

  return (
    <div className="flex flex-row items-center gap-1 text-content-2 text-xs">
      <span>Show</span>
      <CustomSelect
        containerClass="w-[70px] px-2 py-2"
        btnClassName="px-2 py-1"
        options={rosterEntrySizes}
        defaultOption={rosterEntrySizes[0].value}
        onChange={(val) => onChange(val as number)}
      />
      <span>entries</span>
    </div>
  );
};

export default RosterEntrySelect;
