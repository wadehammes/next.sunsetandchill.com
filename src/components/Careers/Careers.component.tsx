import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import {
  CareersType,
  GreenhouseDepartment,
  GreenhouseOffice,
} from "src/components/Careers/Careers.interfaces";
import camelCase from "lodash.camelcase";
import styled from "styled-components";
import { Bold, H2, H3, P } from "src/components/Typography";
import { ContentfulColors, Languages } from "src/interfaces/common.interfaces";
import { useRouter } from "next/router";
import { Select } from "src/components/Select/Select.component";
import { device } from "src/styles/theme";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { Label } from "src/components/Label/Label.component";
import { rgba } from "polished";

const JobsContainer = styled.div`
  border-top: 1px solid
    ${({ theme }) => rgba(theme.colors.buttons.primary.main, 0.75)};
  padding: ${({ theme }) => theme.sizing.large} 0 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Department = styled.div`
  padding: 0 0 ${({ theme }) => theme.sizing.main};

  &.department-hidden,
  &.office-hidden {
    display: none;
  }
`;

const DepartmentTitle = styled(H3)``;

const JobsTitle = styled(H2)`
  padding: 0 0 ${({ theme }) => theme.sizing.main};
`;

const JobFilters = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 0 ${({ theme }) => theme.sizing.main};
  width: 100%;

  @media ${device.tablet} {
    flex-flow: row nowrap;
  }

  > * {
    margin: 0 0 ${({ theme }) => theme.sizing.small};

    @media ${device.tablet} {
      margin: 0 ${({ theme }) => theme.sizing.small} 0 0;
    }
  }
`;

const JobFilter = styled.div`
  ${Label} {
    display: block;
    margin-bottom: 0.75em;
  }
`;

const Job = styled.div`
  padding: 0.75em 0;

  &.office-hidden,
  &.department-hidden {
    display: none;
  }
`;

interface CareersProps {
  data?: CareersType;
  lightVariant?: boolean;
}

