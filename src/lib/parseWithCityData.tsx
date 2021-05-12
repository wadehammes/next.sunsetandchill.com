import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import {
  CityDataRow,
  CSVCityColumns,
  ContentfulColors,
} from "src/interfaces/common.interfaces";
import { A } from "src/components/Typography";
import { appendUrlParams } from "src/utils/helpers";
import { CONSTANTS as constant } from "src/utils/constants";
import { slugifyCity } from "./city";

export const parseWithCityData = (
  text: string | undefined,
  replacements: CityDataRow | Record<string, string>,
  params: string,
) => {
  if (!text) {
    return [];
  }

  if (text && !replacements) {
    return [text];
  }

  const replaceFn = (substring: string) => {
    if (substring === CSVCityColumns.ZipCodes) {
      return replacements.zipCodes
        .split(",")
        .map((zip: string, index: number) => (
            <>
              {index > 0 ? ", " : null}
              <A
                href={appendUrlParams(
                  `${constant.RH_APP_HTTPS_URL}/sign-up/plans`,
                  `zipcode=${zip.trim()}&${params}`,
                )}
                title={`Check available offers in ${zip.trim()}`}
                color={ContentfulColors.White}
                style={{ textDecoration: "underline" }}
                aria-label={`Check available offers in ${zip.trim()}`}
              >
                {zip}
              </A>
            </>
          ));
    } else if (substring === CSVCityColumns.TopCities) {
      return replacements.topCities
        .split(",")
        .map((city: string, index: number) => (
            <span>
              <RhythmLink
                href={`${replacements.basePath}${slugifyCity({
                  city,
                } as CityDataRow)}`}
                passHref
                prefetch={false}
              >
                <A
                  color={ContentfulColors.White}
                  style={{ textDecoration: "underline" }}
                  aria-label={city.trim()}
                >
                  {city.trim()}
                </A>
              </RhythmLink>
              {index < replacements.topCities.split(",").length - 1
                ? ", "
                : null}
            </span>
          ));
    } else if (substring === CSVCityColumns.TDSP) {
      return (
        <A
          href={replacements.tdspWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          {replacements.tdsp}
        </A>
      );
    } else if (substring === CSVCityColumns.TDSPPhoneNumber) {
      return (
        <A href={`tel:${replacements.tdspPhoneNumber}`}>
          {replacements.tdspPhoneNumber}
        </A>
      );
    } else {
      return replacements[substring] || `{{ ${substring} }}`;
    }
  };

  const re = new RegExp(/{{ *(.+?) *}}/g);

  const pieces = text.split(re);

  const translated = pieces.map((piece, index) => {
    if (index % 2 === 0) {
      return piece;
    } else {
      return replaceFn(piece);
    }
  });

  return translated.filter((x) => x) || [];
};
