import useLocalStorage from "use-local-storage";

import { useUpdateAccountTheme } from "@/lib/actions";
import { useCurrentUser } from "@/lib/store";
import { defaultThemeConfig } from "@/configs";

export default function useTheme() {
  const { updateTheme: setTheme } = useUpdateAccountTheme();
  const [themeLS] = useLocalStorage("groove-theme-config");

  const { currentUser } = useCurrentUser();
  const { user } = currentUser || {};
  const theme = themeLS || user?.prefs || defaultThemeConfig;

  return [theme, setTheme];
}
