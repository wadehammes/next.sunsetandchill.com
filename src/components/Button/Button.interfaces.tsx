import { LinkTarget } from "src/interfaces/common.interfaces";

export type AsTypes = "a" | "button" | "span";
export type ButtonTypes = "submit";
export enum ButtonSizes {
  Small = "Small",
  Regular = "Regular",
  Large = "Large",
}

export enum ButtonStyleTypes {
  Primary = "Primary",
  DarkPrimary = "DarkPrimary",
  Secondary = "Secondary",
  TextWithArrow = "Text with Arrow",
  PrimaryWithArrow = "Primary with Arrow",
  Yellow = "Yellow",
}

export interface ButtonStyledProps {
  disabled?: boolean;
  variant?: ButtonStyleTypes;
  fullWidth?: boolean;
  size?: ButtonSizes;
  lightVariant?: boolean;
}

export interface ButtonProps extends ButtonStyledProps {
  buttonAs?: AsTypes;
  buttonLabel?: string;
  buttonId?: string;
  buttonDataId?: string;
  target?: LinkTarget;
  rel?: "noreferrer" | "noopener noreferrer" | "";
  url?: string;
  title?: string;
  handleClick?: () => void;
  buttonType?: ButtonTypes | undefined;
  lightVariant?: boolean;
}
