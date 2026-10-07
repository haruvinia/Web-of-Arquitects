import { AboutSection, MissionSection } from '../components/AboutSections';
import { PageTitle } from '../components/UI';

export default function About() {
  return (
    <div className="container inner-page about-page">
      <PageTitle light="Our Company" bold="About" />
      <AboutSection showLink={false} />
      <MissionSection />
    </div>
  );
}
