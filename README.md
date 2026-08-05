# 🔒 HonestStudy

A lightweight, offline-first student performance dashboard. Track test scores, study time, and syllabus progress — all stored locally in your browser, no backend or account required.

## Features

- **📊 Grade Book** — Log test scores and see your overall average update in real time
- **📈 Performance Trend Chart** — Visualize score history over time with Chart.js
- **⏱️ Focus Engine** — A simple stopwatch to track study sessions, with full session history
- **📅 Syllabus Tracker** — Checklist for chapters remaining per subject
- **🎯 Target Predictor** — Enter a goal grade and see exactly how far off your current average is
- **📥📤 Backup / Restore** — Export your data to a JSON file, or import it back in (handy for switching devices or just not losing everything)

## Getting Started

No install, no build step — it's plain HTML/CSS/JS.

1. Clone the repo:
   ```bash
   git clone https://github.com/jackcodelab/HonestStudyV1.git
   ```
2. Open `index.html` in your browser.

That's it. Your data is saved to `localStorage`, so it persists between visits on the same browser/device.

> **Tip:** Use the Export Backup button regularly if you want your data to survive a browser cache clear or move between devices.

## Project Structure

```
HonestStudyV1/
├── index.html              # Main dashboard markup
├── style.css                # Styling
└── modules/
    ├── storage.js            # App state, localStorage read/write, tab logic
    ├── predictor.js           # Target grade gap calculator
    └── components/
        ├── gradebook.js        # Test score logging + trend chart
        ├── stopwatch.js         # Focus timer + session history
        └── syllabus.js           # Chapter checklist tracker
```

Built with a native ES6 module architecture — each feature lives in its own file and communicates through explicit imports/exports from `storage.js`, which acts as the single source of truth for app state.

## Tech Stack

- Vanilla JavaScript (ES6 modules, no framework)
- [Chart.js](https://www.chartjs.org/) for the performance trend graph
- Browser `localStorage` for persistence

## Roadmap / Ideas

- [ ] Per-subject grade averages (currently one overall average)
- [ ] Edit existing grade entries (currently add/remove only)
- [ ] Weekly study-time goals on the Focus tab

## License

Personal project — no license specified yet.
