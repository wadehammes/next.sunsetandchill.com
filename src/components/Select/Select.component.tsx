import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface SelectProps {
  selectId: string;
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectLabel: string;
  lightVariant?: boolean;
}

interface SelectStyleProps {
  lightVariant?: boolean;
}

const SelectWrapper = styled.div<SelectStyleProps>`
  background-color: ${({ theme, lightVariant }) =>
    lightVariant ? theme.colors.white : theme.colors.purple.light};
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1000px;
  min-width: 16em;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  &:focus-within {
    border-color: ${({ theme, lightVariant }) =>
      lightVariant
        ? theme.colors.purple.variants.logo
        : theme.colors.purple.variants.neon};
  }

  &:after {
    content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDcgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjIyMjE3IDEyTDUuOTk5OTUgNi42MjVMMS4yMjIxNyAxLjI1IiBzdHJva2U9IiM0NTQxNEMiIHN0cm9rZS13aWR0aD0iMS4wMjM4MSIvPgo8L3N2Zz4K");
    padding: 0 1em;
    transform: translateY(1px);
  }
`;

const SelectMenu = styled.select<SelectStyleProps>`
  -webkit-appearance: none;
  border: none;
  padding: 0.85em 1.5em;
  background-color: ${({ theme, lightVariant }) =>
    lightVariant ? theme.colors.white : theme.colors.purple.light};
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.purple.dark};

  &:focus {
    outline: 0;
  }
`;

export const Select: FC<SelectProps> = ({
  children,
  handleChange,
  selectId = "",
  selectLabel = "",
  lightVariant = false,
}) => (
  <SelectWrapper lightVariant={lightVariant}>
    <SelectMenu
      id={selectId}
      onChange={handleChange}
      tabIndex={0}
      aria-label={selectLabel}
      lightVariant={lightVariant}
    >
      {children}
    </SelectMenu>
  </SelectWrapper>
);

export default Select;
