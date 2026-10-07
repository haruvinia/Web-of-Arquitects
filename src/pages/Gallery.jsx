import { galleryDescriptions } from '../data';
import { PageTitle, Pagination, Photo } from '../components/UI';

export default function Gallery() {
  return (
    <div className="container inner-page gallery-page">
      <PageTitle light="Photo" bold="Gallery" />
      <div className="gallery-grid">
        {galleryDescriptions.map((alt, index) => (
          <Photo key={alt} name={`gallery-${index + 1}`} alt={alt} eager={index < 5} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
