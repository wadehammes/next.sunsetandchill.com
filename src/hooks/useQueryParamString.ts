import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUrlParam } from "src/hooks/useUrlParam";
import { CONSTANTS } from "src/utils/constants";

export const useQueryParamString = () => {
  const [queryParamString, setQueryParamString] = useState<string>("");
  const { locale } = useRouter();
  const [rcid, rcidToString] = useUrlParam({
    queryParam: CONSTANTS.RH_RCID_PARAM,
    storageParam: CONSTANTS.RH_RCID_STORAGE,
    defaultValue: CONSTANTS.RH_DEFAULT_CAMPAIGN_ID,
  });
  const [referralCode, referralCodeToString] = useUrlParam({
    queryParam: CONSTANTS.RH_REFERRAL_CODE_PARAM,
    storageParam: CONSTANTS.RH_REFERRAL_CODE_STORAGE,
  });

  useEffect(() => {
    const params = [
      `locale=${locale}`,
      referralCodeToString,
      rcidToString,
    ].filter((x) => x);

    setQueryParamString(params.join("&"));
  }, [
    queryParamString,
    locale,
    rcid,
    referralCode,
    referralCodeToString,
    rcidToString,
  ]);

  return {
    queryParamString,
  };
};
