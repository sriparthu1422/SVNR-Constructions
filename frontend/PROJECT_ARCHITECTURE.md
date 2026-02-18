<!-- @format -->

# SVNR Constructions - Project Architecture Guide

## 1. Project Overview

**Name:** SVNR Constructions Website  
**Type:** Production-grade Real Estate Landing Page  
**Tech Stack:** React (Vite), Tailwind CSS v4, Framer Motion, React Router v7.  
**Design Philosophy:** Dark-themed, premium aesthetic with "Reveal on Scroll" navigation and immersive interactions.

---

## 2. Full Folder Structure (Tree View)

This structure represents the actual organization of your files on disk.

```text
SVNR Constructions/
├── public/                  # Static assets (favicons, manifest)
├── src/
│   ├── assets/              # Imported media (optimized by Vite)
│   ├── components/          # Reusable UI Blocks
│   │   ├── AboutSection.jsx       # "About Us" block for Home page
│   │   ├── BookSiteVisitModal.jsx # The Booking Popup Form
│   │   ├── Footer.jsx             # Site-wide Footer
│   │   ├── FoundersSection.jsx    # "Leadership" block
│   │   ├── HeroSection.jsx        # Top Banner with video/image
│   │   ├── Navbar.jsx             # Smart Sticky Navigation
│   │   ├── ProjectSlider.jsx      # Horizontal Scroll Project showcase
│   │   ├── StatsSection.jsx       # "Numbers" block (years, projects)
│   │   └── TestimonialsSlider.jsx # Customer reviews carousel
│   ├── pages/               # Route-Specific Views
│   │   ├── About.jsx              # /about-us page
│   │   ├── CompletedProjects.jsx  # /completed-projects Grid Gallery
│   │   ├── Contact.jsx            # /contact (Locations List + Map)
│   │   ├── ExploreVR.jsx          # /explore-vr Landing
│   │   ├── Home.jsx               # / (Main Landing Page)
│   │   ├── News.jsx               # /news List
│   │   └── OngoingProjects.jsx    # /ongoing-projects List
│   ├── App.jsx              # Global Layout & Routing Configuration
│   ├── main.jsx             # React Entry Point
│   └── index.css            # Tailwind & Global Styles
└── vite.config.js           # Build Tool Configuration
```

---

## 3. Core Architecture Concepts

### A. Routing & Navigation

- **Library:** `react-router-dom` (v7)
- **Definition:** All routes are defined in `src/App.jsx` inside the `<Routes>` container.
- **Linking:** We use `<Link to="/path">` instead of `<a href="/path">` to prevent page reloads (SPA behavior).
- **Scroll Management:** A custom `<ScrollToTop />` component in `App.jsx` ensures that when you change pages, the window scrolls back to the top automatically.

### B. State Management Strategy

The app uses **"Lifted State"** for the global features and **"Local State"** for component-specific logic.

| State                                | Lives In                 | Controlled By          | Purpose                                                                         |
| :----------------------------------- | :----------------------- | :--------------------- | :------------------------------------------------------------------------------ |
| **Modal Visibility** (`isModalOpen`) | `App.jsx` (Global)       | `useState`             | Allows `Navbar` to open the modal, but the `Modal` to sit on top of everything. |
| **Form Data** (`formData`)           | `BookSiteVisitModal.jsx` | `useState`             | Tracks user input (name, phone, etc.) temporarily before submit.                |
| **Navbar Visibility** (`isVisible`)  | `Navbar.jsx`             | `IntersectionObserver` | Detects scroll position to hide/show the navbar dynamically.                    |
| **Mobile Menu** (`isMobileMenuOpen`) | `Navbar.jsx`             | `useState`             | Toggles the hamburger menu on small screens.                                    |

### C. Component Patterns

1.  **Container Components (`src/pages/`)**:
    - These act as "glue." They don't have much complex styling.
    - _Example (`Home.jsx`)_: It imports `HeroSection`, `AboutSection`, etc., and stacks them. It holds the data (lists of projects) and passes it down.
2.  **Presentational Components (`src/components/`)**:
    - Focus on "How it looks."
    - _Example (`Footer.jsx`)_: Pure static content, grids, and links.
3.  **Interactive Components**:
    - Focus on "How it acts."
    - _Example (`Navbar.jsx`)_: Manages scroll listeners and mobile toggles.

---

## 4. Key File Breakdowns

### `src/App.jsx` (The Brain)

- **Role**: Orchestrates the entire application.
- **Key Logic**:
    - Holds the `isModalOpen` state.
    - Passes `openModal` function to `Navbar` (so the button works).
    - Passes `isOpen` and `onClose` to `BookSiteVisitModal` (so it shows up).
    - Wraps everything in `<BrowserRouter>` for routing.

### `src/components/Navbar.jsx` (The Navigator)

- **Role**: Sticky top bar.
- **Special Logic**: **Scroll Detection**. It monitors the "Home" section.
    - _If User is at top_: Navbar is hidden (to let Hero shine).
    - _If User scrolls down_: Navbar slides in `translate-y-0`.
    - _If User is on inner pages_: Navbar is always visible.

### `src/components/BookSiteVisitModal.jsx` (The Form)

- **Role**: Lead capture form.
- **Features**:
    - **Animation**: Uses `AnimatePresence` from `framer-motion` for smooth fade-in/out.
    - **Backdrop**: Clicking the dark background closes the modal.
    - **Form**: Standard React Controlled Inputs. Updates `formData` object on every keystroke.

### `src/pages/Contact.jsx` (The Directory)

- **Correction**: Unlike many sites, this uses **Locations Cards** rather than a contact form (since the form is in the Modal).
- **Features**:
    - **Google Maps**: Embeds a map iframe.
    - **Styling Trick**: Applies `filter: grayscale(100%) invert(92%)...` to the map to force it into "Dark Mode" to match the site theme.

---

## 5. Styling Architecture (Tailwind CS v4)

- **Configuration**: Setup via CSS imports in `src/index.css` (`@import "tailwindcss";`).
- **Theme**:
    - **Colors**: Black (`bg-black`), Dark Grey (`bg-stone-900`), and Gold (`text-yellow-500`).
    - **Fonts**: 'Outfit' (sans-serif) tied to root variables.
- **Responsive Approach**: Mobile-First.
    - `<div className="grid grid-cols-1 md:grid-cols-2">`
    - _Translation_: "Use 1 column by default (Mobile). If screen >= 768px (Tablet/Desktop), use 2 columns."

---

## 6. How to Study This Code (Step-by-Step Path)

1.  **Start at `src/App.jsx`**: Understand how the `Navbar`, `Routes`, and `Modal` are wired together.
2.  **Move to `src/index.css`**: See the global variables and Tailwind setup.
3.  **Check `src/components/Navbar.jsx`**: Focus on the `IntersectionObserver` logic—this is the most complex logic in the app.
4.  **Examine `src/pages/Home.jsx`**: See how it simply imports other components to build a page.
5.  **Study `src/components/BookSiteVisitModal.jsx`**: Learn how form state (`formData`) is handled.
6.  **Review `src/pages/Contact.jsx`**: Look at how the Map styling is hacked using CSS filters.

## 7. Missing Implementations / Next Steps

- **Contact Page Buttons**: The "Site Visit" buttons on the `Contact` page cards are currently visual-only. They need to be connected to the `openModal` function (requires lifting state or Context).
- **Image Optimization**: Images are currently high-res Unsplash URLs. For production, these should be optimized/compressed.
- **Form Backend**: The `handleSubmit` in the Modal currently uses `setTimeout` to mimic a server. You will need to connect this to an actual API/Backend later.
