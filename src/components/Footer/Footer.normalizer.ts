import {
  ContentfulColors,
  Entry,
  LinkTarget,
} from "src/interfaces/common.interfaces";
import {
  FooterNavBlockType,
  FooterType,
  NavExternalLink,
  SocialLinksType,
} from "src/components/Footer/Footer.interfaces";

export const normalizedFooter = (entry: Entry): FooterType => ({
  ...entry.fields,
  footerBackgroundColor:
    entry?.fields?.footerBackgroundColor?.en ?? ContentfulColors.Black,
  footerNavBlocks:
    entry?.fields?.footerNavBlocks?.en?.map((block: Entry) => ({
      id: block?.sys?.id,
      navTitle: block.fields?.navTitle ?? null,
      navLinks:
        block.fields?.navLinks?.en?.map(
          (navLink: FooterNavBlockType) => navLink.sys.id,
        ) ?? [],
      navExternalLinks:
        block.fields?.navExternalLinks?.en?.map(
          (navLink: FooterNavBlockType) => navLink.sys.id,
        ) ?? [],
    })) ?? [],
  showNewsletterSignUp: entry.fields?.showNewsletterSignUp?.en ?? false,
  socialChannels: entry.fields?.socialChannels?.en.map(
    (channel: SocialLinksType) => ({
      socialChannelName: channel.fields?.socialChannelName ?? null,
      socialChannelUrl: channel.fields?.socialChannelUrl ?? null,
    }),
  ),
  addressLookupMetadata:
    entry?.fields?.addressLookupMetadata?.en?.sys?.id ?? null,
});

export const normalizedExternalLink = (entry: Entry): NavExternalLink => ({
  id: entry.sys.id,
  ...entry.fields,
  linkUrl: entry.fields?.linkUrl?.en ?? "",
  linkTarget: entry.fields?.linkTarget?.en ?? LinkTarget.Self,
});
