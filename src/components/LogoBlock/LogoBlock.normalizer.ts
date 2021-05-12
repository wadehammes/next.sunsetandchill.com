import { Entry } from "src/interfaces/common.interfaces";
import { LogoBlockType } from "src/components/LogoBlock/LogoBlock.interfaces";
import { normalizedMedia } from "src/client/common.normalizer";

export const normalizedLogoBlock = (entry: Entry): LogoBlockType => ({
  logo: normalizedMedia(entry?.logo?.en),
});
