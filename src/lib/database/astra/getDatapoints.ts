import { Query, Values } from "@stargate-oss/stargate-grpc-node-client";
import { getAstraClient } from "../astra";
import {
  ALLOWED_METRICS,
  IGetDataPointParams,
  ITimeSeriesPoint,
  fmtDecimal,
  getFieldValue,
  getValue,
} from "./utils";

export const getDataPoints = async ({
  limit = 7,
  ...props
}: IGetDataPointParams) => {
  const client = getAstraClient();

  const query = new Query();
  query.setCql(`
  SELECT time_stamp, ${ALLOWED_METRICS[props.metric]
    .map((v) => v.key)
    .join(", ")} FROM nf_main_keyspace.data_point
  WHERE collection = ?
  LIMIT ?
  `);

  const queryValuesList = [
    getValue(props.collectionAddress, "str"),
    getValue(limit, "int"),
  ];

  const queryValues = new Values();
  queryValues.setValuesList(queryValuesList);
  query.setValues(queryValues);

  const response = await client.executeQuery(query);

  const results = response.getResultSet();
  const rows = results
    ?.getRowsList()
    .map((row) => row.getValuesList())
    .map((values) => {
      const out: ITimeSeriesPoint = {
        date: new Date(values[0].getInt()).toISOString(),
        values: {},
      };
      for (let i = 1; i < values.length; i++) {
        out.values[ALLOWED_METRICS[props.metric][i - 1].key] = getFieldValue[
          ALLOWED_METRICS[props.metric][i - 1].type
        ](values[i]);
      }
      return out;
    });
  return rows;
};
