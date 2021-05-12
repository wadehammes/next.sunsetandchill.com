import { Document } from "@contentful/rich-text-types";
import { AllLanguageObject } from "src/interfaces/common.interfaces";

export interface ContactBlockType {
  contactCopy: AllLanguageObject<Document>;
  email: string;
  phone: string;
}
