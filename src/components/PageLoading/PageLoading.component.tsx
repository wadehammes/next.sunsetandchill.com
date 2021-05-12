import styled from "styled-components";
import LottieFile from "src/components/LottieFile/LottieFile.component";
import bike from "src/styles/lottie/BikeGuy.lottie.json";
import { useRouter } from "next/router";
import { FC } from "react";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

interface PageLoadingProps {
  overrideFallback?: boolean;
}

const LoadingWrapper = styled.div`
  background: ${({ theme }) => theme.colors.purple.dark};
  position: fixed;
  height: ${({ theme }) => `calc(100% - ${theme.sizing.navHeight})`};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  left: 0;
  top: ${({ theme }) => theme.sizing.navHeight};
  right: 0;
  bottom: 0;
  z-index: 9999;

  > * {
    margin: auto;
    transform: translateY(-4em);
  }
`;

export const PageLoading: FC<PageLoadingProps> = ({
  overrideFallback = false,
}) => {
  const { isFallback } = useRouter();
  const { width } = useWindowDimensions();

  return isFallback || overrideFallback ? (
    <LoadingWrapper>
      <LottieFile
        data={bike}
        height={width && width >= 800 ? 175 : 125}
        width={width && width >= 800 ? 175 : 125}
      />
    </LoadingWrapper>
  ) : null;
};

export default PageLoading;
