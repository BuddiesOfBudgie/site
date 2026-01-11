import { A, S, flow } from '@mobily/ts-belt';

export const getPrettyTagName = flow(
  S.split('-'),
  A.map((s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`),
  A.join(' ')
);
