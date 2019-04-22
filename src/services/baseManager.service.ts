import { BehaviorSubject, Observable } from "rxjs";

export interface Rx<T> {
  current: () => T;
  get: () => Observable<T>;
  set: (thing: T) => void;
};

export const rx = <T extends {}>(observable: BehaviorSubject<T>) => ({
  current: () => observable.getValue(),
  get: () => observable.asObservable(),
  set: (thing: T) => observable.next(thing)
}) as Rx<T>;
