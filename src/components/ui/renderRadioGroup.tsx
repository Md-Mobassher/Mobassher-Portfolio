import { AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RenderRadioGroupProps {
  key: string;
  options: { value: string; label: string }[];
  selectedFilters: { [key: string]: string };
  handleRadioChange: (key: string, value: string) => void;
}

export const renderRadioGroup = ({
  key,
  options,
  selectedFilters,
  handleRadioChange,
}: RenderRadioGroupProps) => (
  <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
    <RadioGroup
      value={selectedFilters[key] || ""}
      onValueChange={(value) => handleRadioChange(key, value)}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`${key}-${option.value}`} />
          <Label htmlFor={`${key}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  </AccordionContent>
);
