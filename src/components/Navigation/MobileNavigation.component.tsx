/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from "react";
import { useUi } from "src/context/ui.context";
import { MobileNavClose } from "src/styles/icons/MobileNavClose.icon";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { RhythmLogo } from "src/styles/logo/rhythmLogo";
import { useRouter } from "next/router";
import { Button } from "src/components/Button/Button.component";
import { LanguageSelect } from "src/components/LanguageSelect/LanguageSelect.component";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { rgba } from "polished";
import { PageType } from "src/components/Page/Page.interfaces";
import {
  ContentfulColors,
  Languages,
  LinkTarget,
} from "src/interfaces/common.interfaces";
import {
  NavigationTheme,
  NavigationType,
} from "src/components/Navigation/Navigation.interfaces";
import { NavWrapper } from "src/components/Navigation/NavWrapper.component";
import { NavMobileToggle } from "src/components/Navigation/NavMobileToggle.component";
import { NavLogo } from "src/components/Navigation/NavLogo.component";
import { PhoneSmall } from "src/styles/icons/PhoneSmall.icon";
import { EmailSmall } from "src/styles/icons/EmailSmall.icon";
import { NavParent } from "src/components/Navigation/NavItems.component";
import { Accordion } from "src/components/Accordion/Accordion.component";
import { appendUrlParams } from "src/utils/helpers";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";
import { useQueryParamString } from "src/hooks/useQueryParamString";

interface MobileNavigationProps {
  navItems: NavigationType | null;
  navTheme?: NavigationTheme;
  pageLimitedNav?: boolean;
  pageLimitedNavPhone?: string;
}

interface MobileNavigationContainerProps {
  visible?: boolean;
}

const MobileNavContactBlock = styled.div`
  padding: ${({ theme }) => `${theme.sizing.small} ${theme.sizing.main} 0`};
`;

const MobileNavSubpageList = styled.ul`
  .subpageMobileLink {
    display: block;
    padding: ${({ theme }) => `${theme.sizing.small} ${theme.sizing.main}`};
    width: 100%;
  }
`;

const MobileNavList = styled.ul`
  border-top: 1px solid
    ${({ theme }) => rgba(theme.colors.buttons.primary.main, 0.25)};
  border-bottom: 1px solid
    ${({ theme }) => rgba(theme.colors.buttons.primary.main, 0.25)};
  list-style: none;
  padding-bottom: 1.5em;

  > li {
    color: ${({ theme }) => theme.colors.white};

    a,
    a span {
      color: currentColor;
    }
  }

  li.navButton {
    padding: ${({ theme }) => `1.5em ${theme.sizing.main} 0`};
  }

  > li:not([data-type="button"]),
  ${NavParent} {
    font-size: 1.25rem;
    font-weight: ${FontWeight.Light};
  }
`;

const MobileNavContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em 0;
  font-size: 1em;

  .navContactLink {
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin: 0 1em 0 0;
  }
`;

const MobileNavParentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  position: relative;
  width: 100%;
  overflow: hidden;
  --webkit-appearance: none;
  border: 0;
  background: 0;
  border-bottom: ${({ theme }) =>
    `1px solid ${rgba(theme.colors.buttons.primary.main, 0.25)}`};

  .parentItemLink {
    color: ${({ theme }) => theme.colors.white};
    display: block;
    padding: 1.5rem ${({ theme }) => theme.sizing.main};
    width: 100%;

    &:hover {
      color: ${({ theme }) => theme.colors.logo};
    }
  }
`;

const MobileNavigationContainer = styled.div<MobileNavigationContainerProps>`
  opacity: 0;
  background: ${({ theme }) => theme.colors.primary.dark};
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: -1;

  ${({ visible }) =>
    visible &&
    css`
      z-index: 100;
      opacity: 1;
    `}

  @media ${device.laptop} {
    display: none;
  }
`;

const MobileNavInner = styled.div`
  position: relative;
  top: ${({ theme }) => theme.sizing.large};
`;

const MobileLanguageSelect = styled.div`
  padding: ${({ theme }) => theme.sizing.main};
`;

