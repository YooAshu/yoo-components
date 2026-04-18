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

export interface Component {
  id: string;
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  isNew: boolean;
  variants: string[];
  frameworks: {
    compose: string | null;
    flutter: string | null;
    reactNative: string | null;
  };
  props: ComponentProp[];
  usageNotes: string;
  relatedSlugs: string[];
  featured: boolean;
}

export const CATEGORIES: { key: ComponentCategory; label: string }[] = [
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

const STUB = "// Coming soon — code for this framework is not yet available.\n";

const c = (
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

// FULLY-CODED COMPONENTS (15 across categories)
const primaryButton = c({
  slug: "primary-button",
  name: "Primary Button",
  category: "buttons",
  description: "The main call-to-action button with elevated emphasis.",
  isNew: false,
  featured: true,
  variants: ["Filled", "Tonal", "Disabled"],
  frameworks: {
    compose: `@Composable
fun PrimaryButton(
  text: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
) {
  Button(
    onClick = onClick,
    enabled = enabled,
    modifier = modifier,
    colors = ButtonDefaults.buttonColors(
      containerColor = MaterialTheme.colorScheme.primary
    )
  ) {
    Text(text)
  }
}`,
    flutter: `class PrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  const PrimaryButton({
    super.key,
    required this.text,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return FilledButton(
      onPressed: onPressed,
      child: Text(text),
    );
  }
}`,
    reactNative: `import { Pressable, Text, StyleSheet } from "react-native";

export function PrimaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.4 },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#6750A4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  text: { color: "white", fontWeight: "600" },
});`,
  },
  props: [
    { name: "text / title", type: "String", default: "—", description: "Label shown inside the button." },
    { name: "onClick / onPress", type: "() -> Unit", default: "—", description: "Action invoked on tap." },
    { name: "enabled", type: "Boolean", default: "true", description: "Disabled state when false." },
  ],
  usageNotes: "Use the Primary Button for the most important action on a screen. Limit to one per view to preserve hierarchy.",
  relatedSlugs: ["outlined-button", "text-button", "fab"],
});

const outlinedButton = c({
  slug: "outlined-button",
  name: "Outlined Button",
  category: "buttons",
  description: "Medium-emphasis button with a stroke border.",
  isNew: false,
  featured: true,
  variants: ["Default", "With Icon"],
  frameworks: {
    compose: `@Composable
fun OutlinedActionButton(text: String, onClick: () -> Unit) {
  OutlinedButton(onClick = onClick) {
    Text(text)
  }
}`,
    flutter: `OutlinedButton(
  onPressed: () {},
  child: const Text("Action"),
);`,
    reactNative: `<Pressable style={styles.outlined}>
  <Text style={styles.label}>Action</Text>
</Pressable>`,
  },
  props: [
    { name: "text", type: "String", default: "—", description: "Label." },
    { name: "onClick", type: "() -> Unit", default: "—", description: "Tap handler." },
  ],
  usageNotes: "Use when an action is important but not the primary one on screen.",
  relatedSlugs: ["primary-button", "text-button"],
});

const textButton = c({
  slug: "text-button",
  name: "Text Button",
  category: "buttons",
  description: "Low-emphasis button used for tertiary actions.",
  isNew: false,
  featured: false,
  variants: ["Default"],
  frameworks: {
    compose: `TextButton(onClick = { /* ... */ }) {
  Text("Cancel")
}`,
    flutter: `TextButton(onPressed: () {}, child: const Text("Cancel"));`,
    reactNative: `<Pressable><Text style={{ color: "#6750A4" }}>Cancel</Text></Pressable>`,
  },
  relatedSlugs: ["primary-button", "outlined-button"],
});

const iconButton = c({
  slug: "icon-button",
  name: "Icon Button",
  category: "buttons",
  description: "Compact button containing only an icon.",
  isNew: false,
  featured: false,
  variants: ["Default", "Toggle"],
  frameworks: {
    compose: `IconButton(onClick = { /* ... */ }) {
  Icon(Icons.Default.Favorite, contentDescription = "Like")
}`,
    flutter: `IconButton(icon: const Icon(Icons.favorite), onPressed: () {});`,
    reactNative: `<Pressable hitSlop={8}><HeartIcon /></Pressable>`,
  },
  relatedSlugs: ["fab"],
});

const fab = c({
  slug: "fab",
  name: "Floating Action Button",
  category: "buttons",
  description: "Circular floating button for the screen's primary action.",
  isNew: true,
  featured: true,
  variants: ["Small", "Default", "Large"],
  frameworks: {
    compose: `FloatingActionButton(onClick = { /* ... */ }) {
  Icon(Icons.Default.Add, contentDescription = "Add")
}`,
    flutter: `FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add));`,
    reactNative: `<Pressable style={fabStyles.fab}>
  <PlusIcon color="white" />
</Pressable>`,
  },
  relatedSlugs: ["primary-button", "icon-button"],
});

const bottomNav = c({
  slug: "bottom-navigation",
  name: "Bottom Navigation Bar",
  category: "navigation",
  description: "Persistent bottom tab bar for top-level destinations.",
  isNew: false,
  featured: true,
  variants: ["3 items", "5 items"],
  frameworks: {
    compose: `NavigationBar {
  NavigationBarItem(
    selected = selected == 0,
    onClick = { selected = 0 },
    icon = { Icon(Icons.Default.Home, null) },
    label = { Text("Home") }
  )
  NavigationBarItem(
    selected = selected == 1,
    onClick = { selected = 1 },
    icon = { Icon(Icons.Default.Search, null) },
    label = { Text("Search") }
  )
}`,
    flutter: `NavigationBar(
  selectedIndex: index,
  onDestinationSelected: (i) => setState(() => index = i),
  destinations: const [
    NavigationDestination(icon: Icon(Icons.home), label: "Home"),
    NavigationDestination(icon: Icon(Icons.search), label: "Search"),
  ],
);`,
    reactNative: `// Use @react-navigation/bottom-tabs
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
</Tab.Navigator>`,
  },
  relatedSlugs: ["navigation-drawer", "scrollable-tabs"],
});

const basicCard = c({
  slug: "basic-card",
  name: "Basic Card",
  category: "cards",
  description: "Surface that groups related content with subtle elevation.",
  isNew: false,
  featured: true,
  variants: ["Filled", "Elevated", "Outlined"],
  frameworks: {
    compose: `Card(modifier = Modifier.padding(16.dp)) {
  Column(Modifier.padding(16.dp)) {
    Text("Title", style = MaterialTheme.typography.titleMedium)
    Spacer(Modifier.height(8.dp))
    Text("Body content goes here.")
  }
}`,
    flutter: `Card(
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text("Title", style: TextStyle(fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Text("Body content goes here."),
      ],
    ),
  ),
);`,
    reactNative: `<View style={styles.card}>
  <Text style={styles.title}>Title</Text>
  <Text>Body content goes here.</Text>
</View>`,
  },
  relatedSlugs: ["elevated-card", "outlined-card"],
});

const elevatedCard = c({
  slug: "elevated-card",
  name: "Elevated Card",
  category: "cards",
  description: "Card with stronger shadow for higher emphasis.",
  isNew: false,
  featured: false,
  variants: ["Default"],
  frameworks: {
    compose: `ElevatedCard(elevation = CardDefaults.elevatedCardElevation(8.dp)) { /* ... */ }`,
    flutter: `Card(elevation: 8, child: /* ... */);`,
    reactNative: `<View style={[styles.card, { elevation: 8 }]} />`,
  },
  relatedSlugs: ["basic-card"],
});

const outlinedTextField = c({
  slug: "outlined-textfield",
  name: "Outlined TextField",
  category: "inputs",
  description: "Text input with a stroked border and floating label.",
  isNew: false,
  featured: true,
  variants: ["Default", "With Helper", "Error"],
  frameworks: {
    compose: `var value by remember { mutableStateOf("") }
OutlinedTextField(
  value = value,
  onValueChange = { value = it },
  label = { Text("Email") },
  singleLine = true,
)`,
    flutter: `TextField(
  decoration: const InputDecoration(
    border: OutlineInputBorder(),
    labelText: "Email",
  ),
);`,
    reactNative: `<TextInput
  placeholder="Email"
  style={styles.input}
  value={value}
  onChangeText={setValue}
/>`,
  },
  props: [
    { name: "value", type: "String", default: "\"\"", description: "Current text value." },
    { name: "onValueChange", type: "(String) -> Unit", default: "—", description: "Called on every change." },
    { name: "label", type: "String", default: "—", description: "Floating label." },
  ],
  usageNotes: "Pair with a Form for validation. Use `singleLine = true` for short fields.",
  relatedSlugs: ["filled-textfield", "password-field", "search-bar"],
});

const switchToggle = c({
  slug: "switch-toggle",
  name: "Switch / Toggle",
  category: "inputs",
  description: "Two-state toggle for on/off settings.",
  isNew: true,
  featured: true,
  variants: ["Default"],
  frameworks: {
    compose: `var checked by remember { mutableStateOf(false) }
Switch(checked = checked, onCheckedChange = { checked = it })`,
    flutter: `Switch(value: checked, onChanged: (v) => setState(() => checked = v));`,
    reactNative: `<Switch value={checked} onValueChange={setChecked} />`,
  },
  relatedSlugs: ["checkbox", "radio-button"],
});

const checkbox = c({
  slug: "checkbox",
  name: "Checkbox",
  category: "inputs",
  description: "Binary toggle that supports indeterminate state.",
  isNew: false,
  featured: false,
  variants: ["Default", "Indeterminate"],
  frameworks: {
    compose: `Checkbox(checked = checked, onCheckedChange = { checked = it })`,
    flutter: `Checkbox(value: checked, onChanged: (v) => setState(() => checked = v!));`,
    reactNative: `// react-native-paper
<Checkbox status={checked ? "checked" : "unchecked"} onPress={() => setChecked(!checked)} />`,
  },
  relatedSlugs: ["switch-toggle", "radio-button"],
});

const alertDialog = c({
  slug: "alert-dialog",
  name: "Alert Dialog",
  category: "dialogs",
  description: "Modal dialog used for confirmations and short prompts.",
  isNew: false,
  featured: true,
  variants: ["Default", "Destructive"],
  frameworks: {
    compose: `AlertDialog(
  onDismissRequest = { open = false },
  title = { Text("Delete?") },
  text = { Text("This cannot be undone.") },
  confirmButton = {
    TextButton(onClick = { open = false }) { Text("Delete") }
  },
  dismissButton = {
    TextButton(onClick = { open = false }) { Text("Cancel") }
  }
)`,
    flutter: `showDialog(
  context: context,
  builder: (_) => AlertDialog(
    title: const Text("Delete?"),
    content: const Text("This cannot be undone."),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
      TextButton(onPressed: () => Navigator.pop(context), child: const Text("Delete")),
    ],
  ),
);`,
    reactNative: `Alert.alert("Delete?", "This cannot be undone.", [
  { text: "Cancel", style: "cancel" },
  { text: "Delete", style: "destructive", onPress: onConfirm },
]);`,
  },
  relatedSlugs: ["modal-bottom-sheet", "snackbar"],
});

const snackbar = c({
  slug: "snackbar",
  name: "Snackbar",
  category: "feedback",
  description: "Brief, transient message at the bottom of the screen.",
  isNew: false,
  featured: true,
  variants: ["Default", "With Action"],
  frameworks: {
    compose: `val snackbarHostState = remember { SnackbarHostState() }
Scaffold(snackbarHost = { SnackbarHost(snackbarHostState) }) { padding ->
  Button(onClick = {
    scope.launch { snackbarHostState.showSnackbar("Saved!") }
  }) { Text("Save") }
}`,
    flutter: `ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(content: Text("Saved!")),
);`,
    reactNative: `// react-native-paper
<Snackbar visible={visible} onDismiss={() => setVisible(false)}>
  Saved!
</Snackbar>`,
  },
  relatedSlugs: ["alert-dialog"],
});

const filterChip = c({
  slug: "filter-chip",
  name: "Filter Chip",
  category: "chips",
  description: "Toggleable chip used to filter content sets.",
  isNew: true,
  featured: true,
  variants: ["Default", "Selected"],
  frameworks: {
    compose: `var selected by remember { mutableStateOf(false) }
FilterChip(
  selected = selected,
  onClick = { selected = !selected },
  label = { Text("Compose") }
)`,
    flutter: `FilterChip(
  label: const Text("Compose"),
  selected: selected,
  onSelected: (v) => setState(() => selected = v),
);`,
    reactNative: `<Pressable
  onPress={() => setSelected(!selected)}
  style={[styles.chip, selected && styles.chipActive]}
>
  <Text>{label}</Text>
</Pressable>`,
  },
  relatedSlugs: ["assist-chip", "input-chip"],
});

const topAppBar = c({
  slug: "small-top-app-bar",
  name: "Small Top App Bar",
  category: "appbars",
  description: "Standard top app bar with title and actions.",
  isNew: false,
  featured: true,
  variants: ["Default", "With Nav"],
  frameworks: {
    compose: `TopAppBar(
  title = { Text("Inbox") },
  navigationIcon = {
    IconButton(onClick = {}) { Icon(Icons.Default.Menu, null) }
  },
  actions = {
    IconButton(onClick = {}) { Icon(Icons.Default.Search, null) }
  }
)`,
    flutter: `AppBar(
  title: const Text("Inbox"),
  leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),
  actions: [IconButton(icon: const Icon(Icons.search), onPressed: () {})],
);`,
    reactNative: `// react-navigation handles header automatically
<Stack.Screen
  name="Inbox"
  component={InboxScreen}
  options={{ title: "Inbox", headerRight: () => <SearchIcon /> }}
/>`,
  },
  relatedSlugs: ["large-top-app-bar", "bottom-navigation"],
});

const fullyCoded = [
  primaryButton,
  outlinedButton,
  textButton,
  iconButton,
  fab,
  bottomNav,
  basicCard,
  elevatedCard,
  outlinedTextField,
  switchToggle,
  checkbox,
  alertDialog,
  snackbar,
  filterChip,
  topAppBar,
];

// Stub components — metadata only
const stub = (
  slug: string,
  name: string,
  category: ComponentCategory,
  description: string,
  isNew = false,
  featured = false,
): Component =>
  c({
    slug,
    name,
    category,
    description,
    isNew,
    featured,
    variants: ["Default"],
    frameworks: { compose: STUB, flutter: STUB, reactNative: STUB },
  });

const stubs: Component[] = [
  // buttons (3 left)
  stub("extended-fab", "Extended FAB", "buttons", "FAB with text label."),
  stub("toggle-button", "Toggle Button", "buttons", "Two-state pressable button."),
  stub("segmented-button", "Segmented Button", "buttons", "Group of related toggle options.", true),
  // navigation (5 left)
  stub("navigation-drawer", "Navigation Drawer", "navigation", "Slide-in side navigation panel."),
  stub("navigation-rail", "Navigation Rail", "navigation", "Vertical nav for tablets."),
  stub("scrollable-tabs", "Scrollable Tab Row", "navigation", "Horizontally scrollable tabs."),
  stub("fixed-tabs", "Fixed Tab Row", "navigation", "Fixed-width tab row.", false, true),
  stub("back-button", "Back Button", "navigation", "Standard navigate-back affordance."),
  // cards (3 left)
  stub("outlined-card", "Outlined Card", "cards", "Card with stroke instead of shadow."),
  stub("image-card", "Card with Image + Actions", "cards", "Card with media and action row.", true, true),
  stub("horizontal-card", "Horizontal Card", "cards", "Side-by-side image and text."),
  // inputs (4 left)
  stub("filled-textfield", "Filled TextField", "inputs", "Text field with filled background."),
  stub("password-field", "Password Field", "inputs", "Obscured input with reveal toggle."),
  stub("search-bar", "Search Bar", "inputs", "Prominent search input.", true, true),
  stub("radio-button", "Radio Button", "inputs", "Single-select option group."),
  stub("slider", "Slider", "inputs", "Continuous value selector."),
  // dialogs (4 left)
  stub("modal-bottom-sheet", "Modal Bottom Sheet", "dialogs", "Sheet that slides up from the bottom.", false, true),
  stub("fullscreen-dialog", "Full Screen Dialog", "dialogs", "Dialog that fills the viewport."),
  stub("date-picker", "Date Picker", "dialogs", "Calendar-based date selection."),
  stub("time-picker", "Time Picker", "dialogs", "Clock-style time selection."),
  // feedback (4 left)
  stub("toast", "Toast", "feedback", "Lightweight ephemeral message."),
  stub("linear-progress", "Linear Progress", "feedback", "Horizontal progress indicator."),
  stub("circular-progress", "Circular Progress", "feedback", "Spinning progress indicator."),
  stub("pull-to-refresh", "Pull to Refresh", "feedback", "Drag-down refresh gesture.", true),
  // chips (3 left)
  stub("assist-chip", "Assist Chip", "chips", "Chip that suggests an action."),
  stub("input-chip", "Input Chip", "chips", "Chip representing user input."),
  stub("suggestion-chip", "Suggestion Chip", "chips", "Chip that suggests an option."),
  // appbars (3 left)
  stub("large-top-app-bar", "Large Top App Bar", "appbars", "Tall app bar with prominent title."),
  stub("center-app-bar", "Center-Aligned App Bar", "appbars", "App bar with centered title."),
  stub("bottom-app-bar", "Bottom App Bar", "appbars", "App bar anchored to the bottom."),
  // lists (4)
  stub("simple-list-item", "Simple List Item", "lists", "Single-line list row."),
  stub("list-item-icon", "List Item with Icon", "lists", "List row with leading icon."),
  stub("list-item-trailing", "List Item with Trailing", "lists", "List row with trailing element."),
  stub("swipe-to-dismiss", "Swipe to Dismiss", "lists", "Swipe gesture to remove items.", true),
  // typography (4)
  stub("display-headline", "Display & Headline Styles", "typography", "Large typographic styles."),
  stub("body-text", "Body Text Styles", "typography", "Standard reading styles."),
  stub("label-styles", "Label Styles", "typography", "Compact label typography."),
  stub("annotated-text", "Annotated / Rich Text", "typography", "Mixed-style inline text."),
  // layout (4)
  stub("scaffold", "Scaffold", "layout", "Top-level layout primitive.", false, true),
  stub("column", "Column / Vertical Stack", "layout", "Vertical layout primitive."),
  stub("row", "Row / Horizontal Stack", "layout", "Horizontal layout primitive."),
  stub("box-stack", "Box / Stack / ZStack", "layout", "Overlay layout primitive."),
  // icons (3)
  stub("icon-display", "Icon Display Patterns", "icons", "Standard icon usage examples."),
  stub("icon-with-badge", "Icon with Badge", "icons", "Icon with notification badge.", true),
  stub("icon-button-states", "Icon Button States", "icons", "Hover/press/disabled states."),
];

export const COMPONENTS: Component[] = [...fullyCoded, ...stubs];

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