export const Careers: FC<CareersProps> = ({ data, lightVariant = false }) => {
  const { locale } = useRouter();
  const [careersData, setCareersData] = useState<{
    offices: GreenhouseOffice[];
    departments: GreenhouseDepartment[];
  }>({
    offices: [],
    departments: [],
  });
  const [departments, setDepartments] = useState<string[] | null>(null);
  const [offices, setOffices] = useState<string[] | null>(null);
  const [noJobs, setNoJobs] = useState(false);

  // Fetch Greenhouse API and set to component state
  useEffect(() => {
    (async () => {
      if (data?.greenhouseApiDepartmentsUrl || data?.greenhouseApiOfficesUrl) {
        const officesResponse = await fetch(data.greenhouseApiOfficesUrl);
        const departmentsResponse = await fetch(
          data.greenhouseApiDepartmentsUrl,
        );

        if (officesResponse.ok && departmentsResponse.ok) {
          const officesJson = await officesResponse.json();
          const departmentsJson = await departmentsResponse.json();

          setCareersData({
            ...officesJson,
            departments: departmentsJson.departments,
          });
        }
      }
    })();
  }, [data]);

  // Handle creating separate datasets for Departments and Offices
  useEffect(() => {
    if (careersData?.offices || careersData?.departments) {
      const departmentNames: string[] = [];
      const officeNames: string[] = [];

      // Remove the "No Office" subset and remove trailing State/Country from location name
      careersData.offices.map((office: GreenhouseOffice) => office.id !== 0
          ? officeNames.push(office.location.split(",")[0])
          : null);

      // Don't include departments with no job listings
      careersData.departments.map((department: GreenhouseDepartment) => department.jobs.length
          ? departmentNames.push(department.name)
          : null);

      setDepartments(departmentNames);
      setOffices(officeNames);
    }
  }, [careersData]);

  const handleFiltering = useCallback(
    (
      e: ChangeEvent<HTMLSelectElement>,
      targetClass: "office-hidden" | "department-hidden",
      allValue: "all-offices" | "all-departments",
    ) => {
      const { value } = e.target;
      const allJobs = document.querySelectorAll(".job");
      const allDepartments = document.querySelectorAll(".department");
      const filteredValue = document.querySelectorAll(`.${value}`);

      // If default "All" value is selected, remove appropriate hidden class from all jobs/departments
      // else, add hidden class to all and remove for the target value
      if (value === allValue) {
        Array.from(allJobs).map((job) => job.classList.remove(targetClass));
        Array.from(allDepartments).map((department) =>
          department.classList.remove(targetClass),
        );
      } else {
        Array.from(allJobs).map((job) => job.classList.add(targetClass));
        Array.from(allDepartments).map((department) =>
          department.classList.add(targetClass),
        );
        Array.from(filteredValue).map((item) =>
          item.classList.remove(targetClass),
        );
      }

      // Check if total job/department count equals the number of hidden items, if so
      // we can assume there are no jobs available for set filters
      const hiddenCount = document.querySelectorAll("[class*='hidden']");

      setNoJobs(allJobs.length + allDepartments.length === hiddenCount.length);
    },
    [],
  );

  return (
    careersData &&
    offices &&
    departments && (
      <JobsContainer>
        {data?.careersTitle && (
          <JobsTitle
            color={
              lightVariant
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
          >
            <Bold>{data.careersTitle[locale as Languages]}</Bold>
          </JobsTitle>
        )}
        <JobFilters>
          <JobFilter>
            {data?.locationsLabel && (
              <Label
                htmlFor="officesSelect"
                labelColor={
                  lightVariant
                    ? ContentfulColors.White
                    : ContentfulColors.DarkPurple
                }
                fontWeight={FontWeight.Light}
              >
                {data.locationsLabel[locale as Languages]}
              </Label>
            )}
            <Select
              selectId="officesSelect"
              selectLabel="Select Office"
              handleChange={(e) =>
                handleFiltering(e, "office-hidden", "all-offices")
              }
            >
              <option value="all-offices">All Offices</option>
              {offices?.map((office) => (
                <option key={office} value={`office-${camelCase(office)}`}>
                  {office}
                </option>
              ))}
            </Select>
          </JobFilter>
          <JobFilter>
            {data?.departmentsLabel && (
              <Label
                htmlFor="departmentsSelect"
                labelColor={
                  lightVariant
                    ? ContentfulColors.White
                    : ContentfulColors.DarkPurple
                }
                fontWeight={FontWeight.Light}
              >
                {data.departmentsLabel[locale as Languages]}
              </Label>
            )}
            <Select
              selectId="departmentsSelect"
              selectLabel="Select Department"
              handleChange={(e) =>
                handleFiltering(e, "department-hidden", "all-departments")
              }
            >
              <option value="all-departments">All Departments</option>
              {departments?.map((department) => (
                <option
                  key={department}
                  value={`department-${camelCase(department)}`}
                >
                  {department}
                </option>
              ))}
            </Select>
          </JobFilter>
        </JobFilters>
        {careersData?.departments.map((department) => {
          const departmentLocations: string[] = [];
          const departmentClass = `department-${camelCase(department.name)}`;

          // In order to hide departments if no jobs are available in a location,
          // let's loop through each job in the department, grab the location, and then create
          // a unique class list to apply so we can target it via the handleFiltering
          department?.jobs.map((job) =>
            job.location.name
              .split("and")
              .map((location) =>
                departmentLocations.push(
                  `office-${camelCase(location.split(",")[0].trim())}`,
                ),
              ),
          );

          const uniqueDepartmentLocations = new Set(departmentLocations);
          const departmentLocationClasses = Array.from(
            uniqueDepartmentLocations,
          ).join(" ");

          return (
            Boolean(department?.jobs.length) && (
              <Department
                key={department.id}
                className={`department ${departmentClass} ${departmentLocationClasses}`}
              >
                <DepartmentTitle
                  as="p"
                  color={
                    lightVariant
                      ? ContentfulColors.LogoPurple
                      : ContentfulColors.Purple
                  }
                >
                  <Bold>{department.name}</Bold>
                </DepartmentTitle>
                {department?.jobs.map((job) => {
                  const jobClasses = job.location.name
                    .split("and")
                    .map(
                      (location) =>
                        `office-${camelCase(location.split(",")[0].trim())}`,
                    )
                    .join(" ");

                  return (
                    <Job
                      key={job.id}
                      className={`job ${jobClasses} ${departmentClass}`}
                    >
                      <H3
                        as="a"
                        href={job.absolute_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "underline" }}
                        color={
                          lightVariant
                            ? ContentfulColors.White
                            : ContentfulColors.DarkPurple
                        }
                      >
                        <Bold>{job.title}</Bold>
                      </H3>
                      <P
                        color={
                          lightVariant
                            ? ContentfulColors.White
                            : ContentfulColors.DarkPurple
                        }
                      >
                        {job.location.name
                          .split("and")
                          .map((location) => location.split(",")[0].trim())
                          .join(" or ")}
                      </P>
                    </Job>
                  );
                })}
              </Department>
            )
          );
        })}
        {noJobs && (
          <P
            color={
              lightVariant
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
          >
            {data?.noJobsText[locale as Languages] ??
              "No jobs currently available matching these filters."}
          </P>
        )}
      </JobsContainer>
    )
  );
};

export default Careers;
