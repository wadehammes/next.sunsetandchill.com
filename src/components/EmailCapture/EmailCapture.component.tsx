import { useRef, FC, ChangeEvent, useState, useCallback } from "react";
import {
  Alignment,
  ContentfulColors,
  FlexFlowTypes,
  Languages,
} from "src/interfaces/common.interfaces";
import { Button } from "src/components/Button/Button.component";
import { Fieldset } from "src/components/Fieldset/Fieldset.component";
import { Form } from "src/components/Form/Form.component";
import { Input } from "src/components/Input/Input.component";
import { ButtonWrapper } from "src/components/Button/ButtonWrapper.component";
import { EmailCaptureType } from "src/components/EmailCapture/EmailCapture.interfaces";
import { SuccessText } from "src/components/SuccessText/SuccessText.component";
import { useRouter } from "next/router";
import { EMAIL_VALIDATION_REGEX } from "src/utils/regex";
import { getCookieByKey } from "src/lib/getCookies";
import { InputTypes } from "src/components/Input/Input.interfaces";

interface EmailCaptureProps {
  fields?: EmailCaptureType;
  variant?: FlexFlowTypes;
  align?: Alignment;
  sectionColor?: ContentfulColors;
}

export const EmailCapture: FC<EmailCaptureProps> = ({
  variant = FlexFlowTypes.Row,
  align = Alignment.Center,
  sectionColor = ContentfulColors.Transparent,
  fields,
}) => {
  const { locale } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Reset errors after input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
  };

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const value = inputRef?.current?.value;

      if (!value || !EMAIL_VALIDATION_REGEX.test(value)) {
        setError(
          fields?.errorText[locale as Languages] ?? "Not a valid email address",
        );

        return false;
      } else {
        setSubmitting(true);

        const userId = getCookieByKey("ajs_anonymous_id");

        const submitEmail = await fetch(
          `/api/submit-email?secret=${process.env.API_SECRET}&id=${userId}&email=${value}`,
        );

        if (submitEmail.ok) {
          setSubmitting(false);

          setSuccess(
            fields?.successText[locale as Languages] ??
              "Email submitted successfully!",
          );

          // Reset form after some time
          setTimeout(() => {
            setSuccess("");
          }, 10000);
        } else {
          setError(
            fields?.failedText[locale as Languages] ??
              "Email submission failed, please try again.",
          );
        }
      }
    },
    [
      inputRef,
      locale,
      fields?.errorText,
      fields?.successText,
      fields?.failedText,
    ],
  );

  return !success ? (
    <Form onSubmit={handleSubmit} variant={variant} align={align}>
      <Fieldset variant={variant}>
        <Input
          ref={inputRef}
          label={fields?.inputPlaceholder[locale as Languages]}
          inputColor={ContentfulColors.White}
          inputType={InputTypes.Email}
          inputId="emailCaptureInput"
          error={error}
          handleChange={handleInputChange}
          sectionColor={sectionColor}
        />
        <ButtonWrapper variant={variant}>
          <Button
            buttonAs="button"
            buttonId="emailCapture"
            buttonType="submit"
            variant={fields?.buttonStyle}
            buttonLabel={fields?.buttonText[locale as Languages] ?? "Submit"}
            disabled={submitting}
          />
        </ButtonWrapper>
      </Fieldset>
      <input type="submit" hidden />
    </Form>
  ) : (
    <SuccessText color={ContentfulColors.White}>{success}</SuccessText>
  );
};

export default EmailCapture;
