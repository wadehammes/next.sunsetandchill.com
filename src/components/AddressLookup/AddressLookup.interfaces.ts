import {
  ContentfulColors,
  EntryId,
  LanguageEnglishObject,
  LanguageString,
} from "src/interfaces/common.interfaces";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";

export interface AddressLookupType {
  en: {
    sys: {
      id: EntryId;
    };
  };
  inputLabel: LanguageString;
  buttonText: LanguageString;
  helperText: LanguageString;
  errorText: LanguageString;
  url: LanguageEnglishObject<string>;
  inputColor: ContentfulColors;
  buttonStyle: ButtonStyleTypes;
  showPhoneNumber?: boolean;
  phoneNumber: string;
  phoneNumberLabel: LanguageString;
  showSocialProof?: boolean;
}
