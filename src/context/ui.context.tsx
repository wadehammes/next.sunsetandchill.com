import { createContext, useContext, useCallback, useReducer, FC } from "react";
import { bodyOverflow } from "src/utils/helpers";

interface UIStateStore {
  mobileNavOpen: boolean;
  hasBanner: boolean;
}

interface UIProviderProps {
  state: UIStateStore;
  toggleMobileNav: () => void;
  setHasBanner: (banner: boolean) => void;
}

const SET_UI = "SET UI";

const initialState: UIStateStore = {
  mobileNavOpen: false,
  hasBanner: false,
};

export const UIReducer = (
  state: UIStateStore,
  action: { type: string; payload: UIStateStore },
) => {
  switch (action.type) {
    case SET_UI:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const UIContext = createContext({} as UIProviderProps);

export const UIProvider: FC = ({ children }) => {
  // Initiate reducer
  const [state, dispatch] = useReducer(UIReducer, initialState);

  // Reducer actions
  const setUiState = useCallback(
    (value) => {
      dispatch({ type: "SET UI", payload: { ...value } });

      return true;
    },
    [dispatch],
  );

  const toggleMobileNav = () => {
    bodyOverflow(!state.mobileNavOpen);

    setUiState({
      mobileNavOpen: !state.mobileNavOpen,
    });
  };

  const setHasBanner = (banner: boolean) => {
    setUiState({
      hasBanner: banner,
    });
  };

  return (
    <UIContext.Provider
      value={{
        state,
        toggleMobileNav,
        setHasBanner,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUi = () => useContext(UIContext);