export const MobileNavigation: FC<MobileNavigationProps> = ({
  navItems,
  navTheme = NavigationTheme.Dark,
  pageLimitedNav,
  pageLimitedNavPhone = "",
}) => {
  const { state, toggleMobileNav } = useUi();
  const { mobileNavOpen } = state;
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  const pageLimitedNavPhoneNumber =
    pageLimitedNav && pageLimitedNavPhone
      ? pageLimitedNavPhone
      : navItems?.rhythmDigitalCampaignPhone ?? null;

  return (
    navItems && (
      <MobileNavigationContainer visible={mobileNavOpen}>
        <NavWrapper backgroundColor={ContentfulColors.DarkPurple}>
          <NavMobileToggle
            type="button"
            onClick={() => toggleMobileNav()}
            aria-label="Nav Close"
            navTheme={NavigationTheme.Dark}
          >
            <MobileNavClose aria-hidden="true" />
          </NavMobileToggle>
          <NavLogo navTheme={NavigationTheme.Dark}>
            <RhythmLink href="/" passHref>
              <a
                id="rhythm-logo--mobile-nav"
                onClick={() => toggleMobileNav()}
                aria-label="Rhythm Logo"
              >
                <RhythmLogo />
              </a>
            </RhythmLink>
          </NavLogo>
        </NavWrapper>
        <MobileNavInner>
          {navItems.pages && (
            <MobileNavList>
              {!pageLimitedNav &&
                navItems?.pages?.map((page: PageType, index: number) => (
                  <li className="navPages" key={page.id}>
                    {Boolean(page?.subpages?.length) && (
                      <Accordion
                        lightVariant
                        accordionId={`mobileNav-${index}`}
                        accordionLabel={
                          page?.metadata?.pageNavigationTitle[
                            locale as Languages
                          ]
                        }
                        parentItem={
                          <NavParent>
                            {
                              page?.metadata?.pageNavigationTitle[
                                locale as Languages
                              ]
                            }
                          </NavParent>
                        }
                      >
                        <MobileNavSubpageList>
                          <RhythmLink href={`/${page.previewSlug}`}>
                            <a
                              id={`mobile-nav-item--${page.slug}`}
                              className="mobileNavLink subpageMobileLink"
                              onClick={() => toggleMobileNav()}
                              aria-label={
                                page?.metadata?.pageSubmenuTitle[
                                  locale as Languages
                                ]
                              }
                            >
                              <span>
                                {
                                  page?.metadata?.pageSubmenuTitle[
                                    locale as Languages
                                  ]
                                }
                              </span>
                            </a>
                          </RhythmLink>
                          {Boolean(page.subpages.length) &&
                            page?.subpages?.map((subpage: PageType) => (
                              <li key={subpage.id}>
                                <RhythmLink
                                  href={`/${subpage.previewSlug}`}
                                  passHref
                                >
                                  <a
                                    id={`main-nav-sub-item--${subpage.slug}`}
                                    onClick={() => toggleMobileNav()}
                                    className="mobileNavLink subpageMobileLink"
                                    aria-label={
                                      subpage?.metadata?.pageSubmenuTitle[
                                        locale as Languages
                                      ]
                                    }
                                  >
                                    <span>
                                      {
                                        subpage?.metadata?.pageSubmenuTitle[
                                          locale as Languages
                                        ]
                                      }
                                    </span>
                                  </a>
                                </RhythmLink>
                              </li>
                            ))}
                        </MobileNavSubpageList>
                      </Accordion>
                    )}
                    {!page.subpages.length && (
                      <MobileNavParentItem>
                        <RhythmLink href={`/${page.previewSlug}`} passHref>
                          <a
                            id={`mobile-nav-item--${page.slug}`}
                            onClick={() => toggleMobileNav()}
                            className="mobileNavLink parentItemLink"
                            aria-label={
                              page?.metadata?.pageNavigationTitle[
                                locale as Languages
                              ]
                            }
                          >
                            <NavParent>
                              {
                                page?.metadata?.pageNavigationTitle[
                                  locale as Languages
                                ]
                              }
                            </NavParent>
                          </a>
                        </RhythmLink>
                      </MobileNavParentItem>
                    )}
                  </li>
                ))}
              {navItems?.showSignUpButton && (
                <li className="navButton navSignUp" data-type="button">
                  <Button
                    buttonId="mobile-nav-item--signup-button"
                    data-type="button"
                    variant={ButtonStyleTypes.Primary}
                    buttonLabel={
                      navItems?.signUpButtonText[locale as Languages]
                    }
                    url={appendUrlParams(
                      navItems?.signUpButtonUrl,
                      queryParamString,
                    )}
                    target={LinkTarget.Self}
                    fullWidth
                  />
                </li>
              )}
              {!pageLimitedNav && navItems?.loginButtonUrl && (
                <li className="navButton navAccountLogin" data-type="button">
                  <Button
                    buttonId="mobile-nav-item--account-login"
                    data-type="button"
                    variant={ButtonStyleTypes.Secondary}
                    buttonLabel={navItems?.loginButtonText[locale as Languages]}
                    url={appendUrlParams(
                      navItems?.loginButtonUrl,
                      queryParamString,
                    )}
                    target={LinkTarget.Self}
                    fullWidth
                  />
                </li>
              )}
            </MobileNavList>
          )}
          {(navItems?.rhythmEmail || navItems?.rhythmPhone) && (
            <MobileNavContactBlock>
              {pageLimitedNav && pageLimitedNavPhoneNumber && (
                <MobileNavContactItem>
                  <PhoneSmall />{" "}
                  <a
                    href={`tel:${pageLimitedNavPhoneNumber}`}
                    className="navContactLink"
                    aria-label={pageLimitedNavPhoneNumber}
                  >
                    {pageLimitedNavPhoneNumber}
                  </a>
                </MobileNavContactItem>
              )}
              {!pageLimitedNav && (
                <MobileNavContactItem>
                  <PhoneSmall />{" "}
                  <a
                    href={`tel:${navItems.rhythmPhone}`}
                    className="navContactLink"
                    aria-label={navItems.rhythmPhone}
                  >
                    {navItems.rhythmPhone}
                  </a>
                </MobileNavContactItem>
              )}
              <MobileNavContactItem>
                <EmailSmall />{" "}
                <a
                  href={`mailto:${navItems.rhythmEmail}`}
                  className="navContactLink"
                  aria-label={navItems.rhythmEmail}
                >
                  {navItems.rhythmEmail}
                </a>
              </MobileNavContactItem>
            </MobileNavContactBlock>
          )}
          <MobileLanguageSelect>
            {navItems?.showLanguageSelectMenu && (
              <LanguageSelect language={locale as Languages} lightVariant />
            )}
          </MobileLanguageSelect>
        </MobileNavInner>
      </MobileNavigationContainer>
    )
  );
};
