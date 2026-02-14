export type ThemePalette = {
name: string; // مثال: Azure
primary: string; // #0ea5e9
surface: string; // #ffffff
onSurface: string; // #111827
hover: string; // rgba(...)
border: string; // #e5e7eb
};


export type ThemeSettings = {
palette: ThemePalette;
fontFamily: string; // مثال: 'Tajawal, system-ui, sans-serif'
radius: number; // 6..16
density: 'compact' | 'cozy' | 'spacious';
};
