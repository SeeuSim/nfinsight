import { ITimeSeriesPoint } from "@/lib/database/astra/utils";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

const DataChart = ({
  data,
  width,
}: {
  data: ITimeSeriesPoint[];
  width: number;
}) => {
  return (
    <LineChart
      width={width}
      height={300}
      data={data.map((d) => {
        return {
          ...d.values,
          timestamp: new Date(d.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        };
      })}
    >
      <Line type="monotone" dataKey="max_price" stroke="#8884d8" />
      <Line type="monotone" dataKey="average_price" stroke="#8884d8" />
      <Line type="monotone" dataKey="min_price" stroke="#8884d8" />
      <XAxis dataKey="timestamp" />
      <Tooltip />
    </LineChart>
  );
};

export default DataChart;
