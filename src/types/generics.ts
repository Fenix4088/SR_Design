export type PickFromType<T, PickedAlias> = PickedAlias extends T ? PickedAlias : never;
