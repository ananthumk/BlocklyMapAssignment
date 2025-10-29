Vehicle Tracker App
A real-time vehicle tracking application built with React and Leaflet that visualizes vehicle routes on an interactive map with playback controls.
Features

Interactive map visualization using OpenStreetMap
Vehicle route playback with play/pause controls
Adjustable playback speed (5 speed levels)
View routes by different time periods (Today, Yesterday, This Week)
Real-time vehicle position tracking with rotation based on movement direction
Visual route display showing completed path and full route
Vehicle location popup with coordinates and progress information

Technologies Used

React 19
Leaflet for map rendering
React Leaflet for React integration
Tailwind CSS for styling
React Icons for UI icons
Vite for build tooling

Prerequisites

Node.js (version 14 or higher)
npm or yarn package manager

Installation

Clone the repository
Install dependencies:

bashnpm install

Create a dummy-route.json file in the public directory with the following structure:

json{
  "routes": {
    "today": [
      { "latitude": 11.2588, "longitude": 75.7804 },
      { "latitude": 11.2590, "longitude": 75.7806 }
    ],
    "yesterday": [],
    "week": []
  }
}
Running the Application
Start the development server:
bashnpm run dev
The application will be available at http://localhost:5173
Building for Production
Create a production build:
bashnpm run build
Preview the production build:
bashnpm run preview
```

## Usage

1. Select a time period from the dropdown menu (Today, Yesterday, This Week)
2. Adjust the playback speed using the speed control indicators
3. Click the Start button to begin route playback
4. Use Pause to stop playback at any point
5. Click Reset to return to the starting position
6. Click on the vehicle marker to view detailed location information

## Project Structure
```
src/
├── components/
│   ├── MapComponent.jsx    # Main map component with route logic
│   └── Bar.jsx             # Bottom control panel component
├── assets/
│   └── car.jpg
├── App.jsx                 # Root application component
└── App.css                 # Application styles
Configuration
The application uses OpenStreetMap tiles by default. You can modify the tile layer URL in the MapComponent.jsx file to use different map providers.
License
This project is private and not licensed for public use.RetryClaude can make mistakes. Please double-check responses.