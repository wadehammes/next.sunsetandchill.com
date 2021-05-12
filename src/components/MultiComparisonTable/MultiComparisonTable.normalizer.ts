import { Entry } from "src/interfaces/common.interfaces";
import { MultiComparisonTableType } from "src/components/MultiComparisonTable/MultiComparisonTable.interfaces";
import { getEntryById } from "src/client";
import { normalizedComparisonTable } from "src/components/ComparisonTable/ComparisonTable.normalizer";

export const normalizedMultiComparisonTable = async (
  entry: Entry,
): Promise<MultiComparisonTableType> => {
  const tables = [];
  const entryTables = entry.fields?.tables?.en ?? entry.fields?.tables ?? [];

  // Refetch the tables so we get all nested data
  for (const table of entryTables) {
    tables.push(
      // eslint-disable-next-line no-await-in-loop
      await getEntryById({
        locale: "*",
        id: table.sys.id,
        normalizer: normalizedComparisonTable,
      }),
    );
  }

  return {
    ...entry.fields,
    tables,
  };
};
