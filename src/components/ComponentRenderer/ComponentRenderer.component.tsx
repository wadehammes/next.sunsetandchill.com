import { FC } from "react";
import dynamic from "next/dynamic";
import {
  ContentfulColors,
  Entry,
  EntryTypes,
} from "src/interfaces/common.interfaces";
import { CopyMediaRowType } from "src/components/CopyMediaRow/CopyMediaRow.interfaces";
import {
  PageSectionLayoutTypes,
  SectionType,
} from "src/components/PageSection/PageSection.interfaces";
import { ValuePropType } from "src/components/ValueProp/ValueProp.interfaces";
import { normalizedAddressLookupMetadata } from "src/components/AddressLookup/AddressLookup.normalizer";
import { normalizedCareers } from "src/components/Careers/Careers.normalizer";
import { normalizedComparisonTable } from "src/components/ComparisonTable/ComparisonTable.normalizer";
import { normalizedContactBlock } from "src/components/ContactBlock/ContactBlock.normalizer";
import { normalizedCopyMediaRow } from "src/components/CopyMediaRow/CopyMediaRow.normalizer";
import { normalizedEmailCapture } from "src/components/EmailCapture/EmailCapture.normalizer";
import { normalizedFaq } from "src/components/FAQ/FAQ.normalizer";
import { normalizedImageBlock } from "src/components/ImageBlock/ImageBlock.normalizer";
import { normalizedPlanCard } from "src/components/PlanCard/PlanCard.normalizer";
import { normalizedRichText } from "src/components/RichText/RichText.normalizer";
import { normalizedValueProp } from "src/components/ValueProp/ValueProp.normalizer";
import { normalizedVideoBlock } from "src/components/VideoBlock/VideoBlock.normalizer";
import { normalizedQuote } from "src/components/Quote/Quote.normalizer";
import { hasDarkBackground } from "src/styles/theme";
import { ErrorBlock } from "src/components/Layout";
import { normalizedLogoBlock } from "src/components/LogoBlock/LogoBlock.normalizer";
import { normalizedMultiComparisonTable } from "src/components/MultiComparisonTable/MultiComparisonTable.normalizer";
import { normalizedCustomerReviewCarousel } from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.normalizer";

// Code split our components
const AddressLookup = dynamic(() =>
  import("src/components/AddressLookup/AddressLookup.component"),
);

const Careers = dynamic(() =>
  import("src/components/Careers/Careers.component"),
);

const ComparisonTable = dynamic(() =>
  import("src/components/ComparisonTable/ComparisonTable.component"),
);

const ContactBlock = dynamic(() =>
  import("src/components/ContactBlock/ContactBlock.component"),
);

const CopyMediaRow = dynamic(() =>
  import("src/components/CopyMediaRow/CopyMediaRow.component"),
);

const CustomerReviewCarousel = dynamic(() =>
  import(
    "src/components/CustomerReviewCarousel/CustomerReviewCarousel.component"
  ),
);

const EmailCapture = dynamic(() =>
  import("src/components/EmailCapture/EmailCapture.component"),
);

const FAQ = dynamic(() => import("src/components/FAQ/FAQ.component"));

const ImageBlock = dynamic(() =>
  import("src/components/ImageBlock/ImageBlock.component"),
);

const MultiComparisonTable = dynamic(() =>
  import("src/components/MultiComparisonTable/MultiComparisonTable.component"),
);

const PlanCard = dynamic(() =>
  import("src/components/PlanCard/PlanCard.component"),
);

const RichText = dynamic(() =>
  import("src/components/RichText/RichText.component"),
);

const ValueProp = dynamic(() =>
  import("src/components/ValueProp/ValueProp.component"),
);

const VideoBlock = dynamic(() =>
  import("src/components/VideoBlock/VideoBlock.component"),
);

const Quote = dynamic(() => import("src/components/Quote/Quote.component"));

const LogoBlock = dynamic(() =>
  import("src/components/LogoBlock/LogoBlock.component"),
);

interface ComponentRendererProps {
  section: Entry;
  content: SectionType;
  index: number;
  inView: boolean;
}

