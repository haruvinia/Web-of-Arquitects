import { useState } from 'react';
import { AboutSection, MissionSection } from '../components/AboutSections';
import ContactForm from '../components/ContactForm';
import { ActionLink, PageTitle, Pagination, Photo } from '../components/UI';

const slides = [
  {
    name: 'Lorum',
    image: 'hero',
    id: '1',
    alt: 'White contemporary building against a pale blue sky',
  },
  {
    name: 'Sample Project 2',
    image: 'project-2',
    id: '2',
    alt: 'Modern office with lounge seating and a staircase',
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const current = slides[slide];
  return (
    <div className="container home">
      <section className="hero" aria-label="Featured projects">
        <div className="hero-copy">
          <PageTitle light="PROJECT" bold={current.name} />
          <Pagination
            className="hero-pagination"
            current={slide + 1}
            total={slides.length}
            wrap
            onPrevious={() => setSlide((slide + slides.length - 1) % slides.length)}
            onNext={() => setSlide((slide + 1) % slides.length)}
          />
        </div>
        <div className="hero-image">
          <Photo name={current.image} alt={current.alt} eager />
          <ActionLink to={`/projetos/${current.id}`}>View Project</ActionLink>
        </div>
      </section>
      <AboutSection />
      <MissionSection />
      <section className="featured-projects" aria-labelledby="projects-title">
        <h2 id="projects-title" className="section-title">
          Our Projects
        </h2>
        <div className="project-mosaic">
          <LinkTile name="featured-1" id="1" alt="Architectural project preview" featured />
          <LinkTile name="featured-2" id="2" alt="Illuminated circular building at dusk" />
          <LinkTile name="featured-3" id="3" alt="Aerial view of a sports complex" />
          <LinkTile
            name="featured-4"
            id="1"
            alt="Residential buildings with a landscaped courtyard"
          />
          <LinkTile name="featured-5" id="2" alt="Monument with a sweeping arch" />
        </div>
        <div className="projects-action">
          <ActionLink to="/projetos" dark>
            All Projects
          </ActionLink>
        </div>
      </section>
      <section id="contact-form" className="home-contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className="section-title">
          Contact Us
        </h2>
        <div className="contact-grid">
          <ContactForm />
          <Photo name="contact-person" alt="Man speaking on a mobile phone" />
        </div>
      </section>
    </div>
  );
}

function LinkTile({ name, id, alt, featured = false }) {
  return (
    <ActionLink
      to={`/projetos/${id}`}
      className={`project-tile ${featured ? 'project-tile-featured' : ''}`}
      arrow={false}
    >
      <Photo name={name} alt={alt} />
      {featured ? (
        <span className="sr-only">Sample Project — View More</span>
      ) : (
        <span className="sr-only">View project {id}</span>
      )}
    </ActionLink>
  );
}
