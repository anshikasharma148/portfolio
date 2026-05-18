import React, { useState } from "react";

const initialState = { name: "", email: "", message: "" };

const WEB3_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

/** FormSubmit inbox when not using Web3Forms. Override with VITE_CONTACT_EMAIL. */
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "its.anshika12003@gmail.com";

const FORMSUBMIT_POST = `https://formsubmit.co/${encodeURIComponent(CONTACT_EMAIL)}`;

/**
 * FormSubmit’s /ajax JSON API blocks cross-origin fetch from many hosts (CORS).
 * Classic POST navigates like a normal form — no CORS — so we open it in a new tab.
 */
function postToFormSubmit({ name, email, message, subject, gotcha }) {
  const f = document.createElement("form");
  f.action = FORMSUBMIT_POST;
  f.method = "POST";
  f.target = "_blank";
  f.setAttribute("rel", "noopener noreferrer");
  f.setAttribute("accept-charset", "UTF-8");

  const add = (fieldName, value) => {
    const i = document.createElement("input");
    i.type = "hidden";
    i.name = fieldName;
    i.value = value ?? "";
    f.appendChild(i);
  };

  add("name", name);
  add("email", email);
  add("message", message);
  add("_subject", subject);
  add("_gotcha", gotcha);
  add("_captcha", "false");

  document.body.appendChild(f);
  f.submit();
  document.body.removeChild(f);
}

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

    const subject = `Portfolio contact from ${form.name}`;

    if (WEB3_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3_KEY,
            name: form.name,
            email: form.email,
            message: form.message,
            subject,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (data.success) {
          setResult({ success: true, message: "Message sent successfully!" });
          setForm(initialState);
          setHoneypot("");
        } else {
          setResult({
            success: false,
            message:
              (typeof data.message === "string" && data.message) ||
              "Could not send. Check your Web3Forms key or use the email link below.",
          });
        }
      } catch {
        setResult({ success: false, message: "Network error. Please try again." });
      }
      setLoading(false);
      return;
    }

    try {
      postToFormSubmit({
        name: form.name,
        email: form.email,
        message: form.message,
        subject,
        gotcha: honeypot,
      });
      setResult({
        success: true,
        message:
          "Your message was sent. A new tab may open with FormSubmit’s confirmation — you can close it. You should get the email shortly.",
      });
      setForm(initialState);
      setHoneypot("");
    } catch {
      setResult({
        success: false,
        message: "Could not open the submit window. Try again or use the email link below.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-label">GET IN TOUCH</div>
        <h2 className="contact-title">
          Contact<span className="section-accent"></span>
        </h2>
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
