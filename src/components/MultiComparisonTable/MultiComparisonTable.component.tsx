import kebabCase from "lodash.kebabcase";
import dynamic from "next/dynamic";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { MultiComparisonTableType } from "src/components/MultiComparisonTable/MultiComparisonTable.interfaces";
import { StyledButton } from "src/components/Button/Button.component";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";
import { device } from "src/styles/theme";
import { ContentfulColors, Languages } from "src/interfaces/common.interfaces";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { Label } from "src/components/Label/Label.component";
import { useRouter } from "next/router";
import { shade } from "polished";

const ComparisonTable = dynamic(() =>
  import("src/components/ComparisonTable/ComparisonTable.component"),
);

const Select = dynamic(() => import("src/components/Select/Select.component"));

interface MultiComparisonTableProps {
  testId?: string;
  fields: Promise<MultiComparisonTableType>;
  lightVariant?: boolean;
}

const Filter = styled(StyledButton)`
  margin: 0 0.125em;

  &:focus {
    outline: 0;
  }

  &.inactive:not(:focus),
  &.inactive:active {
    color: ${({ theme }) => theme.colors.purple.dark};
    background: transparent;
  }

  &.inactive:hover {
    background: ${({ theme }) => shade(0.075, theme.colors.purple.light)};
  }
`;

const FilterWrapper = styled.div`
  display: none;
  margin: 0 0 ${({ theme }) => theme.sizing.small} 0;
  padding: 0.375em;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.purple.light};

  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
  }
`;

const SelectWrapper = styled.div`
  display: block;
  padding: 0 0 ${({ theme }) => theme.sizing.small} 0;
  width: 100%;

  ${Label} {
    display: block;
    padding-bottom: 0.5em;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const TableWrapper = styled.div`
  min-height: 35em;
  width: ${({ theme }) => `calc(100% + ${theme.sizing.large} + 1rem + 2px)`};
  margin: 0 0 0 calc(-1em + 2px);

  @media ${device.laptop} {
    width: 100%;
    max-width: 60em;
    margin: 0 auto;
  }
`;

export const MultiComparisonTable: FC<MultiComparisonTableProps> = ({
  fields,
  lightVariant,
}) => {
  const { locale } = useRouter();
  const [resolvedFields, setResolvedFields] =
    useState<MultiComparisonTableType>();
  const [tableNames, setTableNames] = useState<{ name: string; id: string }[]>(
    [],
  );

  // Resolve the fetched table data since we are fetching tables in normalizer
  useEffect(() => {
    (async () => {
      const resolved = await fields;

      setResolvedFields(resolved);
    })();
  }, [fields]);

  // Create a dataset of table names/ids to create Buttons/Select menu
  useEffect(() => {
    if (resolvedFields) {
      setTableNames(
        resolvedFields.tables.map((table) => ({
          id: kebabCase(table?.buttonName),
          name: table?.buttonName ?? "",
        })),
      );
    }
  }, [resolvedFields]);

  const handleClick = useCallback((e) => {
    const tableId = e.target.dataset.id;
    const tables = document.querySelectorAll(".compare-table");
    const filters = document.querySelectorAll(".filter");

    const thisTable = document.querySelector(`#${tableId}`);

    Array.from(tables).map((table) => table.classList.add("hidden"));
    Array.from(filters).map((filter) => filter.classList.add("inactive"));

    thisTable?.classList.remove("hidden");
    e.target.classList.remove("inactive");
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const tableId = e.target.value;
    const tables = document.querySelectorAll(".compare-table");

    const thisTable = document.querySelector(`#${tableId}`);

    Array.from(tables).map((table) => table.classList.add("hidden"));

    thisTable?.classList.remove("hidden");
  }, []);

  return (
    <>
      {resolvedFields && (
        <>
          <FilterWrapper role="tablist">
            {tableNames.map((name, index: number) => (
              <Filter
                key={name.id}
                as="button"
                type="button"
                data-id={name.id}
                onClick={handleClick}
                variant={ButtonStyleTypes.DarkPrimary}
                className={`filter ${index !== 0 ? "inactive" : ""}`}
                aria-label={`Compare ${name.name}`}
                aria-controls={name.id}
                role="tab"
              >
                {name.name}
              </Filter>
            ))}
          </FilterWrapper>
          <SelectWrapper>
            <Label
              htmlFor="compareSelect"
              labelColor={
                lightVariant
                  ? ContentfulColors.White
                  : ContentfulColors.DarkPurple
              }
              fontWeight={FontWeight.Regular}
            >
              {resolvedFields.selectLabel[locale as Languages]}
            </Label>
            <Select
              selectId="compareSelect"
              handleChange={handleChange}
              selectLabel="Compare Filters"
              lightVariant={lightVariant}
            >
              {tableNames.map((name) => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </>
      )}

      <TableWrapper>
        {resolvedFields &&
          resolvedFields.tables.map((table, index: number) => (
            <ComparisonTable
              rows={table}
              key={table.buttonName}
              tableId={kebabCase(table.buttonName)}
              className={`compare-table ${index !== 0 ? "hidden" : ""}`}
              relativeWidth
            />
          ))}
      </TableWrapper>
    </>
  );
};

export default MultiComparisonTable;
