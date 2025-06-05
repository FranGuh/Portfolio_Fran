import './Loader.css'

interface LoaderProps {
  message?: string;
  visible?: boolean;
}

const Loader = ({ message = 'Cargando...', visible = true }: LoaderProps) => (
  <div className={`Loader__loading ${visible ? 'Loader__loading--visible' : ''}`}>
    <div className="Loader__spinner"></div>
    <p>{message}</p>
  </div>
);

export default Loader
