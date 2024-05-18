"use client";
import {
  Mutate,
  StoreApi,
  StoreMutatorIdentifier,
  UseBoundStore,
  create,
} from "zustand";

// const zustandFamilyStore = new Map<
//   string,
//   UseBoundStore<Mutate<StoreApi<any>, any>>
// >();

type Create<
  T,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
> = typeof create<T, Mos>;
type CreateParameters<
  T,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
> = Parameters<Create<T, Mos>>[0];

export function createFamily<
  T,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
>(masterKey: string, initializer: CreateParameters<T, Mos>) {
  const familyStore = new Map<
    string,
    Map<string, UseBoundStore<Mutate<StoreApi<T>, Mos>>>
  >();

  const getMaster = () => {
    if (!familyStore.get(masterKey)) {
      familyStore.set(masterKey, new Map());
    }
    return familyStore.get(masterKey) as Map<
      string,
      UseBoundStore<Mutate<StoreApi<T>, Mos>>
    >;
  };

  const getMember = (key: string) => {
    const master = getMaster();
    let store = master.get(key);
    if (!store) {
      store = create<T, Mos>(initializer);
      master.set(key, store);
    }
    return store as UseBoundStore<Mutate<StoreApi<T>, Mos>>;
  };
  return getMember;
}
