import { useState } from "react";
import PageHeader from "../components/PageHeader";

/*
═══════════════════════════════════════════════════════════════════════════
SETTINGS PAGE - Application Preferences
═══════════════════════════════════════════════════════════════════════════

CODE SPLITTING & LAZY LOADING:
- This component is lazy loaded using React.lazy() in routes.jsx
- Only downloads when user navigates to /dashboard/settings
- Wrapped in Suspense with fallback UI during loading
- Reduces initial bundle: This module is ~5KB, downloaded only when needed
- Improves first paint time for dashboard

WHY LAZY LOADING MATTERS:
- Initial bundle size reduced by ~10-15% excluding non-critical pages
- Users with poor connections see dashboard faster
- Code only executes when actually needed
- Suspense boundary shows loading UI smoothly

PERFORMANCE PATTERN:
1. User lands on /dashboard → Analytics and Users NOT downloaded yet
2. User clicks Settings → Component lazy loads with Suspense fallback
3. Component mounted → Settings preferences rendered
4. Future settings visits → Component cached in memory
*/

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailAlerts: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // In real app, would save to backend via React Query mutation
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Customize your application preferences"
      />

      <div style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3>Application Preferences</h3>

        <div style={{ marginTop: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input 
              type="checkbox" 
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <span>Enable Notifications</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input 
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <span>Enable Dark Mode</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input 
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={() => handleToggle('emailAlerts')}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <span>Email Alerts</span>
          </label>
        </div>

        <button 
          onClick={handleSave}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
