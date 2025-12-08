import { Slider } from "./ui/slider";

export type SliderFilterProps = {
  min_option: number;
  max_option: number;
  currVals: (number | undefined)[];
  //TODO: Add a better type here
  setCurrVals: (val: any) => void;
  label: string;
};
export const SliderFilter = ({
  min_option,
  max_option,
  currVals,
  setCurrVals,
  label,
}: SliderFilterProps) => {
  return (
    <div className="m-5 min-w-[200px]">
      <h3>{label}</h3>
      <div className="m-2 w-[100%]">
        <Slider
          value={[currVals[0] ?? min_option, currVals[1] ?? max_option]}
          min={min_option}
          max={max_option}
          step={1}
          onValueChange={setCurrVals}
        />
        <div className="mt-1 flex w-full justify-between text-sm">
          <span>{currVals[0] ?? min_option}</span>
          <span>{currVals[1] ?? max_option}</span>
        </div>
      </div>
    </div>
  );
};
