export enum Environments {
  Local = "local",
  Staging = "staging",
  Production = "production",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Entry = any | undefined;
export type EntryId = number | string;

export enum EntryTypes {
  Metadata = "metadata",
  Page = "page",
  Footer = "footer",
  BlogPost = "blogPost",
  BlogPage = "blogPage",
  BlogCategory = "blogCategory",
  BlogAuthor = "blogAuthor",
  BlogMetadata = "blogMetadata",
  BlogEmailCapture = "blogEmailCaptureSection",
  ComponentAddressLookup = "componentAddressLookup",
  ComponentNavigation = "componentNavigation",
  ComponentCTA = "componentCta",
  ComponentCustomerReviewCarousel = "componentCustomerReviewCarousel",
  ComponentCustomerReview = "componentCustomerReview",
  ComponentCopyMediaRow = "componentCopyMediaRow",
  ComponentGreenhouseCareers = "componentGreenhouseCareers",
  ComponentRichText = "componentRichText",
  ComponentValueProp = "componentValueProp",
  ComponentTable = "componentTable",
  ComponentImageBlock = "componentImageBlock",
  ComponentComparisonTableRow = "componentComparisonTableRow",
  ComponentQuote = "componentQuote",
  SectionHero = "sectionHero",
  Section = "section",
  SectionDoubleWide = "sectionDoubleWide",
  ComponentContactBlock = "componentContactBlock",
  ComponentPlanCard = "componentPlanCard",
  ComponentFAQs = "componentFaqs",
  ComponentLogoBlock = "componentLogoBlock",
  ComponentVideoBlock = "componentVideoBlock",
  ComponentMultiComparisonTable = "componentMultipleComparisonTable",
}

export interface PreviewProps {
  preview: boolean;
}

export interface StaticEntry {
  id: EntryId;
  slug?: string;
}

export enum Alignment {
  Left = "Left",
  Center = "Center",
  Right = "Right",
}

export enum GridAlignment {
  Stretched = "Stretched",
  End = "End",
}

export enum LinkTarget {
  Blank = "_blank",
  Self = "_self",
}

export enum FontStyle {
  Normal = "Normal",
  Italics = "Italics",
  Bold = "Bold",
}

export enum BackgroundPositioning {
  Top = "Top",
  Center = "Center",
  Bottom = "Bottom",
}

export enum BackgroundSizing {
  Cover = "Cover",
  Contain = "Contain",
  Fill = "Fill",
}

export enum ContentfulColors {
  Purple = "Purple",
  LightPurple = "LightPurple",
  DarkPurple = "DarkPurple",
  BrightPurple = "BrightPurple",
  BrighterPurple = "BrighterPurple",
  HeadlinePurple = "HeadlinePurple",
  HeroPurple = "HeroPurple",
  NeonPurple = "NeonPurple",
  LogoPurple = "LogoPurple",
  White = "White",
  Black = "Black",
  LightGrey = "LightGrey",
  Grey = "Grey",
  DarkGrey = "DarkGrey",
  MintGreen = "MintGreen",
  PurpleGradient = "PurpleGradient",
  PurpleGradientReversed = "PurpleGradientReversed",
  GreyPurpleGradient = "GreyPurpleGradient",
  LightPurpleWhiteGradient = "LightPurpleWhiteGradient",
  WhiteLightPurpleGradient = "WhiteLightPurpleGradient",
  PurpleNeonPurpleGradient = "PurpleNeonPurpleGradient",
  LightPurpleNeonPurpleGradient = "LightPurpleNeonPurpleGradient",
  Transparent = "transparent",
  Red = "Red",
}

export type Languages = "en" | "es";
export interface AllLanguageObject<T> {
  en: T;
  es: T;
}
export interface LanguageEnglishObject<T> {
  en: T;
}

export type LanguageString = AllLanguageObject<string>;

export type LanguageNumber = AllLanguageObject<number>;

export enum ContentStyleTypes {
  None = "None",
  Card = "Card",
  Outlined = "Outlined",
  DarkOutlined = "DarkOutlined",
}

export enum MediaFileType {
  Video = "Video",
  Image = "Image",
}

export interface MediaType {
  file: {
    url: LanguageString;
    contentType: string;
    details: {
      size: number;
      image: {
        width: LanguageNumber;
        height: LanguageNumber;
      };
    };
    fileName: string;
  };
  title: LanguageString;
  description: LanguageString;
}

export interface CityDataRow extends Record<string, string> {
  city: string;
  heroImage: string;
  zipCodes: string;
  topCities: string;
  tdsp: string;
  tdspPhoneNumber: string;
  tdspWebsite: string;
}

export enum CSVCityColumns {
  TopCities = "topCities",
  City = "city",
  ZipCodes = "zipCodes",
  TDSP = "tdsp",
  TDSPWebsite = "tdspWebsite",
  TDSPPhoneNumber = "tdspPhoneNumber",
}

export enum FlexFlowTypes {
  Column = "column",
  Row = "row",
}

export enum OrderedListTypes {
  Regular = "Regular",
  CircledNumbers = "CircledNumbers",
}
