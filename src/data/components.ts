import { Component } from "./types";
import type { ComponentCategory } from "./types";
import { bottomnav } from "./bottomnav/index.ts";

export const CATEGORIES = [
  { key: "buttons", label: "Buttons" },
  { key: "navigation", label: "Navigation" },
  { key: "cards", label: "Cards" },
  { key: "inputs", label: "Inputs & Forms" },
  { key: "dialogs", label: "Dialogs & Sheets" },
  { key: "feedback", label: "Feedback" },
  { key: "chips", label: "Chips & Tags" },
  { key: "appbars", label: "App Bars" },
  { key: "lists", label: "Lists" },
  { key: "typography", label: "Typography" },
  { key: "layout", label: "Layout" },
  { key: "icons", label: "Icons" },
];

export const STUB = "// Coming soon — code for this framework is not yet available.\n";

export const COMPONENTS: Component[] = [
  ...bottomnav,
];

export const getByCategory = (cat: ComponentCategory) =>
  COMPONENTS.filter((c) => c.category === cat);

export const getBySlug = (slug: string) =>
  COMPONENTS.find((c) => c.slug === slug);

export const getRelated = (component: Component) =>
  component.relatedSlugs
    .map((s) => getBySlug(s))
    .filter((c): c is Component => Boolean(c));

export const getFeatured = () => COMPONENTS.filter((c) => c.featured);

export const searchComponents = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return COMPONENTS;
  return COMPONENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q),
  );
};

export const categoryCount = (cat: ComponentCategory) =>
  getByCategory(cat).length;

export const TOTAL_COUNT = COMPONENTS.length;