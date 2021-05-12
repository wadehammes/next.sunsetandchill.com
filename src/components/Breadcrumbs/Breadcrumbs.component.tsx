import { FC } from "react";
import { useRouter } from "next/router";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import styled from "styled-components";
import { A } from "src/components/Typography";
import { capitalizeWords } from "src/utils/helpers";
import { ContentfulColors } from "src/interfaces/common.interfaces";

const BreadcrumbContainer = styled.div`
  position: absolute;
  left: 1.5em;
  top: 0;
`;

const CrumbText = styled.span`
  font-size: 0.875rem;
`;

const Crumb = styled(CrumbText)`
  &:after {
    content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDcgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjIyMjE3IDEyTDUuOTk5OTUgNi42MjVMMS4yMjIxNyAxLjI1IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS4wMjM4MSIvPgo8L3N2Zz4K");
    display: inline-block;
    margin: 0 0.5rem;
    transform: translateY(2px);
  }
`;

const CrumbA = styled(A)`
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: underline;
  }
`;

interface BreadcrumbsProps {
  lightVariant?: boolean;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ lightVariant = false }) => {
  const { asPath } = useRouter();

  // Strip off any query string/anchors from the URL
  const pathname = asPath.split(/[?#]/)[0];
  // Create an array of path names
  const paths: string[] = pathname.split("/").filter((x) => x);

  return (
    paths && (
      <BreadcrumbContainer>
        {paths.map((path, index) => {
          const capitalized = capitalizeWords(path).replace(/-/g, " ");

          if (index !== paths.length - 1) {
            if (index === 0) {
              return (
                <Crumb key={path}>
                  <RhythmLink href={`/${path}`} passHref>
                    <CrumbA
                      color={
                        lightVariant
                          ? ContentfulColors.White
                          : ContentfulColors.Purple
                      }
                      aria-label={capitalized}
                    >
                      {capitalized}
                    </CrumbA>
                  </RhythmLink>
                </Crumb>
              );
            } else if (index > 0) {
              return (
                <Crumb key={path}>
                  <RhythmLink href={`/${paths[index - 1]}/${path}`} passHref>
                    <CrumbA
                      color={
                        lightVariant
                          ? ContentfulColors.White
                          : ContentfulColors.Purple
                      }
                      aria-label={capitalized}
                    >
                      {capitalized}
                    </CrumbA>
                  </RhythmLink>
                </Crumb>
              );
            }
          } else {
            return <CrumbText key={path}>{capitalized}</CrumbText>;
          }

          return true;
        })}
      </BreadcrumbContainer>
    )
  );
};

export default Breadcrumbs;
