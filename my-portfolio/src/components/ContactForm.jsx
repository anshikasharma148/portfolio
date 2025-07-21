import React, { useState } from "react";

const initialState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://portfolio-jc0r.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setResult({ success: true, message: "Message sent successfully!" });
        setForm(initialState);
      } else {
        const data = await res.json();
        setResult({ success: false, message: data.error || "Failed to send message." });
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-label">GET IN TOUCH</div>
        <h2 className="contact-title">Contact<span className="section-dot"></span></h2>
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
      </form>
    </div>
  );
} 