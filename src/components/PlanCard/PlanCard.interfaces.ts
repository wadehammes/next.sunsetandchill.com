import { LanguageString } from "src/interfaces/common.interfaces";

export enum PlanRateTypes {
  Fixed = "Fixed",
}

export enum PlanEnergyTypes {
  Wind = "Wind",
  Solar = "Solar",
}

export interface PlanCardType {
  planTitle: LanguageString;
  planDescription: LanguageString;
  planLength: LanguageString;
  planRate: LanguageString;
  planRateType: PlanRateTypes;
  planEnergy: LanguageString;
  planEnergyType: PlanEnergyTypes;
  planSpecialOffer: LanguageString;
  planPrice: string;
  planPriceLabel: LanguageString;
  planPriceRangeLabel: LanguageString;
}
