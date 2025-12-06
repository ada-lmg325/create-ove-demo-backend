import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatString } from "@/utils/string-formatter";
import { Dispatch, SetStateAction } from "react";

export type DropdownProps = {
  label: string;
  options: string[];
  currVal: string | null;
  onSelect: Dispatch<SetStateAction<any>>;
};

export function Dropdown({ currVal, label, options, onSelect }: DropdownProps) {
  console.log(currVal);
  return (
    <Select onValueChange={onSelect} value={currVal ?? "All"}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem value={option}>{formatString(option)}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
