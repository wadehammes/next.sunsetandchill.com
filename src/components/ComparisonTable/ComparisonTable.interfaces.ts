import {
  ContentfulColors,
  EntryId,
  FontStyle,
  LanguageString,
} from "src/interfaces/common.interfaces";

export interface ComparisonTableRowType {
  id: EntryId;
  label: LanguageString;
  secondaryLabel: LanguageString;
  labelStyle: FontStyle;
  rhythmColumn: boolean;
  rhythmColumnValue: LanguageString;
  rhythmColumnValueColor: ContentfulColors;
  othersColumn: boolean;
  othersColumnValue: LanguageString;
  othersColumnValueColor: ContentfulColors;
}

export interface ComparisonTableType {
  othersColumnHeader: LanguageString;
  rhythmColumnHeader: LanguageString;
  tableRows: ComparisonTableRowType[];
  tableFootnote: LanguageString;
  tableCellBackgroundColor:
    | ContentfulColors.White
    | ContentfulColors.LightPurple;
  buttonName: string;
}

export enum TableCellVariants {
  Rhythm = "Rhythm",
  Others = "Others",
}

export interface TableCellProps {
  noBackground?: boolean;
  noBorder?: boolean;
  backgroundColor?:
    | ContentfulColors.PurpleGradient
    | ContentfulColors.Transparent
    | ContentfulColors.White
    | ContentfulColors.LightPurple;
  variant?: TableCellVariants;
  cellColor?: ContentfulColors;
  cellFontStyle?: FontStyle;
}

export interface ComparisonTableProps {
  tableId?: string;
  rows: ComparisonTableType;
  className?: string;
  relativeWidth?: boolean;
}
