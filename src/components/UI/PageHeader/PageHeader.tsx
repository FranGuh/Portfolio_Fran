import './PageHeader.css';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <header className="PageHeader">
      <div className="PageHeader__content">
        {eyebrow && <p className="PageHeader__eyebrow">{eyebrow}</p>}
        <h1 className="PageHeader__title">{title}</h1>
        {description && <p className="PageHeader__description">{description}</p>}
      </div>
    </header>
  );
};

export default PageHeader;
