export type FilterState = {
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
};

export type FilterOptions = {
  line: string[];
  min_tonnage: number;
  max_tonnage: number;
  min_age: number;
  max_age: number;
  min_crew: number;
  max_crew: number;
  min_length: number;
  max_length: number;
  min_passengers: number;
  max_passengers: number;
  min_passenger_density: number;
  max_passenger_density: number;
  min_cabins: number;
  max_cabins: number;
};
