import { FC, ReactElement, useCallback } from "react";
import { CONSTANTS as constant, LOCALES } from "src/utils/constants";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Languages } from "src/interfaces/common.interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  language: Languages;
  lightVariant?: boolean;
  className?: string;
}

interface SelectProps {
  lightVariant?: boolean;
}

const Select = styled.select<SelectProps>`
  background: transparent;
  border: 0;
  border-radius: 1000px;
  box-shadow: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.nav.mobile};
  letter-spacing: ${({ theme }) => theme.font.buttons.letterSpacing};
  line-height: 1;
  height: 100%;
  transform: translateY(-1px);
  padding: 0.35em 0.35em 0.35em 0;
  font-weight: ${({ theme }) => theme.font.nav.fontWeight};

  &:hover {
    color: ${({ theme }) => theme.colors.logo};
    cursor: pointer;
  }

  ${({ lightVariant, theme }) =>
    lightVariant &&
    css`
      color: ${theme.colors.white};

      &:hover {
        color: ${theme.colors.buttons.logo};
      }
    `}
`;

const SelectWrapper = styled.div<SelectProps>`
  display: inline-block;
  border-radius: 1000px;
  position: relative;
  padding: 0.4em 0.65em 0.35em 0.7em;
  font-size: 1em;

  ${({ theme, lightVariant }) => css`
    border: 2px solid ${theme.colors.buttons.primary.main};
    color: ${lightVariant ? theme.colors.white : theme.colors.primary.main};
    background-color: transparent;

    &:hover,
    &:focus-within {
      cursor: pointer;
      background-color: ${theme.colors.buttons.primary.main};
      border-color: ${theme.colors.buttons.primary.main};
      color: ${theme.colors.white};
      ${Select} {
        color: ${theme.colors.white};
      }
    }

    &:hover:active {
      background-color: ${theme.colors.buttons.primary.active};
      border-color: ${theme.colors.buttons.primary.active};
      color: ${theme.colors.white};
      ${Select} {
        color: ${theme.colors.white};
      }
    }
  `}
`;

const Option = styled.option`
  background-color: white;
  color: ${({ theme }) => theme.colors.black};
`;

export const LanguageSelect: FC<Props> = ({
  language,
  lightVariant = false,
  className = "",
}: Props): ReactElement<Props> => {
  const { i18n } = useTranslation();
  const { asPath, pathname, query, replace } = useRouter();

  const handleLocaleChange = useCallback(
    (value: Languages) => {
      const localeString: Languages = value as Languages;

      i18n.changeLanguage(localeString);

      replace({ pathname, query }, asPath, {
        locale: localeString,
      });
    },
    [asPath, pathname, query, i18n, replace],
  );

  return (
    <SelectWrapper className={className}>
      <Select
        value={language}
        onChange={(e) => handleLocaleChange(e.target.value as Languages)}
        lightVariant={lightVariant}
        aria-label="Select Language"
      >
        {LOCALES.map((locale) => (
          <Option key={locale} value={locale}>
            {constant.LOCALES_TITLES[locale as Languages]}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
