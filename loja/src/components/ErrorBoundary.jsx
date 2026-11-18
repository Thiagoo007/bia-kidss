import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="page page--narrow">
        <h1 className="h2">Algo não carregou.</h1>
        <p className="page__sub">Atualize a página para tentar de novo. Sua sacola continua guardada.</p>
        <button type="button" className="btn btn--solid" onClick={() => window.location.reload()}>Atualizar</button>
      </div>
    );
  }
}
