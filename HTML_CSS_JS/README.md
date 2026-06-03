# CommuniLink - Local Community Event Portal

A polished, responsive, and beginner-friendly web application built with vanilla HTML5, modern CSS3, and JavaScript (with jQuery integration). This portal allows users to browse neighborhood events, filter by categories, search by keywords, and RSVP using an asynchronous form validation flow.

This project is designed as a developer portfolio item, demonstrating clean code structure, key programming concepts, and interactive features.

## 🚀 Live Demo & Visuals

- **Modern UI:** Styled using a clean palette, custom typography (Inter font), smooth hover transitions, and responsive flex/grid layouts.
- **Dynamic Event Cards:** Cards automatically adapt to content and display real-time seating availability statuses.
- **Interactive CSS Sandbox:** Includes a visual playground to understand the core structural layout differences between `visibility: hidden` and `display: none`.

## 🛠️ Tech Stack & Concepts Demonstrated

### 1. Structure & Layout (HTML5 / CSS3)
- Semantic HTML elements (`nav`, `main`, `section`, `article`, `footer`).
- Responsive Web Design using CSS media queries.
- Flexbox layouts for modern navigation headers and dynamic grid elements.
- CSS outline and focus styles for accessibility, along with custom table zebra-striping.
- Newspaper column styling rules for community updates.

### 2. Frontend Logic (JavaScript)
- **Object-Oriented Programming:** Event models managed using JS Classes and Prototypes.
- **Closures:** Encapsulates state for the session registration counter to prevent global namespace pollution.
- **Callbacks:** Implements custom array filtering routines.
- **Promises & Async/Await:** Handles simulated asynchronous form validation and payload submission using the Fetch API (mocked via JSONPlaceholder).
- **DOM Manipulation:** Dynamically updates UI elements and event card displays.

### 3. jQuery Animations
- Smooth state transitions (`fadeIn`, `fadeOut`) for toggling element rendering behaviors.

## 📂 Project Structure

- `index.html` - The core webpage structure containing the grid panels, newsletter layout, RSVP form, and internal CSS example rules.
- `styles.css` - Custom styling declarations, including color systems, interactive states, responsive grids, and media queries.
- `main.js` - Dynamic rendering scripts, filtering hooks, form validation logic, and jQuery animation handlers.
- `help.html` - A user guide and help page that links dynamically back to the main portal.
- `events.json` - Sample mock dataset for backup event records.

## 💻 How to Run Locally

1. Clone or download this repository.
2. Open `index.html` directly in any web browser.
3. (Optional) Run the project using a simple local server (e.g. VS Code's **Live Server** extension, or by running `python -m http.server` in the directory) to test the mock network responses seamlessly.
