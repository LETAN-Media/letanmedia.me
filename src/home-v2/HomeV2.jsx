import React from 'react';

import Seo from '../components/Seo';

import PeachHeroClone from './PeachHeroClone';

import './home-v2.css';

export default function HomeV2() {
  return (
    <div className="lmv2-clone-page">
      <Seo
        title="LETAN Media V2"
        description="LETAN Media V2 hero experiment."
        path="/v2"
        noindex
      />

      <PeachHeroClone />
    </div>
  );
}
