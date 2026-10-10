import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Seo from '../components/Seo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './WebsiteGalleryPage.css';

const ASSET_ROOT = 'https://files.peachworlds.com/website';
const POSTER_ROOT = '/images/website-gallery';

const showcaseItems = [
  { poster: `${POSTER_ROOT}/atom.webp`, video: `${ASSET_ROOT}/4f9c3e3c-ca81-4abc-ad28-e5b006e4f815/atom-360.mp4` },
  { poster: `${POSTER_ROOT}/vexel.webp`, video: `${ASSET_ROOT}/dfa8f7cf-3568-4c21-9326-ddc3fa49b00e/vexel-360c.mp4` },
  { label: 'Tech' },
  { poster: `${POSTER_ROOT}/horizon1.webp`, video: `${ASSET_ROOT}/fec2c978-6d64-4daa-8c32-3bafb6afe933/horizon-360.mp4` },
  { poster: `${POSTER_ROOT}/nisa.webp`, video: `${ASSET_ROOT}/96e79ba3-a8d8-460e-a765-fc894237d8b3/nisa-360.mp4` },
  { poster: `${POSTER_ROOT}/garri-thumb.webp`, video: `${ASSET_ROOT}/2af6cb04-12f7-409b-ae21-e4f10221fe16/garri-360.mp4` },
  { poster: `${POSTER_ROOT}/drop.webp`, video: `${ASSET_ROOT}/c8769408-f5f7-496e-a616-89552bc914db/drop-360.mp4` },
  { poster: `${POSTER_ROOT}/nova-thumb.webp`, video: `${ASSET_ROOT}/dbefbfa0-e9e7-4913-a4a2-c748f544b817/nova-360.mp4` },
  { poster: `${POSTER_ROOT}/sodium.webp`, video: `${ASSET_ROOT}/f15ae115-8704-44c5-b6b3-bae05accb082/sodium-360b.mp4` },
  { poster: `${POSTER_ROOT}/lithium.webp`, video: `${ASSET_ROOT}/974939f7-526a-433f-92b3-7c204485c6db/lithium-360c.mp4` },
  { poster: `${POSTER_ROOT}/curved.webp`, video: `${ASSET_ROOT}/fa4b73f8-71f9-4597-8bf8-cf354378d8b0/curved-360c.mp4` },
  { label: 'Ecommerce' },
  { poster: `${POSTER_ROOT}/polaroid.webp`, video: `${ASSET_ROOT}/abb6800d-b43a-4dc6-81d7-64a700ce3cbd/polaroid-360b.mp4` },
  { poster: `${POSTER_ROOT}/jordans-thumb.webp`, video: `${ASSET_ROOT}/7b177267-9929-4c04-9e90-99e6dc1bc238/jordans-360.mp4` },
  { poster: `${POSTER_ROOT}/surge.webp`, video: `${ASSET_ROOT}/c5ee3164-05e1-4b18-ba57-cebe30769d06/surge-360.mp4` },
  { poster: `${POSTER_ROOT}/pocket.webp`, video: `${ASSET_ROOT}/b4dd3f01-a697-426c-b5fc-f48eb7f04548/sodium-pocket-360b.mp4` },
  { poster: `${POSTER_ROOT}/chaumet.png`, video: `${ASSET_ROOT}/f3bb78e9-5d2a-4662-b818-c8956f8550d8/chaumet-360b.mp4` },
  { poster: `${POSTER_ROOT}/terranest.webp`, video: `${ASSET_ROOT}/6bad9448-0f39-4ed7-997f-011f9ebcffc9/terranest-360b.mp4` },
  { label: 'Automotive' },
  { poster: `${POSTER_ROOT}/bmw-thumb.webp`, video: `${ASSET_ROOT}/53661df7-32ab-4778-a555-6d4cb0a4c52a/bmw-360.mp4` },
  { poster: `${POSTER_ROOT}/future.webp`, video: `${ASSET_ROOT}/ba767b91-8ee1-454c-a8fd-d536d99d629a/future-360c.mp4` },
  { poster: `${POSTER_ROOT}/porsche.webp`, video: `${ASSET_ROOT}/91d7f2a9-1fd5-4e18-ac9b-9bfe0fab6289/porsche-360c.mp4` },
  { label: <>Entertainment<br />&amp; Gaming</> },
  { poster: `${POSTER_ROOT}/godzilla-thumb.webp`, video: `${ASSET_ROOT}/5a6754b6-f08d-4ed5-bbf4-7ea51db990fa/godzilla-360.mp4` },
  { poster: `${POSTER_ROOT}/mongols.webp`, video: `${ASSET_ROOT}/33554887-0720-41c9-b9bd-b7979b3d7c0e/mongols-360b.mp4` },
  { poster: `${POSTER_ROOT}/goodboy.webp`, video: `${ASSET_ROOT}/f49dc240-cdd4-40cf-bb8b-9381bb250477/goodboy-360b.mp4` },
  { poster: `${POSTER_ROOT}/muskit.webp`, video: `${ASSET_ROOT}/d3f53d3f-5c16-45b1-aba1-9aa4d7792533/muskit-360b.mp4` },
  { poster: `${POSTER_ROOT}/ruinspace.webp`, video: `${ASSET_ROOT}/ba137977-9ad2-4b9b-b276-7503618f98a6/ruinspire-360c.mp4` },
  { poster: `${POSTER_ROOT}/kokomo.webp`, video: `${ASSET_ROOT}/41a0b3f7-5dd4-4182-8495-a31e74758968/kokomo-360b.mp4` },
  { poster: `${POSTER_ROOT}/missionmars.webp`, video: `${ASSET_ROOT}/3fe23b63-c49a-43d0-85b6-622dee0d7987/spacex-360b.mp4` },
  { label: 'Storytelling' },
  { poster: `${POSTER_ROOT}/purple.webp`, video: `${ASSET_ROOT}/fc799ab8-268b-415f-9fb7-afb8086b8dae/pool-360b.mp4` },
  { poster: `${POSTER_ROOT}/sodium-1.png`, video: `${ASSET_ROOT}/7ed736bf-304c-48ae-87e3-a7cc0e91071f/anima-360b.mp4` },
  { poster: `${POSTER_ROOT}/cyberland.webp`, video: `${ASSET_ROOT}/8e8ddbbb-8d91-4567-acea-b7c2b52a9a19/cyberland-360c.mp4` },
];

