import { Entry } from "src/interfaces/common.interfaces";
import {
  PlanCardType,
  PlanEnergyTypes,
  PlanRateTypes,
} from "./PlanCard.interfaces";

export const normalizedPlanCard = (entry: Entry): PlanCardType => ({
  ...entry,
  planRateType: entry?.planRateType?.en ?? PlanRateTypes.Fixed,
  planEnergyType: entry?.planEnergyType?.en ?? PlanEnergyTypes.Wind,
  planPrice: entry?.planPrice?.en ?? "",
});
