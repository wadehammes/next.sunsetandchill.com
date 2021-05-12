import { useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackType = (args: any) => void;

export const useDebouncedEvent = (callback: CallbackType, waitTime = 0) => {
  const debouncedCallback = useMemo(
    () => debounce(callback, waitTime),
    [callback, waitTime],
  );

  return useCallback(
    (event) => {
      /* React handles input events but having a single SyntheticEvent
       * instance that is cleared and reused between callback calls so
       * in order to make sure we are not using a stale (cleared) version
       * of the event, we copy it over and pass it to the debounced function
       * */
      debouncedCallback({ ...event });
    },
    [debouncedCallback],
  );
};
