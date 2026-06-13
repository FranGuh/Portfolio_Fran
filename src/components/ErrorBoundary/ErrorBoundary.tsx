import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render errors and failed lazy-chunk loads anywhere in the routed tree
 * and shows a recoverable fallback instead of unmounting to a blank page.
 * A stale chunk hash after a redeploy (common when a visitor keeps an old tab
 * open) is the most frequent trigger, so the primary action reloads the page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, info);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isEnglish =
      typeof document !== 'undefined' &&
      document.documentElement.lang.startsWith('en');

    const title = isEnglish ? 'Something went wrong' : 'Algo salió mal';
    const message = isEnglish
      ? 'The page failed to load. Reload to try again.'
      : 'La página no se pudo cargar. Recargá para volver a intentarlo.';
    const action = isEnglish ? 'Reload' : 'Recargar';

    return (
      <div role="alert" className="ErrorBoundary">
        <h1 className="ErrorBoundary__title">{title}</h1>
        <p className="ErrorBoundary__message">{message}</p>
        <button
          type="button"
          className="ErrorBoundary__button"
          onClick={this.handleReload}
        >
          {action}
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
