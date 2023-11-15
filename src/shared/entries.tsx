export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

// Here we are re-declaring the Object.entries type with the proper generics
type ObjectEntries = <T extends Object>(obj: T) => Entries<T>;

export const entries: ObjectEntries = Object.entries;
