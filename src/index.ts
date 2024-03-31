import crypto from 'crypto';
import { access } from 'fs/promises';
import puppeteer, { Browser, Page } from 'puppeteer';
import { downloadGIF, fastAndFuriousGIFsURLs } from './f&f';

export const outputDir = './gifs';

(async () => {
  const browser = await puppeteer.launch({ channel: 'chrome', headless: false });

  let i = 0;
  const batchSize = 10;

  while (i < fastAndFuriousGIFsURLs.length) {
    const parallelScrapingOperations = Math.min(batchSize, fastAndFuriousGIFsURLs.length - i);

    const batch: Array<Promise<void>> = [];

    for (let j = i; j < i + parallelScrapingOperations; j++) {
      batch.push(scrape(browser, fastAndFuriousGIFsURLs[j], downloadGIF));
    }

    await Promise.all(batch);

    i += parallelScrapingOperations;
  }

  browser.close();
})();

async function scrape(
  browser: Browser,
  url: string,
  callback: (page: Page, outputName: string) => Promise<void | string>
) {
  const outputName = getOutputName(url);

  if (await exists(`${outputDir}/${outputName}`)) {
    return;
  }

  const page = await browser.newPage();

  await page.goto(url);

  try {
    const error = await callback(page, outputName);

    if (error !== undefined) {
      console.error(error);
    }
  } catch (e) {
    console.error(e);
  }

  await page.close();
}

function getOutputName(url: string) {
  return `${crypto.createHash('sha256').update(url).digest('hex')}.gif`;
}

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
