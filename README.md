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

```
yarn
```

or

```
npm install
```

### 2. iOS Setup

`cd ios`

Install Ruby gems (if Gemfile exists) or just run pod install directly

```
bundle install
bundle exec pod install
cd ..
```

### 3. Android Setup

Ensure you have the required SDKs and JDK installed. Configure your `ANDROID_HOME` environment variable.

```
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

🧪 Testing
Run unit tests using Jest:

```
yarn test
```

📁 Project Structure

- `src/components/`: Reusable UI components (EventCard, SearchBar).
- `src/screens/`: Main screens (EventListScreen, InterestedEventsScreen).
- `src/store/`: Zustand store for state management.
- `src/api/`: API interaction logic.
- `src/theme/`: Theming and styled-components setup.
- `__tests__/`: Unit tests for components and store.
