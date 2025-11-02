import React, { useState } from "react";

const initial = {
  team: "",
  drivetrainType: "Tank",
  weight: "",
  height: "",
  canPickupFromGround: false,
  canPickupFromBarge: false,
  canPickupFromProcessor: false,
  maxReachHeight: "",
  autoCapabilities: "",
  preferredStartingPosition: "Left",
  notes: "",
  timestamp: ""
};

export default function PitScoutForm({ onSubmit }) {
  const [form, setForm] = useState(initial);

  function update(e) {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setForm(f => ({ ...f, [name]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const entry = {
      ...form,
      team: String(form.team).trim(),
      timestamp: new Date().toISOString(),
    };
    if (!entry.team) {
      alert("Please fill Team number");
      return;
    }
    if (typeof onSubmit === "function") onSubmit(entry);
    setForm(initial);
  }

  return (
    <form className="scout-form" onSubmit={submit}>
      <h3 style={{ margin: "0 0 12px" }}>Pit Scout Entry</h3>

      <div className="row">
        <label>
          Team Number
          <input name="team" value={form.team} onChange={update} placeholder="2583" />
        </label>
        <label>
          Drivetrain Type
          <select name="drivetrainType" value={form.drivetrainType} onChange={update}>
            <option>Tank</option>
            <option>Swerve</option>
            <option>Mecanum</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <div className="row">
        <label>
          Weight (lbs)
          <input type="number" name="weight" value={form.weight} onChange={update} min="0" step="0.1" />
        </label>
        <label>
          Height (inches)
          <input type="number" name="height" value={form.height} onChange={update} min="0" step="0.1" />
        </label>
        <label>
          Max Reach Height (inches)
          <input type="number" name="maxReachHeight" value={form.maxReachHeight} onChange={update} min="0" step="0.1" />
        </label>
      </div>

      <fieldset style={{ marginBottom: 8, padding: 8 }}>
        <legend style={{ fontWeight: 600 }}>Capabilities</legend>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" name="canPickupFromGround" checked={form.canPickupFromGround} onChange={update} />
            Can pickup from ground
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" name="canPickupFromBarge" checked={form.canPickupFromBarge} onChange={update} />
            Can pickup from barge
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" name="canPickupFromProcessor" checked={form.canPickupFromProcessor} onChange={update} />
            Can pickup from processor
          </label>
        </div>
      </fieldset>

      <div className="row">
        <label>
          Preferred Starting Position
          <select name="preferredStartingPosition" value={form.preferredStartingPosition} onChange={update}>
            <option>Left</option>
            <option>Middle</option>
            <option>Right</option>
          </select>
        </label>
        <label style={{ flex: 1 }}>
          Auto Capabilities
          <input name="autoCapabilities" value={form.autoCapabilities} onChange={update} placeholder="Describe autonomous capabilities..." />
        </label>
      </div>

      <div className="row">
        <label style={{ flex: 1 }}>
          Additional Notes
          <input name="notes" value={form.notes} onChange={update} placeholder="Add notes here" />
        </label>
      </div>

      <div className="actions" style={{ marginTop: 8 }}>
        <button type="submit" className="primary">Save</button>
      </div>
    </form>
  );
}