# Event Explorer App

A robust, lightweight React Native application for browsing events and managing a local interest list. Built with **React Native (CLI)**, **TypeScript**, **Zustand**, and **Styled Components**.

## 📋 Prerequisites

- Node.js (>= 20)
- Watchman
- **iOS:** Xcode & CocoaPods (Mac only)
- **Android:** Android Studio & JDK 17
- **Ruby/Bundler:** (For managing iOS Pods via `bundle exec`)

---

## 🚀 Setup & Installation

### 1. Install Dependencies

Clone the repository and install the packages:

```bash
yarn
```

or

```bash
npm install
```

### 2. iOS Setup

```bash
cd ios
```

Install Ruby gems (if Gemfile exists) or just run pod install directly

```bash
bundle install
bundle exec pod install
cd ..
```

### 3. Android Setup

Ensure you have the required SDKs and JDK installed. Configure your `ANDROID_HOME` environment variable.

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Running the App

The app requires a mock API server. You can use `json-server` or any similar tool to serve mock event data.
Start the mock API server (ensure you have a events.json with event data)

```bash
npx json-server events.json --port 3000
```

Then, run the app on your desired platform:

```bash
# For iOS
npx react-native run-ios
# For Android
npx react-native run-android
```

---

## 🧪 Testing

Run unit tests using Jest:

```bash
yarn test
```

---

## 📁 Project Structure

- `src/components/`: Reusable UI components (EventCard, SearchBar).
- `src/screens/`: Main screens (EventListScreen, InterestedEventsScreen).
- `src/store/`: Zustand store for state management.
- `src/api/`: API interaction logic.
- `src/theme/`: Theming and styled-components setup.
- `__tests__/`: Unit tests for components and store.

---

## 🛠️ Technical Decisions & Assumptions

### State Management (Zustand + MMKV)

- **Zustand** chosen for its minimal boilerplate and lightweight bundle size over Redux
- **MMKV** integrated for synchronous, high-performance persistence—eliminates loading flashes on app launch
- **Offline-First Architecture**: Interested events stored as complete objects (not IDs) enabling offline viewing without API dependency

### Performance Optimizations

- **List Rendering**: Extensive use of `useCallback` and `useMemo` for FlatList renderers and key extractors to prevent unnecessary re-renders
- **Pagination**: Separated pull-to-refresh and infinite scroll states to eliminate UI glitches
- **Search**: Client-side filtering for instant feedback with manageable datasets

### Navigation Architecture

- **Nested Strategy**: Root `NativeStackNavigator` for global header/details + `MaterialTopTabNavigator` for tab content maintains consistent UI
- **Platform Specifics**: Dynamic Android Navigation Bar theming prevents white bar issues in dark mode

### Theming

- Custom `useThemeStore` detects system appearance on first launch while persisting user preferences
- `styled-components` enables centralized color management across light/dark modes

---

## ⏱️ Time Taken & Future Improvements

**Time Invested:** ~4-5 hours (scaffolding, library setup, core features, platform debugging, unit tests)

### With Additional Time, I Would Add:

**Enhanced UI/UX**

- Shared element transitions for event images (list → detail navigation)
- Micro-animations for "Interested" toggle interactions
- Refined brand identity with custom color palette and typography

**Robust Error Handling**

- Non-intrusive toast notifications replacing standard alerts and console error logs
- Skeleton loader shimmer effects instead of generic spinners

**Comprehensive Testing**

- Integration tests with `react-native-testing-library` for screen interactions
- E2E automation (Maestro/Detox) for critical user flows (browse → search → save → view)

**Feature Enhancements**

- Deep linking support for shareable event URLs
