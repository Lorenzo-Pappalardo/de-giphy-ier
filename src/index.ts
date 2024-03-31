import puppeteer, { Browser, Page } from 'puppeteer';
import { downloadGIF, fastAndFuriousGIFsURLs } from './f&f';

async function scrape(browser: Browser, url: string, callback: (page: Page) => Promise<void>) {
  const page = await browser.newPage();

  await page.goto(url);

  await callback(page);
}

(async () => {
  const browser = await puppeteer.launch({ channel: 'chrome', headless: false });

  let i = 0;
  const batchSize = 5;

  while (i < fastAndFuriousGIFsURLs.length) {
    const parallelScrapingOperations = Math.min(batchSize, fastAndFuriousGIFsURLs.length - i);

    const batch: Array<Promise<void>> = [];

    for (let j = i; j < parallelScrapingOperations; j++) {
      batch.push(scrape(browser, fastAndFuriousGIFsURLs[j], downloadGIF));
    }

    // console.log(batch);

    await Promise.all(batch);

    i += parallelScrapingOperations;
  }

  browser.close();
})();
