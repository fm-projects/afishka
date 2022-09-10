import { store } from "@/store";

export enum DiaryPlugins {
  MINIMUM = "minimum",
  TIMETABLE = "timetable",
  HOMEWORK = "homework",
  MONITORS = "monitors",
}

export const pluginEnabled = (name: string): boolean => {
  const state = store.state.diary;
  return state.config && state.config.plugins.length
    ? state.config.plugins.includes(name) || state.config.plugins[0] == "__all__"
    : false;
};

export const pluginsEnabled = (...names: string[]): boolean => {
  const state = store.state.diary;
  if (!state.config || !state.config.plugins.length) return false;
  if (state.config?.plugins[0] == "__all__") return true;
  for (const name of names) if (!state.config.plugins.includes(name)) return false;
  return true;
};
