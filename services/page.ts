import { createSocialAccountsMap } from '@/lib/dataProcessing/createSocialAccountsMap';
import { createSocialLinkList } from '@/lib/dataProcessing/createSocialLinkList';
import { prismicioClient } from '@/lib/prismicio/prismicioClient';

export async function fetchCommonPageData() {
  const [
    header,
    footer,
    navigation,
    socialAccounts,
    socials,
    email,
    siteInformation,
  ] = await Promise.all([
    prismicioClient.getSingle('siteHeader'),
    prismicioClient.getSingle('siteFooter'),
    prismicioClient.getSingle('siteNavigation'),
    prismicioClient.getAllByType('socialAccount'),
    prismicioClient.getSingle('socialLinks'),
    prismicioClient.getSingle('contactEmail'),
    prismicioClient.getSingle('siteInformation'),
  ]);

  const contactEmail = email.data.contactEmail as string;
  const siteName = siteInformation.data.name as string;

  const socialAccountsMap = createSocialAccountsMap(socialAccounts);

  const socialLinks = createSocialLinkList(
    socials.data.socialLinks,
    socialAccountsMap,
  );

  return {
    headerData: header.data,
    footerData: footer.data,
    navigationData: navigation.data,
    socialLinks,
    socialAccounts: socialAccountsMap,
    contactEmail,
    siteName,
  };
}
