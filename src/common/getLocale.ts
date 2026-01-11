import type { GetStaticPropsContext, GetServerSidePropsContext } from 'next';

/**
 * Parse Accept-Language header and return the best matching locale.
 *
 * @param acceptLanguage - The Accept-Language header value (e.g., "en-US,en;q=0.9,es;q=0.8")
 * @returns The best matching locale or null if none found
 */
const parseAcceptLanguage = (acceptLanguage: string): string | null => {
  if (!acceptLanguage) return null;

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, qValue] = lang.trim().split(';');
      const quality = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0;
      // Extract base locale (e.g., "en" from "en-US")
      const baseLocale = locale.split('-')[0].toLowerCase();
      return { locale: baseLocale, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find the first supported locale
  for (const { locale } of languages) {
    if (isSupportedLocale(locale)) {
      return locale;
    }
  }

  return null;
};

/**
 * Type guard to check if context is GetServerSidePropsContext
 */
const isServerSideContext = (
  context: GetStaticPropsContext | GetServerSidePropsContext | undefined
): context is GetServerSidePropsContext => {
  return context !== undefined && 'req' in context && 'query' in context;
};

/**
 * Get the locale for the current request.
 *
 * Detection priority (highest to lowest):
 * 1. Explicit locale parameter in context (if provided)
 * 2. Query parameter (?locale=xx) - only available in getServerSideProps
 * 3. Accept-Language header (parsed and matched against supported locales) - only available in getServerSideProps
 * 4. Default locale ("en")
 *
 * @param context - The Next.js context (from getStaticProps/getServerSideProps)
 * @returns The locale string (e.g., "en", "es", "fr")
 */
export const getLocale = (context?: GetStaticPropsContext | GetServerSidePropsContext): string => {
  // Check explicit locale parameter (available in both contexts)
  if (context?.locale && isSupportedLocale(context.locale)) {
    return context.locale;
  }

  // Query parameter and request headers are only available in getServerSideProps
  if (isServerSideContext(context)) {
    // Check query parameter
    if (context.query?.locale) {
      const queryLocale = Array.isArray(context.query.locale) ? context.query.locale[0] : context.query.locale;
      if (isSupportedLocale(queryLocale)) {
        return queryLocale;
      }
    }

    // Check Accept-Language header
    if (context.req?.headers) {
      const acceptLanguage =
        typeof context.req.headers['accept-language'] === 'string'
          ? context.req.headers['accept-language']
          : Array.isArray(context.req.headers['accept-language'])
            ? context.req.headers['accept-language'][0]
            : undefined;

      if (acceptLanguage) {
        const parsedLocale = parseAcceptLanguage(acceptLanguage);
        if (parsedLocale) {
          return parsedLocale;
        }
      }
    }
  }

  return 'en';
};

/**
 * Supported locales in the application.
 * Add more locales here as you add translation files.
 */
export const supportedLocales = ['en'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

/**
 * Check if a locale is supported.
 */
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return supportedLocales.includes(locale as SupportedLocale);
};
