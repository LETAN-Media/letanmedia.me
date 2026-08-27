import ParticleField from './hero/ParticleField';

const Hero3D = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
    <ParticleField color="#4F7CFF" accent="#26D9F2" />
  </div>
);

export default Hero3D;
