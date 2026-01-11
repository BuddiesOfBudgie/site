export const getFullDomainPath = (subPath: string) =>
  `${process.env.DOMAIN ?? 'https://buddiesofbudgie.org'}${subPath}`;
