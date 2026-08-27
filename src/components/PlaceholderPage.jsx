import React from 'react';
import { Link } from 'react-router-dom';
import Seo from './Seo';
import { Container, Section, Badge, Button } from './ui';

/**
 * Reserved URL placeholder for taxonomy routes that don't yet have real
 * content. Intentionally noindex and excluded from sitemap.xml so it is
 * never indexed as thin content. Replaced with real pages in later phases.
 */
const PlaceholderPage = ({ title, description, eyebrow = 'Sắp ra mắt', backTo = '/', backLabel = 'Về trang chủ' }) => (
  <>
    <Seo title={`${title} | LETAN Media`} description={description} path={typeof window !== 'undefined' ? window.location.pathname : '/'} noindex />
    <Container>
      <Section style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Badge variant="ai">{eyebrow}</Badge>
        <h1 style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem,5vw,3.5rem)', maxWidth: 800 }}>{title}</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: 600, fontSize: '1.1rem' }}>{description}</p>
        <Button as="a" href={backTo}>{backLabel}</Button>
      </Section>
    </Container>
  </>
);

export default PlaceholderPage;
