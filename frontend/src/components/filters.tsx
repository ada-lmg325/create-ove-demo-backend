import { useEffect, useState } from "react";
import { Dropdown } from "./dropdown";
import { SliderFilter } from "./slider-filter";
import { Button } from "./ui/button";

export type FiltersProps = {
  filterOptions;
  filterState;
  setFilterState;
};
export const Filters = ({
  filterOptions,
  filterState,
  setFilterState,
}: FiltersProps) => {
  //TODO: use reducer here for complex state
  //TOOD: Handle multi selection for cruise lines

  const [currFilterState, setCurrFilterState] = useState<{
    line: string | null;
    min_tonnage: number | null;
    max_tonnage: number | null;
    min_age: number | null;
    max_age: number | null;
    min_crew: number | null;
    max_crew: number | null;
    min_length: number | null;
    max_length: number | null;
    min_passengers: number | null;
    max_passengers: number | null;
    min_passenger_density: number | null;
    max_passenger_density: number | null;
  }>(filterState);

  useEffect(() => {
    setCurrFilterState(filterState);
  }, [filterState]);

  const [open, setOpen] = useState(false);
  return filterOptions ? (
    <div>
      <div className="flex gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Filters</h2>
        <Button onClick={() => setOpen((open) => !open)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      {open ? (
        <>
          <div className="flex flex-wrap">
            <div className="m-8 min-w-[200px]">
              <h3>Cruise Line</h3>
              <div className="m-2">
                <Dropdown
                  onSelect={(val) =>
                    setCurrFilterState((currFilterState) => ({
                      ...currFilterState,
                      line: val === "All" ? null : val,
                    }))
                  }
                  label="Cruise Line"
                  options={["All", ...filterOptions.line]}
                  currVal={currFilterState.line}
                />
              </div>
            </div>
            <SliderFilter
              label="Tonnage"
              min_option={filterOptions.min_tonnage}
              max_option={filterOptions.max_tonnage}
              currVals={[
                currFilterState.min_tonnage,
                currFilterState.max_tonnage,
              ]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_tonnage: val[0],
                  max_tonnage: val[1],
                }))
              }
            />
            <SliderFilter
              label="Age"
              min_option={filterOptions.min_age}
              max_option={filterOptions.max_age}
              currVals={[currFilterState.min_age, currFilterState.max_age]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_age: val[0],
                  max_age: val[1],
                }))
              }
            />
            <SliderFilter
              label="Crew"
              min_option={filterOptions.min_crew}
              max_option={filterOptions.max_crew}
              currVals={[currFilterState.min_crew, currFilterState.max_crew]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_crew: val[0],
                  max_crew: val[1],
                }))
              }
            />
            <SliderFilter
              label="Length"
              min_option={filterOptions.min_length}
              max_option={filterOptions.max_length}
              currVals={[
                currFilterState.min_length,
                currFilterState.max_length,
              ]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_length: val[0],
                  max_length: val[1],
                }))
              }
            />
            <SliderFilter
              label="Passengers"
              min_option={filterOptions.min_passengers}
              max_option={filterOptions.max_passengers}
              currVals={[
                currFilterState.min_passengers,
                currFilterState.max_passengers,
              ]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_passengers: val[0],
                  max_passengers: val[1],
                }))
              }
            />
            <SliderFilter
              label="Passenger Density"
              min_option={filterOptions.min_passenger_density}
              max_option={filterOptions.max_passenger_density}
              currVals={[
                currFilterState.min_passenger_density,
                currFilterState.max_passenger_density,
              ]}
              setCurrVals={(val: number[]) =>
                setCurrFilterState((currFilterState) => ({
                  ...currFilterState,
                  min_passenger_density: val[0],
                  max_passenger_density: val[1],
                }))
              }
            />
          </div>
          <div className="flex gap-1">
            <Button onClick={() => setFilterState(currFilterState)}>
              Apply Filters
            </Button>
            <Button
              onClick={() =>
                setFilterState({
                  line: null,
                  min_tonnage: null,
                  max_tonnage: null,
                  min_age: null,
                  max_age: null,
                  min_crew: null,
                  max_crew: null,
                  min_length: null,
                  max_length: null,
                  min_passengers: null,
                  max_passengers: null,
                  min_passenger_density: null,
                  max_passenger_density: null,
                })
              }
            >
              Reset Filters
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};
