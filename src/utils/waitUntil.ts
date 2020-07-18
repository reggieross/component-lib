export const waitUntil = (predicate: () => boolean): Promise<void> => {
  let timedOut = false;
  const maxWaitTime = 3000;
  const timeOut = setTimeout(() => (timedOut = true), maxWaitTime);

  const recursivelyResolveFn = (
    reject: (reason: any) => void,
    resolve: () => void,
  ) => {
    if (timedOut) {
      reject(`predicate did not resolve in ${maxWaitTime}ms`);
    }
    if (predicate()) {
      clearTimeout(timeOut);
      resolve();
    } else {
      setTimeout(() => recursivelyResolveFn(reject, resolve), 10);
    }
  };

  return new Promise((resolve, reject) =>
    recursivelyResolveFn(reject, resolve),
  );
};