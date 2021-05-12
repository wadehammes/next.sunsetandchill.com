import { FC, useState, useEffect } from "react";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { RhythmLogo } from "src/styles/logo/rhythmLogo";
import { useUi } from "src/context/ui.context";
import { MobileNav } from "src/styles/icons/MobileNav.icon";
import { MobileNavigation } from "src/components/Navigation/MobileNavigation.component";
import {
  ContentfulColors,
  Languages,
  LinkTarget,
} from "src/interfaces/common.interfaces";
import { PageType } from "src/components/Page/Page.interfaces";
import {
  NavigationTheme,
  NavProps,
} from "src/components/Navigation/Navigation.interfaces";
import { NavWrapper } from "src/components/Navigation/NavWrapper.component";
import { NavMobileToggle } from "src/components/Navigation/NavMobileToggle.component";
import { NavLogo } from "src/components/Navigation/NavLogo.component";
import {
  NavItem,
  NavItems,
  NavParent,
} from "src/components/Navigation/NavItems.component";
import { appendUrlParams } from "src/utils/helpers";
import {
  ButtonSizes,
  ButtonStyleTypes,
} from "src/components/Button/Button.interfaces";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useQueryParamString } from "src/hooks/useQueryParamString";

const PhoneSmall = dynamic(() => import("src/styles/icons/PhoneSmall.icon"));

const Banner = dynamic(() => import("src/components/Banner/Banner.component"));

const Button = dynamic(() => import("src/components/Button/Button.component"));

const NavSubMenu = dynamic(() =>
  import("src/components/Navigation/NavSubMenu.component"),
);

