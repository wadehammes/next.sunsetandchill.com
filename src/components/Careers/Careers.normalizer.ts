import { Entry } from "src/interfaces/common.interfaces";
import { CareersType } from "./Careers.interfaces";

export const normalizedCareers = (entry: Entry): CareersType => ({
  ...entry,
  greenhouseApiUrl: entry?.greenhouseApiUrl?.en ?? "",
  greenhouseApiDepartmentsUrl: entry?.greenhouseApiDepartmentsUrl?.en ?? "",
  greenhouseApiOfficesUrl: entry?.greenhouseApiOfficesUrl?.en ?? "",
});
