import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const EMAIL = "its.anshika12003@gmail.com";
const PHONE = "+91 8707657707";
const PHONE_HREF = "tel:+918707657707";

export default function ContactDetails() {
  return (
    <div className="contact-details glass-panel">
      <div className="contact-label">GET IN TOUCH</div>
      <h2 className="contact-title">
        Contact<span className="section-accent"></span>
      </h2>

      <ul className="contact-details-list">
        <li>
          <Mail className="contact-details-icon" strokeWidth={1.5} size={22} aria-hidden />
          <div>
            <span className="contact-details-label">Email</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </li>
        <li>
          <Phone className="contact-details-icon" strokeWidth={1.5} size={22} aria-hidden />
          <div>
            <span className="contact-details-label">Phone</span>
            <a href={PHONE_HREF}>{PHONE}</a>
          </div>
        </li>
        <li>
          <MapPin className="contact-details-icon" strokeWidth={1.5} size={22} aria-hidden />
          <div>
            <span className="contact-details-label">Correspondence address</span>
            <p>Guna, Madhya Pradesh</p>
          </div>
        </li>
        <li>
          <MapPin className="contact-details-icon" strokeWidth={1.5} size={22} aria-hidden />
          <div>
            <span className="contact-details-label">Permanent address</span>
            <p>M.I.G-47 Barra-6 Janta Nagar, Kanpur Nagar, 208027</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
