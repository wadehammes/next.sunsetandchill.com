import { MediaType } from "src/interfaces/common.interfaces";

export enum ImageStyleTypes {
  Outlined = "Outlined",
  NoOutline = "No Outline",
}

export interface ImageBlockType {
  image: MediaType;
  imageStyle: ImageStyleTypes;
}

export interface ImageBlockProps {
  imageData: ImageBlockType;
}
