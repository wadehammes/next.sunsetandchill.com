import { normalizedMedia } from "src/client/common.normalizer";
import {
  Alignment,
  ContentStyleTypes,
  Entry,
} from "src/interfaces/common.interfaces";
import { ValuePropType } from "src/components/ValueProp/ValueProp.interfaces";

export const normalizedValueProp = (entry: Entry): ValuePropType => ({
  ...entry,
  icon: entry?.icon ? normalizedMedia(entry?.icon?.en) : null,
  iconLottieFile: entry?.iconLottieFile?.en
    ? normalizedMedia(entry?.iconLottieFile?.en)
    : null,
  copy: {
    en: entry?.copy?.en ?? "",
    es: entry?.copy?.es ?? "",
  },
  cta: entry?.cta ?? null,
  style: entry?.style?.en ?? ContentStyleTypes.None,
  alignment: entry?.alignment?.en ?? Alignment.Left,
});
