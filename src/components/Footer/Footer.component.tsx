import { FC } from "react";
import styled from "styled-components";
import { Container } from "src/components/Layout";
import { useRouter } from "next/router";
import { contentfulColorMapping, device } from "src/styles/theme";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { RhythmLogo } from "src/styles/logo/rhythmLogo";
import { A, Bold, H3 } from "src/components/Typography";
import { Facebook } from "src/styles/icons/Facebook.icon";
import { Linkedin } from "src/styles/icons/Linkedin.icon";
import { Twitter } from "src/styles/icons/Twitter.icon";
import { Instagram } from "src/styles/icons/Instagram.icon";
import { AddressLookup } from "src/components/AddressLookup/AddressLookup.component";
import { LanguageSelect } from "src/components/LanguageSelect/LanguageSelect.component";
import { rgba } from "polished";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import {
  ContentfulColors,
  Languages,
  LinkTarget,
  FlexFlowTypes,
} from "src/interfaces/common.interfaces";
import {
  FooterNavBlockType,
  FooterProps,
} from "src/components/Footer/Footer.interfaces";
import { appendUrlParams } from "src/utils/helpers";
import { CONSTANTS } from "src/utils/constants";
import { useQueryParamString } from "src/hooks/useQueryParamString";

interface FooterStyleProps {
  backgroundColor: ContentfulColors;
}

const FooterContainer = styled.div<FooterStyleProps>`
  position: relative;
  padding: ${({ theme }) => `${theme.sizing.large} 0`};
  background-color: ${({ theme, backgroundColor }) =>
    contentfulColorMapping[backgroundColor] || theme.colors.white};
  z-index: 12; /* Allow for sharing component to hide behind on mobile */
  flex: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column nowrap;
  margin-bottom: ${({ theme }) => theme.sizing.main};

  @media ${device.laptop} {
    flex-flow: row nowrap;
    margin-bottom: ${({ theme }) => theme.sizing.small};
  }
`;

const FooterLogo = styled.div`
  text-align: left;
  padding: 0 ${({ theme }) => theme.sizing.main}
    ${({ theme }) => theme.sizing.small} 0;

  a {
    display: block;
    transform: translateY(-1em) translateX(-0.75em);
  }

  svg {
    fill: ${({ theme }) => theme.colors.logo};
    width: 8em;
  }
`;

const FooterNav = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  padding: 0 0 ${({ theme }) => theme.sizing.large} 0;
  width: 100%;

  @media ${device.laptop} {
    width: auto;
  }
`;

const FooterCTAs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.sizing.large};
  padding: 0;
  width: 100%;

  @media ${device.laptop} {
    grid-gap: 0;
    grid-template-columns: 16rem 6rem;
    width: auto;
  }
`;

const FooterNavBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 1rem ${({ theme }) => theme.sizing.main} 0;
  width: 50%;

  @media ${device.tablet} {
    width: auto;
    padding: 0 2.5rem ${({ theme }) => theme.sizing.large} 0;
  }

  &:last-of-type {
    padding-bottom: 0;
    padding-right: 0;
  }

  ul li {
    line-height: 1;
  }

  a {
    box-sizing: content-box;
    display: block;
    width: 100%;
    padding: 0.75rem 0;
    line-height: 1.25;
    font-size: ${({ theme }) => theme.font.nav.mobile};

    @media ${device.tablet} {
      padding: 0.5rem 0;
      font-size: 1rem;
    }
  }

  p {
    font-size: 1rem;
  }
`;

const FooterA = styled(A)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: underline;
  }
`;

const FooterSocialIcons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  @media ${device.laptop} {
    align-items: flex-end;
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75em;
    border: 2px solid ${({ theme }) => theme.colors.buttons.primary.main};
    border-radius: 1000px;
    color: ${({ theme }) => theme.colors.white};
    transition: background-color 0.25s ease-in-out;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.buttons.primary.main};
    }
  }

  svg {
    height: 1.5em;
    width: 1.5em;
    margin: auto;
  }

  > * {
    margin: 0 0.75em 0 0;
  }

  @media ${device.laptop} {
    flex-flow: column nowrap;

    > * {
      margin: 0 0 0.75rem 0;
    }
  }
`;

const FooterH3 = styled(H3)`
  line-height: ${({ theme }) => theme.font.footer.h3.lineHeight};
  font-size: ${({ theme }) => theme.font.footer.h3.fontSize};
`;

const FooterExtra = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column nowrap;
  border-top: 1px solid ${({ theme }) => rgba(theme.colors.primary.light, 0.05)};
  margin: ${({ theme }) => theme.sizing.main} 0 0 0;
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;

  @media ${device.mobileL} {
    flex-flow: row nowrap;
  }

  @media ${device.laptop} {
    align-items: center;
  }
`;

