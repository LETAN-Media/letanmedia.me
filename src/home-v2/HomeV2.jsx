import React from 'react';
import Seo from '../components/Seo';
import PeachHeroClone from './PeachHeroClone';
import './home-v2.css';

class FishBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('[V2 Fish]', error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function HomeV2() {
  return (
    <div className="lmv2-clone-page">
      <Seo
        title="LETAN Media V2"
        description="LETAN Media V2."
        path="/v2"
        noindex
      />

      <section className="lmv2-peach-clone">

        <img
          className="lmv2-peach-clone__bg"
          src="/peach-v2/bg1.webp"
          alt=""
          draggable="false"
        />

        <FishBoundary>
          <PeachHeroClone />
        </FishBoundary>

      </section>
    </div>
  );
}
