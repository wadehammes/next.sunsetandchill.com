import { EntryId, LanguageString } from "src/interfaces/common.interfaces";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";

export interface EmailCaptureType {
  id: EntryId;
  inputPlaceholder: LanguageString;
  buttonText: LanguageString;
  buttonStyle: ButtonStyleTypes;
  errorText: LanguageString;
  successText: LanguageString;
  failedText: LanguageString;
}
