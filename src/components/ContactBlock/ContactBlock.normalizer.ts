import { Entry } from "src/interfaces/common.interfaces";
import { ContactBlockType } from "./ContactBlock.interfaces";

export const normalizedContactBlock = (entry: Entry): ContactBlockType => ({
  ...entry,
  email: entry?.email?.en ?? "",
  phone: entry?.phone?.en ?? "",
});
