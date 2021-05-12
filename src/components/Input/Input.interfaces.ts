import { ChangeEvent, Ref } from "react";
import { ContentfulColors } from "src/interfaces/common.interfaces";

export interface InputColorProps {
  inputColor: ContentfulColors;
}

export interface InputFocusedProps extends InputColorProps {
  focused?: boolean;
  error?: string;
}

export interface InputWrapperProps extends InputFocusedProps {
  minWidth?: string;
  sectionColor?: ContentfulColors;
}

export interface InputLabelProps {
  label?: string;
  focused?: boolean;
}

export enum InputTypes {
  Text = "text",
  Number = "number",
  Email = "email",
  Telephone = "tel",
}

export interface InputProps extends InputLabelProps, InputFocusedProps {
  ref: Ref<HTMLInputElement>;
  inputType?: InputTypes;
  maxNumber?: string;
  inputId?: string;
  autoComplete?: "off" | "on";
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  minWidth?: string;
  sectionColor?: ContentfulColors;
}
