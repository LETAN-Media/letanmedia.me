import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

async function runLighthouse() {
  console.log('Khởi động Puppeteer (Chrome Headless)...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const options = {
    logLevel: 'warn',
    output: 'json',
    port: new URL(browser.wsEndpoint()).port
  };

  console.log('Đang phân tích http://localhost:4000 bằng Lighthouse...');
  const runnerResult = await lighthouse('http://localhost:4000', options);

  console.log('\n================================');
  console.log('🏆 KẾT QUẢ LIGHTHOUSE SCORE 🏆');
  console.log('================================');
  console.log(`🚀 Performance   : ${runnerResult.lhr.categories.performance.score * 100}`);
  console.log(`♿ Accessibility : ${runnerResult.lhr.categories.accessibility.score * 100}`);
  console.log(`✨ Best Practices: ${runnerResult.lhr.categories['best-practices'].score * 100}`);
  console.log(`🔎 SEO           : ${runnerResult.lhr.categories.seo.score * 100}`);
  console.log('================================\n');

  await browser.close();
}

runLighthouse().catch(err => {
  console.error('Lỗi khi chạy Lighthouse:', err);
  process.exit(1);
});
