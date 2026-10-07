import { description, projects } from '../data';
import { ActionLink, PageTitle, Pagination, Photo } from '../components/UI';

export default function Projects() {
  return (
    <div className="container inner-page projects-page">
      <PageTitle light="Our" bold="Projects" />
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <Photo name={project.image} alt={project.alt} eager={project.id === '1'} />
            <div className="project-card-copy">
              <h2>{project.title}</h2>
              <p>{description}</p>
              <ActionLink to={`/projetos/${project.id}`}>View More</ActionLink>
            </div>
          </article>
        ))}
      </div>
      <Pagination />
    </div>
  );
}
