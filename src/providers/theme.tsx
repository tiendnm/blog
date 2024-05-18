"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";

interface IThemeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
const initialThemeContext: IThemeContext = {
  darkMode: false,
  setDarkMode: () => {},
};
const ThemeContext = createContext<IThemeContext>(initialThemeContext);

export const ThemeContextProvider = (props: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    initialThemeContext.darkMode
  ); // first load is light

  useEffect(() => {
    const isLocalDarkMode = window.localStorage.getItem("darkMode") === "true"; // if theme = dark => set dark
    isLocalDarkMode && setDarkMode(isLocalDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("darkMode", darkMode + "");
  }, [darkMode]);
  const value = { darkMode, setDarkMode };
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const { darkMode, setDarkMode } = use(ThemeContext); // first load is light
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return {
    darkMode,
    toggleDarkMode,
  };
}
