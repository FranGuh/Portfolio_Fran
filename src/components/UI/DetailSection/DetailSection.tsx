import ScrollableContainer from "../ScrollableContainer/ScrollableContainer";
import ImgContainer from "../ImgContainer/ImgContainer";
import "./DetailSection.css";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface ImgData {
  source: string;
  alt: string;
  title: string;
  href: string;
}

interface DetailSectionProps {
  backgroundImg: string;
  backgroundAlt: string;
  title: string;
  description: string;
  icons: IconComponent[];
  images: ImgData[];
  layout?: "left" | "right";
}

const DetailSection = ({
  backgroundImg,
  backgroundAlt,
  title,
  description,
  icons,
  images,
  layout = "right",
}: DetailSectionProps) => {
  return (
    <section className={`DetailSection DetailSection--${layout}`}>
      <div className="DetailSection__img-wrapper">
        <img
          src={backgroundImg}
          alt={backgroundAlt}
          className="DetailSection__img"
          loading="lazy"
        />
      </div>

      <div className="DetailSection__content-grid">
        {icons.map((Icon, index) => (
          <Icon key={index} />
        ))}
      </div>

      <div className="DetailSection__main">
        <div className="DetailSection__content">
          <h2 className="DetailSection__content-title">{title}</h2>
          <p className="DetailSection__content-text">{description}</p>
        </div>

        <div className="DetailSection__subcontent">
          <ScrollableContainer>
            {images.map((img, index) => (
              <ImgContainer
                key={index}
                source={img.source}
                alt={img.alt}
                title={img.title}
                href={img.href}
              />
            ))}
          </ScrollableContainer>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
