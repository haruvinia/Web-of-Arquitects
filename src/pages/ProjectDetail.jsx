import { Navigate, useParams } from 'react-router-dom';
import { detailDescription, projects } from '../data';
import { PageTitle, Photo } from '../components/UI';

export default function ProjectDetail() {
  const { id } = useParams();
  if (!projects.some((project) => project.id === id)) return <Navigate to="/" replace />;
  return (
    <div className="container inner-page detail-page">
      <PageTitle light="Sample" bold="Project 1" />
      <div className="project-detail">
        <Photo name="detail-main" alt="Office workspace with computers and chairs" eager />
        <div className="detail-description">
          <Photo name="detail-side" alt="Office interior with desks, lights and a staircase" />
          <p>{detailDescription}</p>
        </div>
        <Photo
          name="detail-plan"
          alt="Two architectural floor plans showing hexagonal office arrangements"
        />
      </div>
    </div>
  );
}
