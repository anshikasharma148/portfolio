import React, { useState } from "react";

const initialState = { name: "", email: "", message: "" };

const WEB3_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

/** Your inbox (mailto + Web3Forms default recipient). Override with VITE_CONTACT_EMAIL. */
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "its.anshika12003@gmail.com";

function buildMailtoHref({ name, email, message }) {
  const subject = `Portfolio contact from ${name}`;
  const body = `Portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens the visitor’s mail app — no third-party server, works when Web3Forms isn’t configured. */
function openMailtoCompose(href) {
  const a = document.createElement("a");
  a.href = href;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
            replyto: form.email,
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
              "Could not send. Check your Web3Forms key in Vercel, or use the email link below.",
          });
        }
      } catch {
        setResult({ success: false, message: "Network error. Please try again." });
      }
      setLoading(false);
      return;
    }

    openMailtoCompose(buildMailtoHref(form));
    setResult({
      success: true,
      message:
        "Your mail app should open with this message ready to send. Tap Send there to deliver it to me.",
    });
    setForm(initialState);
    setHoneypot("");
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-label">GET IN TOUCH</div>
        <h2 className="contact-title">
          Contact<span className="section-accent"></span>
        </h2>
        {!WEB3_KEY && (
          <p className="contact-form-note">
            Sends through your email app. For one-click send from this page, add a free{" "}
            <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
              Web3Forms
            </a>{" "}
            key as <code className="contact-form-code">VITE_WEB3FORMS_ACCESS_KEY</code> in
            Vercel and redeploy.
          </p>
        )}
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
          {loading ? "Sending..." : WEB3_KEY ? "Send" : "Send with your email app"}
        </button>
        {result && (
          <div className={`contact-result ${result.success ? "success" : "error"}`}>
            {result.message}
          </div>
        )}
        <p className="contact-form-fallback">
          Prefer a direct link?{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20inquiry`}>{CONTACT_EMAIL}</a>
        </p>
      </form>
    </div>
  );
}
