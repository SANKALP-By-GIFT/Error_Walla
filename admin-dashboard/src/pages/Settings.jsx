/*
Settings page allows user preferences.
This simulates real admin settings.
*/

function Settings() {

  return (

    <div>

      <h1>Settings</h1>

      <div style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>

        <h3>Preferences</h3>

        <div style={{ marginTop: "10px" }}>

          <label>

            <input type="checkbox" />

            Enable Notifications

          </label>

        </div>

        <div style={{ marginTop: "10px" }}>

          <label>

            <input type="checkbox" />

            Enable Dark Mode

          </label>

        </div>

        <div style={{ marginTop: "10px" }}>

          <label>

            <input type="checkbox" />

            Email Alerts

          </label>

        </div>

      </div>

    </div>

  );

}

export default Settings;