const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Resources', to: '/insights' },
  { label: 'About', to: '/about' },
];

function GalleryHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="wgp-header">
      <Link className="wgp-header__logo" to="/" aria-label="LETAN Media — Trang chủ">
        <img src="https://image.letanmedia.me/homepage/brand/logo1-v2.svg" alt="LETAN Media" />
      </Link>

      <nav className="wgp-header__nav" aria-label="Điều hướng chính">
        {navItems.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
      </nav>

      <div className="wgp-header__actions">
        <Link className="wgp-header__text-link" to="/contact">Liên hệ</Link>
        <Link className="wgp-button wgp-button--outline" to="/contact">Đặt lịch hẹn</Link>
        <Link className="wgp-button wgp-button--light" to="/contact">Bắt đầu dự án</Link>
      </div>

      <button
        className="wgp-header__menu"
        type="button"
        aria-label="Mở menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {menuOpen && (
        <div className="wgp-menu" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
          <div className="wgp-menu__top">
            <img src="https://image.letanmedia.me/homepage/brand/logo1-v2.svg" alt="LETAN Media" />
            <button ref={closeButtonRef} type="button" aria-label="Đóng menu" onClick={() => setMenuOpen(false)}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Điều hướng mobile">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function GalleryCard({ item, index }) {
  const cardRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const motionIsReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || motionIsReduced || !window.matchMedia('(min-width: 769px)').matches) {
      setVideoEnabled(false);
      return undefined;
    }
    const card = cardRef.current;
    if (!card) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVideoEnabled(true);
        observer.disconnect();
      }
    }, { rootMargin: '240px 0px' });

    observer.observe(card);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <figure className="wgp-card" ref={cardRef}>
      <img
        src={item.poster}
        alt={`Website 3D tham khảo ${index + 1}`}
        loading={index < 2 ? 'eager' : 'lazy'}
        fetchPriority={index < 2 ? 'high' : 'auto'}
        decoding="async"
      />
      {videoEnabled && (
        <video
          className="wgp-card__video"
          src={item.video}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
    </figure>
  );
}

function GalleryFooter() {
  return (
    <>
      <section className="wgp-final" aria-labelledby="wgp-final-title">
        <p id="wgp-final-title">Start building <em>magic</em> today.</p>
        <div className="wgp-final__actions">
          <Link className="wgp-button wgp-button--outline" to="/contact">Đặt lịch hẹn</Link>
          <Link className="wgp-button wgp-button--light" to="/contact">Bắt đầu dự án</Link>
        </div>
      </section>

      <footer className="wgp-footer">
        <div className="wgp-footer__links">
          <div><span>PRODUCT</span><Link to="/">Trang chủ</Link><Link to="/services">Dịch vụ</Link></div>
          <div><span>RESOURCES</span><Link to="/work">Dự án</Link><Link to="/insights">Insights</Link><Link to="/contact">Liên hệ</Link></div>
          <div><span>COMPANY</span><Link to="/about">Giới thiệu</Link><Link to="/policy">Chính sách</Link></div>
          <div><span>CONTACT</span><a href="mailto:infor@letanmedia.me">Email</a><a href="tel:0765178999">0765 178 999</a></div>
        </div>
        <p className="wgp-footer__copyright">LETAN Media © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default function WebsiteGalleryPage() {
  return (
    <div className="wgp">
      <Seo
        title="Website Gallery | LETAN Media"
        description="Khám phá bộ sưu tập cảm hứng website 3D tương tác do LETAN Media tuyển chọn."
        path="/websitegallery"
      />

      <GalleryHeader />

      <main>
        <section className="wgp-hero">
          <h1>Explore next-gen 3D Websites with LETAN Media.</h1>
          <div className="wgp-hero__actions">
            <Link className="wgp-button wgp-button--outline" to="/contact">Đặt lịch hẹn</Link>
            <Link className="wgp-button wgp-button--light" to="/contact">Bắt đầu dự án</Link>
          </div>
        </section>

        <section className="wgp-gallery" aria-label="Bộ sưu tập website 3D">
          <div className="wgp-gallery__grid">
            {showcaseItems.map((item, index) => (
              item.label
                ? <div className="wgp-category" key={`category-${index}`}><h2>{item.label}</h2></div>
                : <GalleryCard item={item} index={index} key={item.poster} />
            ))}
          </div>
        </section>
      </main>

      <GalleryFooter />
    </div>
  );
}
