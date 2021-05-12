import { EntryId, LanguageString } from "src/interfaces/common.interfaces";
import { ComparisonTableType } from "src/components/ComparisonTable/ComparisonTable.interfaces";

export interface MultiComparisonTableType {
  id: EntryId;
  tables: ComparisonTableType[];
  selectLabel: LanguageString;
}
