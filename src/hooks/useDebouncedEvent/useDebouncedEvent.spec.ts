import { renderHook, act } from "@testing-library/react-hooks";
import { useDebouncedEvent } from ".";

jest.useFakeTimers();

describe("useDebouncedEvent", () => {
  test("only fires event once per interval", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebouncedEvent(callback, 100));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      const event = { iteration: 1 };

      result.current(event);
      event.iteration += 1;
      result.current(event);
      event.iteration += 1;
      result.current(event);
      event.iteration += 1;
      result.current(event);
    });

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);

    expect(callback).toHaveBeenCalledWith({ iteration: 4 });
  });
});