const FooterCopyright = styled.span`
  color: ${({ theme }) => theme.colors.white};
  display: block;
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;
  font-weight: ${FontWeight.Light};
  flex: 1;
  font-size: 0.875em;
  line-height: 1.4;
  text-align: left;

  @media ${device.mobileL} {
    padding: 0 0 0 ${({ theme }) => theme.sizing.large};
    text-align: right;
  }
`;

const renderSocialIcon = (channel: string) => {
  switch (channel) {
    case "Facebook":
      return <Facebook />;
    case "Linkedin":
      return <Linkedin />;
    case "Twitter":
      return <Twitter />;
    case "Instagram":
      return <Instagram />;
    default:
      return null;
  }
};

export const Footer: FC<FooterProps> = ({
  pageLimitedNav,
  footer = null,
  addressLookupMetadata = null,
}) => {
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  return (
    footer && (
      <FooterContainer backgroundColor={footer.footerBackgroundColor}>
        <Container>
          <FooterContent>
            <FooterLogo>
              <RhythmLink href="/" passHref>
                <a id="rhythm-logo--footer" aria-label="Rhythm Logo - Footer">
                  <RhythmLogo />
                </a>
              </RhythmLink>
            </FooterLogo>
            <FooterNav>
              {/* Filter out footer nav blocks that we don't want included in limitedNav nav mode */}
              {footer?.footerNavBlocks
                .filter((block) =>
                  pageLimitedNav
                    ? block?.id === CONSTANTS.RH_FOOTER_RESOURCES_BLOCK_ID
                    : block,
                )
                .map((block: FooterNavBlockType) => (
                  <FooterNavBlock key={block.id}>
                    <FooterH3
                      as="div"
                      color={ContentfulColors.White}
                      style={{ margin: "0 0 0.75rem 0" }}
                    >
                      <Bold>{block.navTitle[locale as Languages]}</Bold>
                    </FooterH3>
                    <ul>
                      {block.navLinks.map((link) => {
                        const slug = link?.parentPage
                          ? `/${link.parentPage}/${link.slug}`
                          : `/${link.slug}`;

                        return (
                          <li key={link.slug}>
                            <RhythmLink href={slug} passHref>
                              <FooterA
                                color={ContentfulColors.White}
                                id={`footer-nav-item--${link.slug}`}
                                aria-label={
                                  link?.metadata?.pageSubmenuTitle[
                                    locale as Languages
                                  ]
                                }
                              >
                                {
                                  link?.metadata?.pageSubmenuTitle[
                                    locale as Languages
                                  ]
                                }
                              </FooterA>
                            </RhythmLink>
                          </li>
                        );
                      })}
                      {block?.navExternalLinks.map(
                        (link) =>
                          (
                            <li key={link.id}>
                              <RhythmLink
                                href={appendUrlParams(
                                  link.linkUrl,
                                  queryParamString,
                                )}
                                locale={locale}
                                passHref
                              >
                                <FooterA
                                  color={ContentfulColors.White}
                                  target={link.linkTarget}
                                  rel={
                                    link.linkTarget === LinkTarget.Blank
                                      ? "noopener noreferrer"
                                      : ""
                                  }
                                  id={`footer-nav-item--${link.id}`}
                                  aria-label={
                                    link?.linkTitle[locale as Languages]
                                  }
                                >
                                  {link?.linkTitle[locale as Languages]}
                                </FooterA>
                              </RhythmLink>
                            </li>
                          ) ?? null,
                      )}
                    </ul>
                  </FooterNavBlock>
                ))}
            </FooterNav>
            <FooterCTAs>
              {addressLookupMetadata && (
                <div>
                  <FooterH3
                    as="div"
                    color={ContentfulColors.White}
                    style={{ padding: "0 0 0.75em 0" }}
                  >
                    <Bold>
                      {addressLookupMetadata.buttonText[locale as Languages]}
                    </Bold>
                  </FooterH3>
                  <AddressLookup
                    variant={FlexFlowTypes.Column}
                    lookupId="footerZipcodeLookup"
                    metadata={addressLookupMetadata}
                    inputMinWidth="16em"
                    sectionColor={
                      footer?.footerBackgroundColor ?? ContentfulColors.Black
                    }
                  />
                </div>
              )}
              <FooterSocialIcons>
                {footer.socialChannels &&
                  footer.socialChannels.map((channel) => (
                    <a
                      id={`footer-social-link--${channel.socialChannelName.en.toLowerCase()}`}
                      key={channel.socialChannelName.en}
                      href={channel.socialChannelUrl.en}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={channel.socialChannelName.en}
                    >
                      {renderSocialIcon(channel.socialChannelName.en)}
                    </a>
                  ))}
              </FooterSocialIcons>
            </FooterCTAs>
          </FooterContent>
          <FooterExtra>
            <LanguageSelect
              className="footerLanguageSelect"
              language={locale as Languages}
              lightVariant
            />
            <FooterCopyright>
              &copy; {new Date().getFullYear()}{" "}
              {footer.copyright[locale as Languages]}
            </FooterCopyright>
          </FooterExtra>
        </Container>
      </FooterContainer>
    )
  );
};

export default Footer;
