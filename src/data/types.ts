export type ComponentCategory =
  | "buttons"
  | "navigation"
  | "cards"
  | "inputs"
  | "dialogs"
  | "feedback"
  | "chips"
  | "appbars"
  | "lists"
  | "typography"
  | "layout"
  | "icons";

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}
export interface FontResource {
  filename: string;
  downloadUrl: string;
  xmlSetup: string | null;
}

export interface DrawableResource {
  filename: string;
  code: string;
}

export interface ComponentResources {
  colorsDay:   string | null;
  colorsNight: string | null;
  drawables:   DrawableResource[] | null;
  fonts:       FontResource[] | null;
  extras:      string | null;
}

export interface ComponentFrameworkCode {
  component:  string | null;
  imports:    string | null;
  gradle:     string | null;
  resources:  ComponentResources | null;
  howToUse:   string | null;
}

export interface Component {
  id: string;
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  isNew: boolean;
  featured: boolean;
  frameworks: {
    compose: ComponentFrameworkCode | null;
    flutter: ComponentFrameworkCode | null;
    reactNative: ComponentFrameworkCode | null;
  };
  props: ComponentProp[];
  usageNotes: string;
  relatedSlugs: string[];
  previewMedia?: {
    day: string;    // image url for light mode preview
    night: string;  // image url for dark mode preview
  } | null;
}

export const c = (
  partial: Omit<Component, "id" | "props" | "usageNotes" | "relatedSlugs"> & {
    props?: ComponentProp[];
    usageNotes?: string;
    relatedSlugs?: string[];
  },
): Component => ({
  id: partial.slug,
  props: partial.props ?? [],
  usageNotes: partial.usageNotes ?? "",
  relatedSlugs: partial.relatedSlugs ?? [],
  ...partial,
});