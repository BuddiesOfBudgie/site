export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequiredBy<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
