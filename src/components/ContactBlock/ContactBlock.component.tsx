import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { A, H2, H3, P } from "src/components/Typography";
import { PageSectionHeader } from "src/components/PageSection/PageSection.component";
import { Phone } from "src/styles/icons/Phone.icon";
import { Email } from "src/styles/icons/Email.icon";
import { device } from "src/styles/theme";
import { ContactBlockType } from "src/components/ContactBlock/ContactBlock.interfaces";
import {
  Alignment,
  ContentfulColors,
  Languages,
} from "src/interfaces/common.interfaces";

interface ContactBlockProps {
  fields: ContactBlockType;
  lightVariant?: boolean;
}

const ContactInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.sizing.small} 0 0 0;
  font-size: 0.8em;

  @media ${device.tablet} {
    flex-flow: row nowrap;
    font-size: 1em;
  }

  a {
    display: block;
    text-decoration: none;
    margin: 0 0 ${({ theme }) => theme.sizing.small};

    @media ${device.tablet} {
      margin: 0;
    }
  }

  > * {
    padding: 0 1em;
  }
`;

const ContactH3 = styled(H3)`
  max-width: 46ch !important;
  text-align: center;
  margin: 0 auto;
`;

const ContactBlockA = styled(A)`
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

export const ContactBlock: FC<ContactBlockProps> = ({
  fields,
  lightVariant,
}) => {
  const { locale } = useRouter();

  const contactParsing: Options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <H2
          color={
            lightVariant
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H2>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <ContactH3
          as="p"
          color={
            lightVariant
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </ContactH3>
      ),
    },
  };

  return (
    fields && (
      <>
        <PageSectionHeader align={Alignment.Center} style={{ opacity: 1 }}>
          {documentToReactComponents(
            fields.contactCopy[locale as Languages],
            contactParsing,
          )}
        </PageSectionHeader>
        <ContactInfo>
          {fields.email && (
            <ContactBlockA
              href={`mailto:${fields.email}`}
              aria-label={fields.email}
            >
              <Email />
              <P
                color={
                  lightVariant
                    ? ContentfulColors.White
                    : ContentfulColors.HeadlinePurple
                }
              >
                {fields.email}
              </P>
            </ContactBlockA>
          )}
          {fields.phone && (
            <ContactBlockA
              href={`tel:${fields.phone}`}
              aria-label={fields.phone}
            >
              <Phone />
              <P
                color={
                  lightVariant
                    ? ContentfulColors.White
                    : ContentfulColors.HeadlinePurple
                }
              >
                {fields.phone}
              </P>
            </ContactBlockA>
          )}
        </ContactInfo>
      </>
    )
  );
};

export default ContactBlock;
