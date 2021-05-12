import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";
import { CONSTANTS as constant } from "src/utils/constants";

export const RhythmLink: FC<LinkProps> = ({ href, children, ...props }) => {
  const { locale } = useRouter();

  return (
    <Link href={href} {...props} locale={locale || constant.LOCALES.en}>
      {children}
    </Link>
  );
};
