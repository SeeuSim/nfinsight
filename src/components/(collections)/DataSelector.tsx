import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IDataSelectorProps {
  value: string;
  onValueChange: (v: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const DataSelector = ({
  value,
  onValueChange,
  options,
}: IDataSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="space-x-2 border-2 border-slate-900 !outline-none ring-0 focus:ring-0">
        <SelectValue className="!outline-none" />
        <ChevronDown className="h-4 w-4" />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-2 border-b-4 border-r-4 border-slate-900">
        {options.map((optionValue, index) => (
          <SelectItem value={optionValue.value} key={index}>
            {optionValue.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DataSelector;
