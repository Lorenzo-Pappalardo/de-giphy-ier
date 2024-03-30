import puppeteer from 'puppeteer';
import fastAndFuriousGIFsURLs from './f&f';

(async () => {
  const browser = await puppeteer.launch({ channel: 'chrome', headless: false });
  const page = await browser.newPage();

  fastAndFuriousGIFsURLs.forEach(url => {
    console.log(url);
  });

  setTimeout(() => {
    browser.close();
  }, 1000);
})();
