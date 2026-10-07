import { useState } from 'react';
import { contact } from '../data';
import { Arrow } from './UI';

export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = data.get('interest') || 'Architecture project enquiry';
    const body = `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nE-mail: ${data.get('email')}\nInterested in: ${data.get('interest')}\n\n${data.get('message')}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="contact-name">
        Name
      </label>
      <input id="contact-name" name="name" placeholder="Name" autoComplete="name" maxLength="120" />
      <label className="sr-only" htmlFor="contact-phone">
        Phone Number (required)
      </label>
      <input
        id="contact-phone"
        name="phone"
        placeholder="Phone Number*"
        type="tel"
        autoComplete="tel"
        required
        pattern={'(?=(?:\\D*\\d){6})[+0-9\\(\\) .\\-]{6,30}'}
        title="Enter a phone number with at least 6 digits and up to 30 characters, using digits, spaces, +, parentheses or hyphens."
      />
      <label className="sr-only" htmlFor="contact-email">
        E-mail (required)
      </label>
      <input
        id="contact-email"
        name="email"
        placeholder="E-mail*"
        type="email"
        autoComplete="email"
        required
        maxLength="254"
      />
      <label className="sr-only" htmlFor="contact-interest">
        Interested In
      </label>
      <input id="contact-interest" name="interest" placeholder="Interested In" maxLength="200" />
      <label className="sr-only" htmlFor="contact-message">
        Message (required)
      </label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Message*"
        required
        maxLength="5000"
      />
      <p className="form-note">
        Opens your email app with your message. Fields marked * are required.
      </p>
      <button className="action action-dark" type="submit">
        Send Email
        <Arrow />
      </button>
      {opened && (
        <p className="form-status" role="status">
          Please complete the send action in your email app. This website does not send email
          directly.
        </p>
      )}
    </form>
  );
}
