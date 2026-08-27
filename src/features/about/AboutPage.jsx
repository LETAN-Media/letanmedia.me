import React from 'react';
import Seo from '../../components/Seo';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Container, Section, SectionHeader, Card, Stats } from '../../components/ui';

const AboutPage = () => (
  <>
    <Seo
      title="Về LETAN Media | AI-first Digital Agency"
      description="LETAN Media — agency AI-first chuyên giải pháp AI, truyền thông số và phát triển phần mềm cho cá nhân và doanh nghiệp."
      path="/about"
    />
    <Container>
      <Section>
        <Breadcrumbs />
        <SectionHeader
          eyebrow="Về LETAN"
          title="Đối tác tăng trưởng số dựa trên AI"
          subtitle="LETAN Media kết hợp trí tuệ nhân tạo, truyền thông số và kỹ thuật phần mềm để giúp cá nhân và doanh nghiệp tăng trưởng bền vững."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 56 }}>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-space)', marginBottom: 8 }}>AI-first</h3>
            <p style={{ color: 'var(--color-muted)' }}>Ứng dụng AI vào mọi quy trình: chatbot, tự động hóa, bảo vệ nền tảng.</p>
          </Card>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-space)', marginBottom: 8 }}>Đa kênh</h3>
            <p style={{ color: 'var(--color-muted)' }}>TikTok, YouTube, Website, Fanpage — một chiến lược nhất quán.</p>
          </Card>
          <Card>
            <h3 style={{ fontFamily: 'var(--font-space)', marginBottom: 8 }}>Đo lường</h3>
            <p style={{ color: 'var(--color-muted)' }}>Mọi dịch vụ đều gắn liền với chỉ số tăng trưởng rõ ràng.</p>
          </Card>
        </div>
        <Stats items={[
          { value: '24/7', label: 'Hỗ trợ khẩn cấp' },
          { value: '100%', label: 'Bảo mật khách hàng' },
          { value: '3+', label: 'Nền tảng bảo vệ' },
        ]} />
      </Section>
    </Container>
  </>
);

export default AboutPage;
