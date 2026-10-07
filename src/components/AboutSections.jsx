import { aboutDescription } from '../data';
import { ActionLink, Photo } from './UI';

export function AboutSection({ showLink = true }) {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="about-photos">
        <div>
          <Photo name="about-1" alt="Geometric glass building facade" />
          <Photo name="about-2" alt="Architectural detail of metal structural beams" />
        </div>
        <Photo name="about-3" alt="Glass facade rising against a clear sky" />
      </div>
      <div className="about-copy">
        <h2 id="about-title" className="section-title">
          About
        </h2>
        <p>{aboutDescription}</p>
        {showLink && <ActionLink to="/sobre">Read More</ActionLink>}
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="mission-section" aria-labelledby="mission-title">
      <h2 id="mission-title" className="section-title">
        Main Focus/Mission Statement
      </h2>
      <div className="mission-items">
        <div>
          <span aria-hidden="true">1</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Sed efficitur, lectus et facilisis placerat.
          </p>
        </div>
        <div>
          <span aria-hidden="true">2</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur, lectus et
            facilisis placerat, magna mauris porttitor tortor, a auctor est felis ut nisl.
          </p>
        </div>
      </div>
    </section>
  );
}
