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

const SUCCESS_MESSAGE =
  "Thanks — this MVP form is not connected yet, but the waitlist workflow is planned.";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="waitlistSection"
      id="waitlist"
      aria-labelledby="waitlist-title"
    >
      <div className="waitlistPanel">
        <div className="waitlistHeader">
          <div>
            <p className="sectionLabel">Early access</p>
            <h2 id="waitlist-title">Join the DMV driver waitlist</h2>
            <p className="waitlistIntro">
              Get notified when live data, daily digests, and new intelligence
              modules launch. Built for rideshare, delivery, and professional
              drivers across the DMV.
            </p>
          </div>
          <span className="intelStatus intelStatus--preview">UI preview</span>
        </div>

        <p className="waitlistNote" role="note">
          <strong>Frontend-only MVP preview. No data is stored yet.</strong>
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
            <div className="waitlistFields">
              <label className="waitlistField" htmlFor="waitlist-name">
                <span>Name</span>
                <input
                  id="waitlist-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="waitlistField" htmlFor="waitlist-email">
                <span>Email</span>
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="waitlistField" htmlFor="waitlist-driver-type">
                <span>Driver type</span>
                <select
                  id="waitlist-driver-type"
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
            </div>

            <button className="btn btnPrimaryDark" type="submit">
              Join waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
