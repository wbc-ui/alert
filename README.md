<p align="center">
  <strong>A floating inspector for live data. Vue 3.</strong><br/>
  <em>Drop any object into a collapsible panel and read it — no <code>console.log</code> archaeology.</em>
</p>

<p align="center">
<img src="https://img.shields.io/badge/npm-3.0.0--rc.1-1976D2" alt="version">
<img src="https://img.shields.io/badge/license-MIT-blue" alt="license">
<img src="https://img.shields.io/badge/vue-3.5%2B-42b883" alt="vue">
</p>

---

Documentation: [alert.wbc-ui.com](https://alert.wbc-ui.com).

## Why?

### Inspect anything in one component

```html
<WBAlert title="Debug" :items="[state, lastError]" />
```

Every entry is rendered by **`@wbc-ui/dataviewer`**, so nested objects and arrays come out as an explorable tree instead of `[object Object]`.

### It floats, collapses and closes

The panel mounts as a fixed-position card, expands and collapses in place, and emits `close` when dismissed. You are not laying out a debug UI — you are handing it data.

### Position it when the default gets in the way

```html
<WBAlert :layout="{ style: { top: '10%', left: '70%', zIndex: 50 } }" :items="[payload]" />
```

`layout.style` merges over the default root style, so you override only what you need.

---

## What is @wbc-ui/alert?

A **Vue 3 plugin** that registers one component, **`<WBAlert>`** — a floating, collapsible inspector panel for the `@wbc-ui3` ecosystem.

| Piece | Role |
|---|---|
| `items` | The values to inspect — each rendered via `WBDataViewer` |
| `title` | Panel header text |
| `layout` | `layout.style` merged over the default root style (top-level keys other than `style` are ignored) |
| `mode` | Reserved — declared but has no effect. Rendering is never gated by it. |
| `@close` | Emitted when the user dismisses the panel |

> **This is a debugging surface.** It renders whatever you hand it, including values you would not want in front of an end user. Gate it behind your own environment check before shipping.

---

## Usage Examples

### Level 1 — A single value

```html
<WBAlert :items="[{ user: 'Alice', role: 'admin' }]" />
```

`items` also accepts a bare non-array value — it is wrapped for you.

### Level 2 — A titled panel of mixed data

```html
<WBAlert
  title="Debug Console"
  :items="[debugState, errorLog, route.params]"
  @close="onClose"
/>
```

```javascript
const debugState = { user: 'Alice', role: 'admin' };
const errorLog   = { status: 404, message: 'Resource not found' };
const onClose    = () => console.log('Alert closed');
```

### Level 3 — Repositioned, inside a WBC tree

```javascript
{
  comp: 'WBAlert',
  options: { props: {
    title: 'Live state',
    items: [storeSnapshot],
    layout: { style: { top: '5%', left: '65%', maxWidth: '420px', zIndex: 50 } }
  } }
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | String | `'WBC Alert'` | Header text in the panel toolbar. |
| `items` | Array | `[]` | Values to inspect. A non-array value is wrapped into one automatically. |
| `layout` | Object | `null` | `layout.style` is merged **over** the default root style (`position`, `top`, `left`, `maxWidth`, …). Top-level keys other than `style` are ignored. |
| `mode` | String | `'prod'` | Reserved — declared, kept to prevent it leaking as a DOM attribute, but has no effect. Rendering is never gated by this prop. |

## Events

| Event | Payload | Description |
|---|---|---|
| `close` | *(none)* | Emitted when the close button is clicked. The panel hides itself as well. |

---

## Installation

### Prerequisites

- **Node.js** ≥ 18
- **Vue 3.5+**, **`@wbc-ui/core`**, **`@wbc-ui/dataviewer`** and **`vuetify ^3.5.0`** — all four are peer dependencies
- **`@mdi/font`** (or equivalent Vuetify icon font) — the toolbar uses `mdi-*` icons (`mdi-drag-variant`, `mdi-close`, `mdi-chevron-up`, `mdi-chevron-down`)

### npm

```bash
npm install @wbc-ui/alert

# Peer dependencies — install once per project
npm install @wbc-ui/core @wbc-ui/dataviewer vue@^3.5.0 vuetify@^3.5.0
```

### Yarn / pnpm

```bash
yarn add @wbc-ui/alert @wbc-ui/core @wbc-ui/dataviewer vue@^3.5.0 vuetify@^3.5.0
pnpm add @wbc-ui/alert @wbc-ui/core @wbc-ui/dataviewer vue@^3.5.0 vuetify@^3.5.0
```

### Peer dependencies

| Package | Required? | Notes |
|---|---|---|
| `@wbc-ui/core` (`^3.0.0-rc.1`) | **required** | WBC rendering engine — needed when the panel is mounted through a `{ comp: 'WBAlert' }` WBC tree; direct `<WBAlert>` use does not import it. |
| `@wbc-ui/dataviewer` (`^3.0.0-rc.1`) | **required** | Renders each entry in `items`. Without it the panel has nothing to draw with. |
| `vue` (`^3.5.0`) | **required** | Vue 3 runtime. |
| `vuetify` (`^3.5.0`) | **required** | Every rendered element is a Vuetify component. The panel cannot run without it. |

This package has **no runtime dependencies of its own** — everything it needs is a peer.

The panel is a self-positioned `VCard` (`position: fixed`) in float mode and works anywhere a Vuetify instance is available — no `VApp` or `VLayout` wrapper is required.

### Vue 3 plugin registration

```javascript
import { createApp } from 'vue';
import WBCCore from '@wbc-ui/core';
import WBAlert from '@wbc-ui/alert';
import App from './App.vue';

const app = createApp(App);
app.use(WBCCore);   // always first
app.use(WBAlert);
app.mount('#app');
```

`install` is idempotent per app.

### Named imports

```javascript
import { WBAlert } from '@wbc-ui/alert';
```

### Troubleshooting common install errors

| Symptom | Cause | Fix |
|---|---|---|
| `<WBAlert>` renders as an unknown element | Plugin not installed on this app | `app.use(WBAlert)` after `app.use(WBCCore)`. |
| Panel appears but entries are blank | `@wbc-ui/dataviewer` isn't installed, or `items` contains only `%c` CSS-marker strings (used by browser console styling — these are intentionally skipped) | Install dataviewer: `npm install @wbc-ui/dataviewer`. Check that `items` contains real data, not console format strings. |
| Panel sits under other chrome | Another element has a higher stacking context | Raise it: `:layout="{ style: { zIndex: 100 } }"`. |
| Panel starts at a different horizontal offset each reload | The default `left` is randomised so stacked panels don't overlap | Pin it via `layout.style.left`. |
| `VIcon` / Vuetify components render as unknown elements | Vuetify isn't installed on the app | `npm install vuetify` and register it on the app (`app.use(createVuetify())`). |

---

## ⚡ The Component Under the Hood

- Registers exactly one component: **`WBAlert`**
- Each entry in `items` is rendered by **`WBDataViewer`**
- The default panel is `position: fixed`, `maxWidth: 520px`, height animating between collapsed and expanded
- `layout.style` is **spread over** the default root style — partial overrides are fine (top-level keys other than `style` are ignored)
- Non-array `items` are normalised into a single-entry array

---

## One edition

This package is **MIT-licensed with no tiers**. There is a single `dist/` build, no licence gate, and no authorization check — what you install is what you get.

---

## 🌐 Ecosystem

| Package | What it adds |
|---|---|
| `@wbc-ui/core` | The rendering engine — **required** |
| `@wbc-ui/dataviewer` | JSON / data-table explorer — **required** by this package |
| `@wbc-ui/code` | Code editor + Prism highlighting |
| `@wbc-ui/chart` | Apache ECharts integration |
| `@wbc-ui/latex` | KaTeX math rendering |
| `@wbc-ui/mermaid` | Diagram-as-code rendering |

---

## Build artifacts

| Field | Path |
|---|---|
| `module` (ESM) | `dist/alert3.es.js` |
| `main` (UMD) | `dist/alert3.umd.js` |

Published files: `dist/`, `README.md`, `LICENSE`.

---

## Exports

| Export | Kind | Purpose |
|---|---|---|
| `install` | function | Vue 3 plugin installer — `install(app, options)`. |
| `WBAlert` | component | The floating inspector panel. |

Default export: `{ install }`.

---

## 📄 License

MIT © [Wissem Boughamoura](https://github.com/wissemb11) · [wi-bg.com](https://www.wi-bg.com) · [wbc-ui.com](https://wbc-ui.com)
