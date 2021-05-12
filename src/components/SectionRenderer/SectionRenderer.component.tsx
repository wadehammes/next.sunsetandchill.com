import { FC } from "react";
import dynamic from "next/dynamic";
import {
  PageSectionType,
  SectionType,
} from "src/components/PageSection/PageSection.interfaces";
import { EntryTypes } from "src/interfaces/common.interfaces";
import { SectionDoubleWideType } from "src/components/PageDoubleSection/PageDoubleSection.interfaces";
import { normalizedHero } from "src/components/Hero/Hero.normalizer";
import { ErrorBlock } from "src/components/Layout";

const Hero = dynamic(() => import("src/components/Hero/Hero.component"));

const PageSection = dynamic(() =>
  import("src/components/PageSection/PageSection.component"),
);

const PageDoubleSection = dynamic(() =>
  import("src/components/PageDoubleSection/PageDoubleSection.component"),
);

interface SectionRendererProps {
  section: SectionType;
}

export const SectionRenderer: FC<SectionRendererProps> = ({ section }) => {
  const renderSection = () => {
    switch (section.type) {
      case EntryTypes.SectionHero:
        return (
          <Hero key={section.id} hero={normalizedHero(section as unknown)} />
        );
      case EntryTypes.Section:
        return (
          <PageSection
            key={section.id}
            fields={section as unknown as PageSectionType}
          />
        );
      case EntryTypes.SectionDoubleWide:
        return (
          <PageDoubleSection
            key={section.id}
            entry={section as unknown as SectionDoubleWideType}
          />
        );
      default:
        return (
          <ErrorBlock key={section.id}>
            {`Error! "${section.type}" is not created yet in the code. Please alert engineering.`}
          </ErrorBlock>
        );
    }
  };

  return renderSection();
};