export const Navigation: FC<NavProps> = ({
  navItems = null,
  navTheme = NavigationTheme.Dark,
  pageLimitedNav,
  pageLimitedNavPhone,
  pageHideAllNav,
  pageHideSignUpButton,
  pageSignUpParams,
  pagePersistentNav,
  pageBanner,
}) => {
  const [hideNav, setHideNav] = useState(false);
  const { state, toggleMobileNav, setHasBanner } = useUi();
  const { locale, isPreview } = useRouter();
  const { mobileNavOpen } = state;
  const { queryParamString } = useQueryParamString();

  // Hide mobile on resize if it's open
  useEffect(() => {
    const hideMobileNavOnResize = () => {
      if (mobileNavOpen) {
        toggleMobileNav();
      }
    };

    window.addEventListener("resize", hideMobileNavOnResize);

    return () => window.removeEventListener("resize", hideMobileNavOnResize);
  }, [mobileNavOpen, toggleMobileNav]);

  // Stow nav bar when scrolling down the page, show it when scrolling up,
  // if pagePersistentNav is not enabled
  useEffect(() => {
    if (!pagePersistentNav) {
      let lastScrollY = 0;
      const handleScroll = () => {
        const { scrollY } = window;

        if (scrollY > 1) {
          if (scrollY < lastScrollY) {
            setHideNav(false);
          } else {
            setHideNav(true);
          }
        } else {
          setHideNav(false);
        }
        lastScrollY = scrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pagePersistentNav]);

  useEffect(() => {
    const banner = pageBanner ?? navItems?.banner ?? false;

    setHasBanner(Boolean(banner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems?.banner, pageBanner]);

  const pageLimitedNavPhoneNumber =
    pageLimitedNav && pageLimitedNavPhone
      ? pageLimitedNavPhone
      : navItems?.rhythmDigitalCampaignPhone ?? null;

  const bannerData = pageBanner ?? navItems?.banner ?? null;

  return (
    <>
      <NavWrapper
        preview={isPreview}
        backgroundColor={
          navTheme === NavigationTheme.Dark
            ? ContentfulColors.DarkPurple
            : ContentfulColors.White
        }
        navTheme={navTheme}
        hideNav={hideNav}
      >
        {!pageHideAllNav && (
          <NavMobileToggle
            aria-label="mobile-nav"
            onClick={() => toggleMobileNav()}
            navTheme={navTheme}
          >
            <MobileNav aria-hidden="true" />
          </NavMobileToggle>
        )}
        <NavLogo navTheme={navTheme}>
          <RhythmLink href="/" passHref>
            <a id="rhythm-logo--nav" aria-label="Rhythm Logo">
              <RhythmLogo />
            </a>
          </RhythmLink>
        </NavLogo>
        {!pageHideAllNav && navItems?.pages && (
          <NavItems navTheme={navTheme}>
            {!pageLimitedNav &&
              navItems?.pages?.map((page: PageType) => (
                <li className="navPages parentLi" key={page.id}>
                  <RhythmLink href={`/${page.previewSlug}`}>
                    <a
                      id={`main-nav-parent-item--${page.slug}`}
                      aria-label={
                        page?.metadata?.pageNavigationTitle[locale as Languages]
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
                  {Boolean(page.subpages.length) && (
                    <NavSubMenu>
                      <ul>
                        {page?.subpages?.map((subpage: PageType) => (
                          <li key={subpage.id} className="subPageLi">
                            <RhythmLink
                              href={
                                subpage?.parentPage
                                  ? `/${encodeURIComponent(
                                      subpage?.parentPage,
                                    )}/${encodeURIComponent(subpage.slug)}`
                                  : `/${encodeURIComponent(subpage.slug)}`
                              }
                              passHref
                            >
                              <a
                                id={`main-nav-sub-item--${subpage.slug}`}
                                aria-label={
                                  subpage?.metadata?.pageSubmenuTitle[
                                    locale as Languages
                                  ]
                                }
                              >
                                <NavItem>
                                  {
                                    subpage?.metadata?.pageSubmenuTitle[
                                      locale as Languages
                                    ]
                                  }
                                </NavItem>
                              </a>
                            </RhythmLink>
                          </li>
                        ))}
                      </ul>
                    </NavSubMenu>
                  )}
                </li>
              ))}
            {!pageLimitedNav && navItems?.loginButtonUrl && (
              <li className="navAccountLogin parentLi">
                <a
                  id="main-nav-item--account-login"
                  href={`${appendUrlParams(navItems?.loginButtonUrl, "")}`}
                  aria-label={navItems?.loginButtonText[locale as Languages]}
                  target={LinkTarget.Self}
                >
                  <NavItem>
                    {navItems?.loginButtonText[locale as Languages]}
                  </NavItem>
                </a>
              </li>
            )}
            {!pageLimitedNav && navItems.showPhoneNumber && (
              <li className="navPhone parentLi">
                <PhoneSmall />{" "}
                <a
                  href={`tel:${navItems.rhythmPhone}`}
                  aria-label={navItems.rhythmPhone}
                >
                  {navItems.rhythmPhone}
                </a>
              </li>
            )}
            {pageLimitedNav && pageLimitedNavPhoneNumber && (
              <li className="navPhone parentLi">
                <PhoneSmall />{" "}
                <a
                  href={`tel:${pageLimitedNavPhoneNumber}`}
                  aria-label={pageLimitedNavPhoneNumber}
                >
                  {pageLimitedNavPhoneNumber}
                </a>
              </li>
            )}
            {!pageHideSignUpButton && navItems?.showSignUpButton && (
              <li className="navSignUp parentLi" data-type="button">
                <Button
                  buttonId="main-nav-item--signup-button"
                  data-type="button"
                  variant={ButtonStyleTypes.Secondary}
                  size={ButtonSizes.Small}
                  buttonLabel={navItems?.signUpButtonText[locale as Languages]}
                  url={`${appendUrlParams(
                    navItems?.signUpButtonUrl,
                    `${pageSignUpParams}&${queryParamString}`,
                  )}`}
                  target={LinkTarget.Self}
                />
              </li>
            )}
          </NavItems>
        )}
      </NavWrapper>
      {bannerData && <Banner banner={bannerData} hideBanner={hideNav} />}
      {!pageHideAllNav && (
        <MobileNavigation
          navItems={navItems}
          navTheme={navTheme}
          pageLimitedNav={pageLimitedNav}
          pageLimitedNavPhone={pageLimitedNavPhone}
        />
      )}
    </>
  );
};

export default Navigation;
