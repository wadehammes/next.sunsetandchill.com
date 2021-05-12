import { Entry } from "src/interfaces/common.interfaces";
import { EmailCaptureType } from "src/components/EmailCapture/EmailCapture.interfaces";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";

export const normalizedEmailCapture = (entry: Entry): EmailCaptureType => ({
  ...entry,
  buttonStyle: entry?.buttonStyle?.en ?? ButtonStyleTypes.Primary,
});
