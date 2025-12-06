import Chart from "react-apexcharts";

type GaugeProps = {
  value: number;
  size?: number;
  label: string;
};

export const Gauge = ({ value, label, size = 200 }: GaugeProps) => {
  const options = {
    chart: {
      height: 350,
      type: "radialBar" as const,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: true,
            formatter: () => label,
          },
          value: {
            show: true,
            formatter: (val: number) => "",
          },
        },
      },
    },
    labels: [label],
  };

  return (
    <div>
      <div id="chart">
        <Chart
          options={options}
          series={[value]}
          type="radialBar"
          height={size}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
