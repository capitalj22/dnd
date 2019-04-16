import { BehaviorSubject } from "rxjs";

export const rx = <T extends {}>(observable: BehaviorSubject<T>) => ({
  current: () => observable.getValue(),
  get: () => observable.asObservable(),
  set: (thing: T) => observable.next(thing)
});
