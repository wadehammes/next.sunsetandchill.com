import { normalizedMedia } from "src/client/common.normalizer";
import { Entry } from "src/interfaces/common.interfaces";
import { ImageBlockType, ImageStyleTypes } from "./ImageBlock.interfaces";

export const normalizedImageBlock = (entry: Entry): ImageBlockType => ({
  ...entry.fields,
  image: entry.fields?.image?.en
    ? normalizedMedia(entry.fields.image.en)
    : null,
  imageStyle: entry.fields?.imageStyle.en ?? ImageStyleTypes.Outlined,
});
