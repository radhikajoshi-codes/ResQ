# ResQ — Citizen-First Disaster Safety Assistant

> **"Know your risk. Know what to do."**  
> An AI-powered disaster safety assistant built for normal citizens in emergency situations.

---

## 🛡️ Product Overview

**ResQ** is redesigned completely around a **simple, citizen-first user experience**. During emergencies, citizens do not need complex multi-monitor command dashboards or overwhelming analytics. They need clear, calm answers to 6 fundamental questions within 5 seconds:

1. **Am I at risk?**
2. **How serious is the risk?**
3. **Why am I at risk?**
4. **What should I do right now?**
5. **Where should I go?**
6. **Can I ask questions about my situation?**

---

## 📱 7-Screen Citizen User Journey

```
USER
  ↓
[SCREEN 1 — HOME]: Enters location + Selects disaster
  ↓
[SCREEN 2 — SIMPLE QUESTIONS]: Answers 3–5 hazard-specific questions
  ↓
[SCREEN 3 — RISK RESULT]: Large 0–100 animated gauge + "Why?" + Possible Impact
  ↓
[SCREEN 4 — WHAT TO DO NOW]: 🚨 Action list + 🚫 Avoid + 👁️ Monitor
  ↓
[SCREEN 5 — SAFE OPTIONS & MAP]: Shelters, Hospitals, and Evacuation Map
  ↓
[SCREEN 7 — SIMPLE WHAT-IF]: Test "What if rainfall / wind / intensity increases?"
  ↓
[SCREEN 6 — ASK RESQ]: Contextual AI Safety Assistant with local fallback
```

### Screen Details:
- **Screen 1 — Home**: 
  - Headline: *"Are you safe right now?"*
  - *"Tell us where you are and what’s happening."*
  - Location input with quick presets (*Lower Basin / Riverside*, *Downtown*, *Foothills*, *Coastal Harbor*) and GPS auto-detect.
  - 8 Disaster cards: **Flood**, **Heavy Rain**, **Fire**, **Storm**, **Cyclone**, **Earthquake**, **Extreme Heat**, **Other**.
  - Button: `CHECK MY RISK →`
  - Prototype / Demo data disclaimer.

- **Screen 2 — Simple Questions**:
  - Dynamically renders questions strictly relevant to the chosen disaster.
  - Simple controls: visual option cards, sliders, and buttons rather than complex forms.
  - Button: `ANALYZE MY RISK`

- **Screen 3 — Risk Result (The Core Screen)**:
  - Large animated circular risk gauge ($0\text{–}100$).
  - Color-coded severity badge:
    - **0–35**: Low Risk (Emerald Green)
    - **36–65**: Moderate Risk (Amber Yellow)
    - **66–80**: High Risk (Warm Orange)
    - **81–100**: Severe Risk (Crimson Red)
  - **"Why is my risk high?"**: Transparent breakdown of contributing factors directly tied to user inputs.
  - **"Possible Impact"**: Plain-language consequence statement.

- **Screen 4 — What To Do Now**:
  - **🚨 WHAT YOU SHOULD DO NOW**: Numbered immediate action checklist (with completion checkboxes & copy/share feature).
  - **🚫 AVOID**: Highlighting dangerous roads, basement areas, and downed lines.
  - **👁️ MONITOR**: Physical gauges and official radio/siren alerts.

- **Screen 5 — Safe Options & Map**:
  - Verified nearby sanctuaries with distances, live status (*Open* / *Available*), and high-ground elevations.
  - **"VIEW ON MAP"** button: Opens an interactive citizen safety map showing user location, hazard area buffer, safe shelters, hospitals, and recommended evacuation corridor direction.

- **Screen 6 — Ask ResQ**:
  - *"Still have questions? Ask ResQ about your situation."*
  - Quick-tap prompt chips: *"Should I evacuate?"*, *"Is my area safe?"*, *"What should I carry?"*, *"Where should I go?"*, *"What happens if conditions worsen?"*.
  - Contextual AI safety answers using current location, disaster, risk score, and shelters.
  - Intelligent local fallback for 100% offline reliability.

- **Screen 7 — Simple What-If Simulation**:
  - Interactive scenario slider (e.g. Rainfall $100\text{ mm} \rightarrow 180\text{ mm}$).
  - Side-by-side comparison: **Current Risk (62)** vs **Simulated Risk (89)**.
  - Causal explanation of why risk rises under severe conditions.

---

## 🎨 Visual Style & Aesthetics

- **Dark navy background** (`#060a12`, `#090e1a`, `#0d1527`)
- **Clean white typography** (Inter font, accessible hierarchy)
- **Subtle blue accents** (`#3b82f6` / `#0284c7`)
- **Severity-only colors**: Red/orange/yellow/green reserved strictly for risk severity
- **Lots of whitespace**, rounded corners, calm, trustworthy emergency aesthetic
- **Mobile-first responsive design** for phones, tablets, and desktop

---

## ⚡ Technical Stack

- **React 18** + **Vite 5**
- **Vanilla CSS / Custom Design System** (`src/styles/citizen.css`)
- **Lucide React Icons** (`lucide-react`)
- **Local Transparent Risk Engine** (`src/services/riskEngine.js`)
- **Local AI Safety Assistant Service** (`src/services/aiSafetyAssistant.js`)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

Open `http://localhost:5173/` in your browser.

---

## ⚠️ Prototype Disclosure

> **ResQ is a prototype using simulated disaster data for demonstration purposes. It does not provide official emergency warnings or replace local emergency authorities.** In a life-threatening situation, always dial 911 or 112 directly.
