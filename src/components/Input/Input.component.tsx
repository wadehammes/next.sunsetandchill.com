import styled, { css } from "styled-components";
import { Label } from "src/components/Label/Label.component";
import { ChangeEvent, FC, useState, forwardRef, Ref } from "react";
import { contentfulColorMapping, device } from "src/styles/theme";
import { ContentfulColors } from "src/interfaces/common.interfaces";
import { P } from "src/components/Typography";
import {
  InputProps,
  InputLabelProps,
  InputWrapperProps,
  InputTypes,
} from "src/components/Input/Input.interfaces";

const InputField = styled.input<InputProps>`
  display: block;
  position: relative;
  appearance: none;
  bottom: 0;
  border: 0;
  color: ${({ theme }) => theme.colors.primary.black};
  background-color: ${({ inputColor }) => contentfulColorMapping[inputColor]};
  transition: all 0.25s ease-in-out;
  padding: 1.4rem 0.9rem;
  max-width: 100%;
  font-family: inherit;
  z-index: 1;
  width: 100%;
  min-width: ${({ minWidth = "11rem" }) => minWidth};
  font-size: 1em;

  @media ${device.mobileL} {
    width: 14rem;
  }

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
  }
  :-moz-placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
    opacity: 1;
  }
  &::-moz-placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
  }
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[800]};
  }

  /* removes caret on datalist list inputs */
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  /* removes number arrows [type=number] */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: 0;
    background: transparent;
    padding-bottom: 0.25em;

    &::placeholder {
      color: transparent;
    }
  }

  ${({ focused }) =>
    focused &&
    css`
      outline: 0;
      background: transparent;
      padding-bottom: 0.25em;

      &::placeholder {
        color: transparent;
      }
    `}
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;

  @media ${device.mobileL} {
    width: auto;
  }
`;

const InputLabel = styled(Label)<InputLabelProps>`
  opacity: 0;
  padding: 0 1em;
  visibility: visible;
  position: absolute;
  font-size: 0.875em;
  transition: all 0.25s ease-in-out;
  transform: translateY(1.5em);
  color: ${({ theme }) => theme.colors.primary.main};
  z-index: 0;

  ${({ focused }) =>
    focused &&
    css`
      opacity: 1;
      transform: translateY(0.5em);
    `}
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  background-color: ${({ inputColor }) => contentfulColorMapping[inputColor]};
  border-radius: 1000px;
  padding: 0 0.75em;
  overflow: hidden;
  position: relative;
  display: flex;
  min-width: ${({ minWidth }) => minWidth};
  width: 100%;
  height: 3.3em;

  @media ${device.tablet} {
    max-width: 16em;
  }

  &:focus-within {
    box-shadow: ${({ sectionColor = ContentfulColors.Transparent }) =>
          contentfulColorMapping[sectionColor]}
        0px 0px 0px 2px,
      ${({ theme, sectionColor }) =>
          sectionColor === ContentfulColors.NeonPurple
            ? theme.colors.purple.dark
            : theme.colors.purple.variants.neon}
        0px 0px 0px 4px;

    ${InputLabel} {
      opacity: 1;
      visibility: visible;
      transform: translateY(0.5em);
    }
  }

  ${({ error, sectionColor = ContentfulColors.Transparent, theme }) =>
    error &&
    css`
      box-shadow: ${contentfulColorMapping[sectionColor]} 0px 0px 0px 2px,
        ${theme.colors.red.main} 0px 0px 0px 4px;
    `}
`;

const ErrorText = styled(P)`
  width: 100%;
  position: absolute;
  bottom: -1.5rem;
  margin: 1rem 0 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red.main};
  text-align: left;
`;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      inputColor = ContentfulColors.White,
      inputId = "",
      autoComplete = "off",
      inputType = InputTypes.Text,
      maxNumber = "",
      error = "",
      handleChange,
      minWidth = "10em",
      sectionColor = ContentfulColors.Transparent,
    },
    ref: Ref<HTMLInputElement>,
  ) => {
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value.length));

      if (handleChange) {
        handleChange(e);
      }
    };

    return (
      <InputContainer>
        <InputWrapper
          inputColor={inputColor}
          focused={hasValue}
          error={error}
          minWidth={minWidth}
          sectionColor={sectionColor}
        >
          {label && (
            <InputLabel htmlFor={inputId} focused={hasValue}>
              {label}
            </InputLabel>
          )}
          <InputField
            ref={ref}
            id={inputId}
            type={inputType}
            placeholder={label}
            inputColor={inputColor}
            onChange={handleInputChange}
            focused={hasValue}
            autoComplete={autoComplete}
            max={maxNumber}
            error={error}
            minWidth={minWidth}
            aria-label={label}
            name={inputId}
          />
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  },
);
