import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemePalette, ThemeSettings } from '../models/theme.models';


const PALETTES: ThemePalette[] = [
{ name: 'Azure', primary: '#0ea5e9', surface: '#ffffff', onSurface: '#0f172a', hover: 'rgba(14,165,233,.10)', border:'#e5e7eb' },
{ name: 'Indigo', primary: '#6366f1', surface: '#ffffff', onSurface: '#0b1220', hover: 'rgba(99,102,241,.10)', border:'#e5e7eb' },
{ name: 'Slate', primary: '#0f172a', surface: '#111827', onSurface: '#f9fafb', hover: 'rgba(255,255,255,.06)', border:'#374151' },
];


@Injectable({ providedIn: 'root' })
export class ThemeService {
palettes = PALETTES;
fonts = [
"Tajawal, system-ui, sans-serif",
"Cairo, system-ui, sans-serif",
"Noto Kufi Arabic, system-ui, sans-serif",
];
private _state$ = new BehaviorSubject<ThemeSettings>({
palette: PALETTES[0], fontFamily: "Tajawal, system-ui, sans-serif", radius: 10, density: 'cozy'
});
state$ = this._state$.asObservable();


apply(settings: Partial<ThemeSettings>) {
const next = { ...this._state$.value, ...settings } as ThemeSettings;
this._state$.next(next);
// ضَخّ المتغيرات للـ :root
const r = document.documentElement.style;
r.setProperty('--menu-primary', next.palette.primary);
r.setProperty('--menu-surface', next.palette.surface);
r.setProperty('--menu-on-surface', next.palette.onSurface);
r.setProperty('--menu-hover', next.palette.hover);
r.setProperty('--menu-border', next.palette.border);
r.setProperty('--menu-radius', `${next.radius}px`);
r.setProperty('--menu-font', next.fontFamily);
}
}
