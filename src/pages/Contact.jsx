import { contact } from '../data';
import { ActionLink, PageTitle, Photo } from '../components/UI';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-information">
        <PageTitle light="Contact" bold="Information" />
        <address>
          <div>
            <strong>{contact.company}</strong>
            <span>{contact.address}</span>
          </div>
          <a className="contact-phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </address>
        <ActionLink to="/#contact-form" dark arrow={false}>
          Contact Us
        </ActionLink>
      </div>
      <Photo
        name="map"
        alt="Map of central Austin, showing the project location near downtown"
        className="contact-map"
        eager
      />
    </div>
  );
}
