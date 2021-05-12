import { Fieldset } from "src/components/Fieldset/Fieldset.component";
import { ChangeEvent, FC, useCallback, useState, useRef } from "react";
import { Button } from "src/components/Button/Button.component";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import {
  Languages,
  Alignment,
  FlexFlowTypes,
  ContentfulColors,
} from "src/interfaces/common.interfaces";
import { useRouter } from "next/router";
import { Input } from "src/components/Input/Input.component";
import { ZIPCODE_VALIDATION_REGEX } from "src/utils/regex";
import { trackEvent } from "src/lib/analytics";
import { Form } from "src/components/Form/Form.component";
import { ButtonWrapper } from "src/components/Button/ButtonWrapper.component";
import { InputTypes } from "src/components/Input/Input.interfaces";
import PhoneSmall from "src/styles/icons/PhoneSmall.icon";
import styled from "styled-components";
import { device } from "src/styles/theme";
import { appendUrlParams } from "src/utils/helpers";
import { useQueryParamString } from "src/hooks/useQueryParamString";
import dynamic from "next/dynamic";

const SocialProof = dynamic(() =>
  import("src/components/SocialProof/SocialProof.component"),
);

interface AddressLookupProps {
  variant?: FlexFlowTypes;
  metadata: AddressLookupType;
  lookupId?: string;
  align?: Alignment;
  inputMinWidth?: string;
  sectionColor?: ContentfulColors;
}

const PhoneWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0.5rem;

  @media ${device.tablet} {
    display: none;
  }
`;

const Phone = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.logo};
  margin-left: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const AddressLookup: FC<AddressLookupProps> = ({
  variant = FlexFlowTypes.Row,
  metadata,
  align = Alignment.Center,
  lookupId = "zipcodeLookup",
  inputMinWidth = "11rem",
  sectionColor = ContentfulColors.Transparent,
}) => {
  const { locale } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const { queryParamString } = useQueryParamString();

  // Reset errors after input change
  const handleAddressInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
  };

  // Validate the zipcode on submit, redirect to application with all params
  const handleSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const value = inputRef?.current?.value;

      if (!value || !ZIPCODE_VALIDATION_REGEX.test(value)) {
        setError(
          metadata?.errorText[locale as Languages] ?? "Not a valid zipcode.",
        );

        inputRef?.current?.focus();

        return false;
      } else {
        const url = new URL(`${metadata.url.en || metadata.url}`);
        const {
          location: { pathname = "" },
        } = window;
        // Remove leading slash. If pathname is `/`, replace it with "home"
        const categoryPath = pathname.substring(1) || "home";

        trackEvent("enrollmentClick", {
          action: "zipcodeSubmitted",
          category: `marketing.${categoryPath}`,
          label: metadata?.buttonText[locale as Languages] || "",
          value,
        });

        // Additional params we need to send over to the app
        const queryParamsWithZipCode = `zipcode=${value}&${queryParamString}`;

        window.location.href = appendUrlParams(
          url.href,
          queryParamsWithZipCode,
        );
      }
    },
    [metadata, locale, inputRef, queryParamString],
  );

  return (
    metadata && (
      <>
        <Form onSubmit={handleSubmit} variant={variant} align={align}>
          <Fieldset variant={variant}>
            <Input
              ref={inputRef}
              handleChange={handleAddressInputChange}
              label={metadata?.inputLabel[locale as Languages]}
              inputColor={metadata.inputColor}
              inputType={InputTypes.Telephone}
              inputId={lookupId}
              error={error}
              minWidth={inputMinWidth}
              sectionColor={sectionColor}
            />
            <ButtonWrapper variant={variant}>
              <Button
                buttonAs="button"
                buttonId={`addressLookupButton-${lookupId}`}
                buttonType="submit"
                variant={metadata.buttonStyle}
                buttonLabel={metadata?.buttonText[locale as Languages]}
                disabled={Boolean(inputRef?.current?.value && error)}
              />
            </ButtonWrapper>
          </Fieldset>
          <input type="submit" hidden />
        </Form>
        {metadata?.showPhoneNumber && metadata?.phoneNumber && (
          <PhoneWrapper>
            {metadata.phoneNumberLabel[locale as Languages]}
            <Phone
              href={`tel:${metadata.phoneNumber}`}
              aria-label={metadata.phoneNumber}
            >
              <PhoneSmall /> {metadata.phoneNumber}
            </Phone>
          </PhoneWrapper>
        )}
        {metadata?.showSocialProof && <SocialProof align={align} />}
      </>
    )
  );
};

export default AddressLookup;
