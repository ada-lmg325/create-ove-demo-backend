import { Gauge } from "./gauge";

export type RankingProps = {
  label: string;
  rank: number;
  total: number;
  ascending?: boolean;
};

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const Ranking = ({
  label,
  rank,
  total,
  ascending = false,
}: RankingProps) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 text-black shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
      <Gauge
        value={
          ascending
            ? Math.ceil((rank / total) * 100)
            : 100 - Math.floor((rank / total) * 100)
        }
        label={
          ascending
            ? `${ordinal(total - rank + 1)} of ${total} ships`
            : `${ordinal(rank)} of ${total} ships`
        }
      />
    </div>
  );
};
