import React from 'react';
import { Bot, Zap, Shield, Users } from 'lucide-react';
import Reveal from './Reveal';

const ITEMS = [
  {
    icon: Bot,
    title: 'AI-First Operations',
    desc: 'Mọi quy trình — từ CSKH đến báo cáo — đều có AI tham gia vận hành, giúp phản hồi nhanh và giảm chi phí.',
  },
  {
    icon: Zap,
    title: 'Phản hồi trong 24h',
    desc: 'Từ lúc liên hệ đến lúc có plan đầu tiên — thường trong ngày. Không chờ tuần để nhận proposal.',
  },
  {
    icon: Shield,
    title: 'Bảo mật & Tuân thủ',
    desc: 'Xử lý data khách hàng theo chuẩn, không chia sẻ bên thứ ba. Mọi tool đều có logging và audit trail.',
  },
  {
    icon: Users,
    title: 'Đồng hành dài hạn',
    desc: 'Không bán xong rồi biến. LETAN theo dõi kết quả, tối ưu liên tục và sẵn sàng hỗ trợ khi có vấn đề.',
  },
];

const Company = () => (
  <section className="hm-section hm-company" id="company" aria-label="Về LETAN Media">
    <div className="hm-wrap">
      <div className="hm-company__grid">
        <Reveal>
          <span className="hm-eyebrow">Về LETAN</span>
          <h2 className="hm-company__big">
            LETAN Media là đơn vị cung cấp giải pháp{' '}
            <span className="accent">truyền thông số, AI</span>{' '}
            và phần mềm cho cá nhân, nhà sáng tạo nội dung và doanh nghiệp.
          </h2>
          <p className="hm-lead" style={{ marginTop: '24px' }}>
            Kết hợp chiến lược Digital, AI và công nghệ để xây dựng hệ thống tăng trưởng — không chỉ tư vấn, mà trực tiếp vận hành.
          </p>
        </Reveal>

        <div className="hm-company__list">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="div" key={item.title} className="hm-company__item" delay={i * 0.08}>
                <div className="hm-company__ic">
                  <Icon size={20} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Company;
