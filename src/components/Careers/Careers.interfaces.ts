/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import { EntryId, LanguageString } from "src/interfaces/common.interfaces";

export interface CareersType {
  id: EntryId;
  greenhouseApiUrl: string;
  greenhouseApiDepartmentsUrl: string;
  greenhouseApiOfficesUrl: string;
  careersTitle: LanguageString;
  noJobsText: LanguageString;
  locationsLabel: LanguageString;
  departmentsLabel: LanguageString;
}

export interface GreenhouseDepartment {
  child_ids: number[];
  id: number;
  name: string;
  parent_id: number | null;
  jobs: GreenhouseJob[];
}

export interface GreenhouseOffice {
  child_ids: number[];
  id: number;
  location: string;
  name: string;
  parent_id: number | null;
  departments: [];
}

interface Compliance {
  requires_consent?: boolean;
  retention_period?: string | null;
  type: string;
}

export interface GreenhouseJob {
  absolute_url: string;
  content: string;
  data_compliance?: Compliance[];
  departments: GreenhouseDepartment[];
  id: number;
  internal_job_id: number;
  location: {
    name: string;
  };
  metadata: [];
  offices: GreenhouseOffice[];
  requisition_id: string | number;
  title: string;
  updated_at: string;
}

export interface GreenhouseApiResponse {
  jobs: GreenhouseJob[];
  meta: {
    total: number;
  };
}
