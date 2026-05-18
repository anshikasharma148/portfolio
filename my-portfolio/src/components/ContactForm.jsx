import React, { useState } from "react";

const initialState = { name: "", email: "", message: "" };

/** Inbox for FormSubmit (free tier, no backend). Override in .env with VITE_CONTACT_EMAIL if needed. */
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "its.anshika12003@gmail.com";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _gotcha: honeypot,
        }),
      });

      let data = {};
      const ct = res.headers.get("content-type");
      if (ct?.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          data = {};
        }
      }

      if (!res.ok) {
        const msg =
          (typeof data.message === "string" && data.message) ||
          (typeof data.error === "string" && data.error) ||
          `Could not send (${res.status}). Try the email link below.`;
        setResult({ success: false, message: msg });
        return;
      }

      if (ct?.includes("application/json")) {
        if (data.success === false || data.success === "false") {
          const msg =
            (typeof data.message === "string" && data.message) ||
            "Could not send your message. Try the email link below.";
          setResult({ success: false, message: msg });
          return;
        }
      }

      setResult({ success: true, message: "Message sent successfully!" });
      setForm(initialState);
      setHoneypot("");
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-label">GET IN TOUCH</div>
        <h2 className="contact-title">Contact<span className="section-accent"></span></h2>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="contact-form-honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
        <label>
          Your Name
          <input
            type="text"
            name="name"
            placeholder="What's your name?"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your Email
          <input
            type="email"
            name="email"
            placeholder="What's your email?"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your Message
          <textarea
            name="message"
            placeholder="What do you want to say?"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {result && (
          <div className={`contact-result ${result.success ? "success" : "error"}`}>
            {result.message}
          </div>
        )}
        <p className="contact-form-fallback">
          Prefer email?{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20inquiry`}>{CONTACT_EMAIL}</a>
        </p>
      </form>
    </div>
  );
} 