import styled, { css } from "styled-components";
import { FC, ReactElement } from "react";
import { LinkTarget } from "src/interfaces/common.interfaces";
import { useInterpolateCityData } from "src/hooks/useInterpolateCityData";
import {
  ButtonProps,
  ButtonSizes,
  ButtonStyleTypes,
} from "src/components/Button/Button.interfaces";
import { device } from "src/styles/theme";

export const StyledButton = styled.a<ButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: 2px solid transparent;
  background-color: transparent;
  border-radius: 1000px;
  padding: 1.1rem 1.25rem;
  color: inherit;
  width: auto;
  text-decoration: none;
  font-size: inherit;
  cursor: default;
  user-select: none;
  letter-spacing: ${({ theme }) => theme.font.buttons.letterSpacing};
  line-height: ${({ theme }) => theme.font.buttons.lineHeight};
  transition: border 0.25s ease-in-out, background-color 0.25s ease-in-out;

  @media ${device.mobileL} {
    padding: 1.1rem 1.5rem;
  }

  ${({ variant, theme }) =>
    (variant === ButtonStyleTypes.TextWithArrow ||
      variant === ButtonStyleTypes.PrimaryWithArrow) &&
    css`
      padding-right: 3rem !important;
      border-color: transparent;
      color: ${theme.colors.logo};
      background-color: transparent;

      &:after {
        content: "";
        width: 1em;
        height: 2px;
        background-color: ${theme.colors.logo};
        position: absolute;
        top: 50%;
        margin-top: -1px;
        right: 24px;
        transition: all 0.2s ease-in-out;
      }

      &:before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 5px;
        border-color: transparent transparent transparent ${theme.colors.logo};
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: 20px;
        transition: all 0.2s ease-in-out;
      }

      &:hover {
        cursor: pointer;
        background-color: ${theme.colors.buttons.primary.hover};
        color: ${theme.colors.white};

        &:after {
          background-color: ${theme.colors.white};
          width: 1.35rem;
          right: 18px;
        }

        &:before {
          border-left-color: ${theme.colors.white};
          right: 16px;
        }
      }

      &:hover:active {
        background-color: ${theme.colors.buttons.primary.active};
        color: ${theme.colors.white};
      }
    `}

  ${({ variant, theme }) =>
    (variant === ButtonStyleTypes.Primary ||
      variant === ButtonStyleTypes.PrimaryWithArrow) &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.buttons.primary.main};

      &:hover {
        cursor: pointer;
        background-color: ${theme.colors.buttons.primary.hover};
      }

      &:hover:active {
        background-color: ${theme.colors.buttons.primary.active};
      }
    `}

  ${({ variant, theme }) =>
    variant === ButtonStyleTypes.Yellow &&
    css`
      color: ${theme.colors.purple.dark};
      background-color: ${theme.colors.buttons.yellow.main};

      &:hover {
        color: ${theme.colors.purple.dark};
        cursor: pointer;
        background-color: ${theme.colors.buttons.yellow.hover};
      }

      &:hover:active {
        background-color: ${theme.colors.buttons.yellow.active};
      }
    `}

  ${({ variant, theme }) =>
    variant === ButtonStyleTypes.DarkPrimary &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.buttons.darkPrimary.main};

      &:hover {
        cursor: pointer;
        background-color: ${theme.colors.buttons.darkPrimary.hover};
      }

      &:hover:active {
        background-color: ${theme.colors.buttons.darkPrimary.active};
      }
    `}

  ${({ variant, lightVariant, theme }) =>
    variant === ButtonStyleTypes.Secondary &&
    css`
      border-color: ${theme.colors.buttons.secondary.main};
      color: ${lightVariant ? theme.colors.white : theme.colors.primary.main};
      background-color: transparent;

      &:hover,
      &:focus {
        cursor: pointer;
        background-color: ${theme.colors.buttons.primary.main};
        border-color: ${theme.colors.buttons.primary.main};
        color: ${theme.colors.white};
      }

      &:hover:active {
        background-color: ${theme.colors.buttons.primary.active};
        border-color: ${theme.colors.buttons.primary.active};
        color: ${theme.colors.white};
      }
    `}

  ${({ variant, theme }) =>
    variant === ButtonStyleTypes.PrimaryWithArrow &&
    css`
      &:after {
        background-color: ${theme.colors.white};
      }

      &:before {
        border-color: transparent transparent transparent ${theme.colors.white};
      }
    `}

  ${({ size }) =>
    size === ButtonSizes.Small &&
    css`
      padding: 0.5em 0.75em;
      font-size: 1em;

      @media ${device.mobileS} {
        font-size: 0.875rem;
        padding: 0.65rem 1rem;
      }
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: flex;
      width: 100%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const Button: FC<ButtonProps> = ({
  buttonAs = "a",
  buttonId = "",
  buttonDataId = "",
  variant = ButtonStyleTypes.Primary,
  fullWidth = false,
  url = "",
  buttonLabel = "",
  size,
  target = LinkTarget.Self,
  rel = "",
  handleClick,
  disabled = false,
  buttonType = undefined,
  lightVariant = false,
}): ReactElement => {
  const interpolate = useInterpolateCityData();

  const label = interpolate(buttonLabel).join("");

  let button = (
    <StyledButton
      href={url}
      aria-label={label}
      title={label}
      variant={variant}
      lightVariant={lightVariant}
      fullWidth={fullWidth}
      target={target}
      rel={rel}
      size={size}
      disabled={disabled}
      id={buttonId}
      data-id={buttonDataId}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );

  if (buttonAs === "span") {
    button = (
      <StyledButton
        as="span"
        aria-label={label}
        title={label}
        variant={variant}
        lightVariant={lightVariant}
        fullWidth={fullWidth}
        size={size}
        disabled={disabled}
        id={buttonId}
        data-id={buttonDataId}
        onClick={handleClick}
      >
        {label}
      </StyledButton>
    );
  }

  if (buttonAs === "button") {
    button = (
      <StyledButton
        as="button"
        size={size}
        aria-label={label}
        title={label}
        variant={variant}
        lightVariant={lightVariant}
        fullWidth={fullWidth}
        onClick={handleClick}
        disabled={disabled}
        type={buttonType}
        id={buttonId}
        data-id={buttonDataId}
      >
        {label}
      </StyledButton>
    );
  }

  return button;
};

export default Button;
