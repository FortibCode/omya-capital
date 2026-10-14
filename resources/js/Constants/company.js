/**
 * OMYA CAPITAL's own details, in one place.
 *
 * These were previously copied by hand into the footer, the contact page and
 * the location block, which meant a change of address or phone number had to be
 * made three times and silently drifted if one was missed. Everything that
 * shows them now reads from here.
 */

export const COMPANY_PHONE = '+242 05098 75 41';

/** Same number with nothing but digits, for the `tel:` link. */
export const COMPANY_PHONE_HREF = `tel:${COMPANY_PHONE.replace(/[^+\d]/g, '')}`;

export const COMPANY_EMAIL = 'contact@omya-capital.com';
export const COMPANY_EMAIL_HREF = `mailto:${COMPANY_EMAIL}`;

/** Street address as it is written on the site. */
export const COMPANY_ADDRESS =
    '76 avenue Amilcar Cabral, Centre-ville, Immeuble Villarecci, en face du Radisson, Brazzaville';

/** Shorter form, for places where the full line does not fit. */
export const COMPANY_ADDRESS_SHORT =
    '76 Av. Amilcar Cabral — Immeuble Villarecci, Brazzaville';

/** What the map is centred on. */
export const COMPANY_MAP_QUERY =
    '76 avenue Amilcar Cabral, Immeuble Villarecci, Brazzaville, Congo';

export const COMPANY_MAP_LINK = `https://maps.google.com/?q=${encodeURIComponent(COMPANY_MAP_QUERY)}`;

export const COMPANY_MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
    COMPANY_MAP_QUERY
)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;