export const ComponentRenderer: FC<ComponentRendererProps> = ({
  section,
  content,
  index = 0,
  inView = false,
}) => {
  const isDarkBackground = section?.sectionBackgroundColor
    ? hasDarkBackground(section.sectionBackgroundColor)
    : null;

  const renderComponent = () => {
    switch (content.type) {
      case EntryTypes.ComponentValueProp:
        return (
          <ValueProp
            key={content.id}
            valueProp={normalizedValueProp(content.fields as ValuePropType)}
            layout={
              section?.sectionContentLayout ?? PageSectionLayoutTypes.Grid3x3
            }
            inView={inView}
            wait={index}
            backgroundColor={
              section?.sectionBackgroundColor ?? ContentfulColors.White
            }
          />
        );
      case EntryTypes.ComponentCopyMediaRow:
        return (
          <CopyMediaRow
            key={content.id}
            copyMediaRow={normalizedCopyMediaRow(
              content.fields as CopyMediaRowType,
            )}
            backgroundColor={
              section?.sectionBackgroundColor ?? ContentfulColors.White
            }
            index={index}
            total={section?.sectionContent?.length ?? 1}
          />
        );
      case EntryTypes.ComponentAddressLookup:
        return (
          <AddressLookup
            key={content.id}
            lookupId={`zipcodeLookup-${content.id}`}
            metadata={normalizedAddressLookupMetadata(content)}
            sectionColor={
              section?.sectionBackgroundColor ?? ContentfulColors.Transparent
            }
          />
        );
      case EntryTypes.ComponentRichText:
        return (
          <RichText
            key={content.id}
            fields={normalizedRichText(content.fields)}
          />
        );
      case EntryTypes.ComponentCustomerReviewCarousel:
        return (
          <CustomerReviewCarousel
            key={content.id}
            fields={normalizedCustomerReviewCarousel(content.fields)}
          />
        );
      case EntryTypes.ComponentTable:
        return (
          <ComparisonTable
            key={content.id}
            rows={normalizedComparisonTable(content)}
          />
        );
      case EntryTypes.ComponentContactBlock:
        return (
          <ContactBlock
            key={content.id}
            fields={normalizedContactBlock(content.fields)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      case EntryTypes.ComponentImageBlock:
        return (
          <ImageBlock
            key={content.id}
            imageData={normalizedImageBlock(content)}
          />
        );
      case EntryTypes.ComponentVideoBlock:
        return (
          <VideoBlock
            key={content.id}
            fields={normalizedVideoBlock(content)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      case EntryTypes.ComponentGreenhouseCareers:
        return (
          <Careers
            key={content.id}
            data={normalizedCareers(content.fields)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      case EntryTypes.ComponentPlanCard:
        return (
          <PlanCard
            key={content.id}
            wait={index}
            inView={inView}
            fields={normalizedPlanCard(content.fields)}
          />
        );
      case EntryTypes.ComponentFAQs:
        return (
          <FAQ
            key={content.id}
            data={normalizedFaq(content.fields)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      case EntryTypes.BlogEmailCapture:
        return (
          <EmailCapture
            key={content.id}
            fields={normalizedEmailCapture(content.fields)}
            sectionColor={
              section?.sectionBackgroundColor ?? ContentfulColors.Transparent
            }
          />
        );
      case EntryTypes.ComponentQuote:
        return (
          <Quote
            key={content.id}
            fields={normalizedQuote(content.fields)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      case EntryTypes.ComponentLogoBlock:
        return (
          <LogoBlock
            key={content.id}
            fields={normalizedLogoBlock(content.fields)}
          />
        );
      case EntryTypes.ComponentMultiComparisonTable:
        return (
          <MultiComparisonTable
            key={content.id}
            fields={normalizedMultiComparisonTable(content)}
            lightVariant={Boolean(isDarkBackground)}
          />
        );
      default:
        return (
          <ErrorBlock key={content.id}>
            {`"${content.type}" is not supported in Section Content yet. Please alert engineering.`}
          </ErrorBlock>
        );
    }
  };

  return renderComponent();
};
