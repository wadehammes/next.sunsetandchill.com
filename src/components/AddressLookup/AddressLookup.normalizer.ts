import { ContentfulColors, Entry } from "src/interfaces/common.interfaces";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";

export const normalizedAddressLookupMetadata = (
  entry: Entry,
): AddressLookupType => ({
  ...entry.fields,
  url: entry?.fields?.url?.en ?? null,
  inputColor: entry?.fields?.inputColor?.en ?? ContentfulColors.White,
  buttonStyle: entry?.fields?.buttonStyle?.en ?? ButtonStyleTypes.Primary,
  showPhoneNumber: entry?.fields?.showPhoneNumber?.en ?? false,
  phoneNumber: entry?.fields?.phoneNumber?.en ?? "",
  showSocialProof: entry?.fields?.showSocialProof?.en ?? false,
});
