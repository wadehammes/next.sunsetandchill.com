import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { Languages } from "src/interfaces/common.interfaces";
import { convertRelativeUrl } from "src/utils/helpers";
import { LogoBlockType } from "src/components/LogoBlock/LogoBlock.interfaces";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  place-content: center;
  padding: 0.75em;
`;

interface LogoBlockProps {
  fields: LogoBlockType;
}

export const LogoBlock: FC<LogoBlockProps> = ({ fields }) => {
  const { locale } = useRouter();

  return (
    <LogoWrapper>
      <Image
        src={convertRelativeUrl(fields.logo.file.url[locale as Languages])}
        width={fields.logo.file.details.image.width[locale as Languages]}
        height={fields.logo.file.details.image.height[locale as Languages]}
        alt={fields.logo.title[locale as Languages]}
        loading="lazy"
        quality={100}
      />
    </LogoWrapper>
  );
};

export default LogoBlock;
