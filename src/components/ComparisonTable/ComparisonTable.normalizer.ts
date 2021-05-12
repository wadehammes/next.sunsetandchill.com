import {
  ContentfulColors,
  Entry,
  FontStyle,
} from "src/interfaces/common.interfaces";
import {
  ComparisonTableRowType,
  ComparisonTableType,
} from "src/components/ComparisonTable/ComparisonTable.interfaces";

export const normalizedComparisonTable = (
  entry: Entry,
): ComparisonTableType => ({
  ...entry.fields,
  rhythmColumnHeader: {
    en: entry?.fields?.rhythmColumnHeader?.en ?? "Rhythm",
    es:
      entry?.fields?.rhythmColumnHeader?.es ??
      entry?.fields?.rhythmColumnHeader?.en ??
      "Rhythm",
  },
  tableRows:
    entry?.fields?.tableRows?.en?.map((row: Entry) =>
      normalizedComparisonTableRow(row),
    ) ?? null,
  tableCellBackgroundColor:
    entry?.fields?.tableCellBackgroundColor?.en ?? ContentfulColors.LightPurple,
  buttonName: entry?.fields?.buttonName?.en ?? "",
});

export const normalizedComparisonTableRow = (
  entry: Entry,
): ComparisonTableRowType => ({
  id: entry.sys.id,
  ...entry.fields,
  labelStyle: entry.fields?.labelStyle?.en ?? FontStyle.Normal,
  othersColumn: entry.fields?.othersColumn?.en ?? false,
  othersColumnValue: {
    en: entry.fields?.othersColumnValue?.en ?? null,
    es:
      entry.fields?.othersColumnValue?.es ??
      entry.fields?.othersColumnValue?.en ??
      null,
  },
  othersColumnValueColor:
    entry.fields?.othersColumnValueColor?.en ?? ContentfulColors.DarkPurple,
  rhythmColumn: entry.fields?.rhythmColumn?.en ?? false,
  rhythmColumnValue: {
    en: entry.fields?.rhythmColumnValue?.en ?? null,
    es:
      entry.fields?.rhythmColumnValue?.es ??
      entry.fields?.rhythmColumnValue?.en ??
      null,
  },
  rhythmColumnValueColor:
    entry.fields?.rhythmColumnValueColor?.en ?? ContentfulColors.White,
});
