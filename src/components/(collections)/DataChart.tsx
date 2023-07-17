import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";

import { ALLOWED_METRICS } from "@/lib/database/types";
import { ITimeSeriesPoint } from "@/lib/database/astra/utils";

const colors = ["#6d28d9", "#0ea5e9", "#ef4444"];

const DataChart = ({
  data,
  width,
  metric,
}: {
  data: ITimeSeriesPoint[];
  width: number;
  metric: keyof typeof ALLOWED_METRICS;
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
      {ALLOWED_METRICS[metric].map((value, index) => (
        <Line
          key={index}
          dataKey={value.key}
          type="monotone"
          stroke={colors[index]}
        />
      ))}
      {/* <Line type="monotone" dataKey="max_price" stroke="#8884d8" />
      <Line type="monotone" dataKey="average_price" stroke="#8884d8" />
      <Line type="monotone" dataKey="min_price" stroke="#8884d8" /> */}
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default DataChart;
