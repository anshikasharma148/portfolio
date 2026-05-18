import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const EMAIL = "its.anshika12003@gmail.com";
const PHONE = "+91 8707657707";
const PHONE_HREF = "tel:+918707657707";

const ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>,
  },
  {
    icon: Phone,
    label: "Phone",
    value: <a href={PHONE_HREF}>{PHONE}</a>,
  },
  {
    icon: MapPin,
    label: "Correspondence address",
    value: <p>Guna, Madhya Pradesh</p>,
    wide: true,
  },
  {
    icon: MapPin,
    label: "Permanent address",
    value: <p>M.I.G-47 Barra-6 Janta Nagar, Kanpur Nagar, 208027</p>,
    wide: true,
  },
];

export default function ContactDetails() {
  return (
    <div className="contact-details glass-panel">
      <ul className="contact-details-grid">
        {ITEMS.map(({ icon: Icon, label, value, wide }) => (
          <li key={label} className={`contact-detail-item${wide ? " contact-detail-item--wide" : ""}`}>
            <span className="contact-detail-icon-wrap" aria-hidden>
              <Icon className="contact-detail-icon" strokeWidth={1.5} size={20} />
            </span>
            <div className="contact-detail-body">
              <span className="contact-detail-label">{label}</span>
              <div className="contact-detail-value">{value}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
