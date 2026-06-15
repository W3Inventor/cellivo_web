export const BUSINESS_NAME = "Cellivo";
export const BUSINESS_EMAIL = "hello@cellivo.com";
export const BUSINESS_PHONE_RAW = "+94702720000";
export const BUSINESS_PHONE_DISPLAY = "+94 70 272 0000";
export const BUSINESS_PHONE_LOCAL = "0702720000";
export const BUSINESS_ADDRESS_STREET = "318/A/3 High Level Rd";
export const BUSINESS_ADDRESS_LOCALITY = "Pannipitiya";
export const BUSINESS_POSTAL_CODE = "10230";
export const BUSINESS_COUNTRY = "Sri Lanka";
export const BUSINESS_COUNTRY_CODE = "LK";
export const BUSINESS_ADDRESS_DISPLAY = `${BUSINESS_ADDRESS_STREET}, ${BUSINESS_ADDRESS_LOCALITY} ${BUSINESS_POSTAL_CODE}, ${BUSINESS_COUNTRY}`;
export const BUSINESS_ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS_ADDRESS_STREET,
  addressLocality: BUSINESS_ADDRESS_LOCALITY,
  postalCode: BUSINESS_POSTAL_CODE,
  addressCountry: BUSINESS_COUNTRY_CODE,
};
export const BUSINESS_MAP_URL =
  "https://www.google.com/maps/place/Cellivo+-+POS+System+for+Phone+Shops/@6.8439118,79.9512307,17z/data=!3m1!4b1!4m6!3m5!1s0x27f4fae4c8b282c3:0x9e8a3a4d093343af!8m2!3d6.8439118!4d79.9561016!16s%2Fg%2F11zhm9ncs4?hl=en&authuser=0&entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D";
export const BUSINESS_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Cellivo%20POS%20System%20for%20Phone%20Shops%406.8439118,79.9561016&z=17&output=embed";
export const BUSINESS_LOGO_URL = "https://cellivo.com/logo.png";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS_NAME,
  url: "https://cellivo.com",
  logo: BUSINESS_LOGO_URL,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_PHONE_RAW,
    contactType: "customer support",
    areaServed: BUSINESS_COUNTRY_CODE,
  },
  parentOrganization: {
    "@type": "Organization",
    name: "W3Inventor",
    url: "https://w3inventor.com",
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  image: BUSINESS_LOGO_URL,
  url: "https://cellivo.com",
  email: BUSINESS_EMAIL,
  telephone: BUSINESS_PHONE_RAW,
  address: BUSINESS_ADDRESS_SCHEMA,
  areaServed: BUSINESS_COUNTRY,
};
