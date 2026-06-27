"use client";

import { useState } from "react";

const DRIVER_TYPES = [
  { value: "", label: "Select driver type" },
  { value: "rideshare", label: "Rideshare" },
  { value: "delivery", label: "Delivery" },
  { value: "uber-black-suv", label: "Uber Black / SUV" },
  { value: "private", label: "Private driver" },
  { value: "other", label: "Other" }
];

const USEFUL_FEATURES = [
  { value: "", label: "Select a feature" },
  { value: "daily-briefing", label: "Daily driver briefing" },
  { value: "weather", label: "Weather intelligence" },
  { value: "events", label: "Events intelligence" },
  { value: "airports", label: "Airport intelligence" },
  { value: "demand-zones", label: "Demand zones" },
  { value: "not-sure", label: "Not sure yet" },
  { value: "other", label: "Other" }
];

const WEEKLY_USE_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" }
];

const SUCCESS_MESSAGE =
  "Thanks — this MVP feedback form is not connected yet, but your feedback workflow is planned.";

export default function DriverFeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="waitlistSection"
      id="feedback"
      aria-labelledby="feedback-title"
    >
      <div className="waitlistPanel">
        <div className="waitlistHeader">
          <div>
            <p className="sectionLabel">Product validation</p>
            <h2 id="feedback-title">Share driver feedback on the MVP</h2>
            <p className="waitlistIntro">
              Help shape DriveRadarDMV for DMV rideshare, delivery, and
              professional drivers. Tell us what works, what is missing, and
              whether you would use this weekly.
            </p>
          </div>
          <span className="intelStatus intelStatus--preview">UI preview</span>
        </div>

        <p className="waitlistNote" role="note">
          <strong>Frontend-only MVP preview. No feedback is stored yet.</strong>
        </p>

        {submitted ? (
          <div className="waitlistSuccess" role="status">
            <p>{SUCCESS_MESSAGE}</p>
            <button
              className="btn btnSecondaryDark"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form className="waitlistForm" onSubmit={handleSubmit}>
            <div className="waitlistFields waitlistFields--feedback">
              <label className="waitlistField" htmlFor="feedback-driver-type">
                <span>Driver type</span>
                <select
                  id="feedback-driver-type"
                  name="driverType"
                  defaultValue=""
                  required
                >
                  {DRIVER_TYPES.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="waitlistField" htmlFor="feedback-driving-area">
                <span>Main driving area</span>
                <input
                  id="feedback-driving-area"
                  name="drivingArea"
                  type="text"
                  placeholder="e.g. Downtown DC, Arlington, Silver Spring"
                  required
                />
              </label>

              <label className="waitlistField" htmlFor="feedback-useful-feature">
                <span>Most useful feature</span>
                <select
                  id="feedback-useful-feature"
                  name="usefulFeature"
                  defaultValue=""
                  required
                >
                  {USEFUL_FEATURES.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="waitlistField waitlistField--full waitlistRadioFieldset">
                <legend>Would you use this weekly?</legend>
                <div className="waitlistRadioGroup">
                  {WEEKLY_USE_OPTIONS.map((option) => (
                    <label className="waitlistRadioOption" key={option.value}>
                      <input
                        type="radio"
                        name="weeklyUse"
                        value={option.value}
                        required
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label
                className="waitlistField waitlistField--full"
                htmlFor="feedback-missing"
              >
                <span>What is missing?</span>
                <textarea
                  id="feedback-missing"
                  name="missing"
                  rows={4}
                  placeholder="Features, data, or areas you wish were covered…"
                  required
                />
              </label>
            </div>

            <button className="btn btnPrimaryDark" type="submit">
              Send feedback
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
