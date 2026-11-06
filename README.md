# SignatureCraft - Enterprise Email Signature Generator

A modern, high-precision, enterprise-grade email signature management and live preview studio. Built with React 19, TypeScript, Tailwind CSS, and Firebase Authentication & Firestore. Designed to create, brand-align, and deploy email-safe signatures that render with 100% fidelity across Gmail, Microsoft Outlook (Desktop & Web), Apple Mail (macOS & iOS), and Thunderbird.

---

## 🚀 Main Features

- **5 Professional Archetypes**:
  - **Classic Corporate**: Vertical accent bar & side-by-side portrait layout.
  - **Modern Minimal**: Clean horizontal hierarchy with compact contact bar.
  - **Brand & Logo**: Dual personal photo + corporate logo emblem.
  - **Photo + Social**: Prominent circular avatar with dedicated 16-platform badge strip.
  - **Executive Suite**: Refined serif typography, dual contact columns, and legal notices.
- **Universal Email Client Compatibility**:
  - Generates email-safe nested HTML table markup with inline CSS to prevent Microsoft Word (Outlook) and Gmail rendering engine displacement.
  - Multi-browser verified across Chrome, Safari, Firefox, Edge, iOS, and Android.
- **Multi-Screen Studio Experience**:
  - **Signature Editor**: Split-pane live WYSIWYG editor with live simulated email window.
  - **Templates Library**: Archetype showcase with 1-click sample executive personas (*Sales Director*, *CTO*, *Managing Legal Counsel*).
  - **Live Preview & Export**: Visual simulation stage, raw inline HTML code viewer, and client compatibility audit report.
  - **Help & Documentation**: Step-by-step installation guides for Gmail, Outlook 365, Outlook Desktop, and Apple Mail.
- **Firebase Authentication & Cloud Sync**:
  - Secure Google Sign-In via Firebase Auth.
  - Cloud Firestore storage for saving, managing, and syncing signatures across workstations.
  - Zero-Trust Firestore Security Rules (`firestore.rules`) enforcing strict user data isolation.
- **Production Export Pipeline**:
  - **Copy to Clipboard**: 4-Tier resilient clipboard engine supporting modern ClipboardItem API, Safari Promise handling, and contentEditable DOM fallback.
  - **Download .HTML**: Self-contained standalone HTML signature file.
  - **Download .DOCX**: Word-compatible XML document for native Outlook desktop signature managers.
  - **Print / PDF**: Formatted print preview dialog.
  - **Raw HTML Viewer**: Instant modal to view and copy generated inline HTML.
- **Workstation Auto-Save**:
  - Dual persistence strategy: local workstation auto-save (localStorage) and cloud synchronization (Firestore).

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Cloud Firestore)
- **Icons & Typography**: Google Material Symbols Outlined & Inter Font
- **Animations**: [Motion](https://motion.dev/)

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** or **yarn**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Available variables:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | (Optional) Gemini API Key for server-side capabilities | None |
| `APP_URL` | Application hosting URL | `http://localhost:3000` |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication domain | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_APP_ID` | Firebase Web App ID | Config from `firebase-applet-config.json` |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | Target Cloud Firestore Database ID | Config from `firebase-applet-config.json` |

---

## 📦 Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <REPOSITORY_FOLDER>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

To run type checking and linting:

```bash
npm run lint
```

---

## 📄 License & Copyright

copy rights reserved by Raja Vemuri @2026
