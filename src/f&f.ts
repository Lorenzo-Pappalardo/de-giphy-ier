import { writeFile } from 'fs/promises';
import { Page } from 'puppeteer';
import { outputDir } from '.';

export const fastAndFuriousGIFsURLs = [
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-qJkf6mnJtQaYArjNPJ',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-ey9vrRocU2fNfjmrsA',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-GKSFoV6HM3Qt4oiEJJ',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-DdvM37yREThV5OdfuB',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-OONH3SbUHvJluwqbfm',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-7QLGVanmXYs33qliF1',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-IB6g6k9bzVyTLJthVS',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-q4nvVAvoxqvFTxQO85',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-XzWYzPnu0e3w3zcMDB',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-77r1et1tb9IUczHS4j',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-WiehQ4xZ537nAenGyk',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-CFwPT5nODzwhsO7y3L',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-MskIO3oD4DF6nNGPMi',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ulFHqUDkRX10iWC2wM',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-kGs7wvdmoWCvaPBZd4',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-s6CaCo0eioCGB19QhV',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-SyP24XyDVsavNPECoR',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-cE9CmEGoi43xNSyzPz',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-xB8Q4ILnknAgm4H5tq',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-LXGSLylWjcled6BaQX',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-jgvRjXUiXItVVkbexA',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-EKoMfzEg4gnMFdFuBz',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-vUbqwzwJkr5GW4AlSX',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-336RAIVlz5rBeANK4w',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-GcNJwIgVSKpm5ka1O3',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-UY6rNwGjiakpyN0KxN',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-PO1fTE4EXqxL2smjk6',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-p42QkmySe9pQ6aeyhC',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-rMOrcwOyzVUpVcRH1J',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-YT6JiUgYd0VURlyH06',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-SOSjTum8Gzy2QD9ALs',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ErxEoT4nQs8mvQvAjC',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-SlOZJuYxJ0PahXc7RR',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-BP8wX6EDB8p3wdoPup',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-kTsXJA67qiVkPRLTIp',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-f0xcTl3U8F1U2648eO',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ewJTmh1qV4uztnHD7K',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-V4NPPDOz9Lib1PMM6R',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-Zlb1DpAPMWLKVUW1oL',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-R0mOP4pHbP9MrfPSsX',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-V5m9x8qOcHarVkXhtC',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-Os8gPyslaf2GpHv10B',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-TmgDvklW9tHeP5Gycc',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-XWUcHklWTYAusmZRdA',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-TWxxqkqvxVFE1tZP3M',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-v0tZ6sqhPm7tT78NP8',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-gljVJC7aWU0q9FajQm',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-4bDYhTBM1IgyunzbWL',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-IIg0YoTgN3A6RfvJUm',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-MDDEkmVAg9jOBbRwoD',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-nmdtRlUrV193tq8pdM',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-kXIjOQGbPCqwxBKzOC',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-kQUYIRI5zWT1Cllw7E',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-5WouOmtaxasmS5HXAk',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-aTuhrxg0X8a9UdQrg3',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-VCoJEr4wQNh2NHv8Yc',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-0tMIIetSP21UgqYIiD',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-FJnjIVJUw9Is7FUz2H',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-qDuwaIEzRIHR0oNHXf',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-toz7qXlLyHy9n8KfKO',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-aVouwBOSbCIMcriBtG',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-PPZRUuZ9Ev368GukxF',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-sGMt9cNgQHJ7qCDsVa',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-mQQlyrUv3sBduHB7rF',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-PoeUdJUI6CDsSAPdbz',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-sKCyrtRJlc2ZAuYEqw',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-FSUsFT1s6hdMASGucn',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-KHUbKgESiDIQ1Utf5e',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-jhUyini0YN51gZAKl9',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-BCGgKB5OSaFY9VUy0v',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-7qytNcjB9RCKAtOGmu',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-bBpqYL0ifrQR9XjElp',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-AYP9VkDLYVd5xbPR2L',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-77F1Ogb2A1fy0LESQO',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-A4hha29d1jU1zEDbwm',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-AQAypIEyzMsoOHot8J',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-nFgMOqHqIPorvNdnNC',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-GmUfn28XlDAmZU54f0',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-Lf24xhXd2yQnnM6WOJ',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-iR5jB9QN1B1l9zwXQ3',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-1vfWYd9E3jnXSyUnCL',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-kVANXewUiMFaPDJznl',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-vS716VcJ1GnGTBwzHj',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-N8Tn2is7tghnA61Qfv',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-7R2Wk86F9I650VRcUt',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-yIA3k4R5rPUxS7H6cv',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ZgceKbHGFbbNZDQpLw',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-unj5QdOyaLgGxjsznL',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-EE76R57CgaWo5saygW',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ylPtheHeRlo5Zo08QV',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-ZrtL31UeKWhANOGgo5',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-mCFuxyAHm5BiqtY6LC',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-YKknSVLLkOcp6e9pJl',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-6fd59gRVuKGlgkj02c',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-B1jyXTYOlX17Y6d7w1',
  'https://giphy.com/gifs/thefastsaga-transparent-fast-and-furious-tokyo-drift-bTT7PYgbUsYw9JNAxp',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-DvKfdndfgZwmoc5AJt',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-4k39qI5y5zL4xBYbmQ',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-Ij7qF8erEJTtMtk9E7',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-DaFY1PZan9WBfhh7Tm',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-wbQbs4SRDvE5YRFAOn',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-USQldFTYp0CFd2wmrc',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-5Dh8VtmEYAOWFNFKrO',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-RQxrapvTa0Ik07zKvd',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-nrcSdamnz2NaIQKI6Y',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-jhNic7O5rjaTR7KdaT',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-NanBc7RcDwkY4yf0yz',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-f6wFlhNOZt79WGQIqZ',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-BloTZBSHA2lLUyijfU',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-nGrj268IQFRShQY1aG',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-8vGjkrtyNZxBvq4BU6',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-j27AFdZgwiiBrO8tvK',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-0Tvgmsink5Itkht7t8',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-dpK3yUHXXzEjMRyuWn',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-hU0Xm1EiDDwe3ZwwBR',
  'https://giphy.com/gifs/thefastsaga-transparent-fast-and-furious-tokyo-drift-DxiM3Wmx1Xym4saStH',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-agnD0H28lcvp6XIgh2',
  'https://giphy.com/gifs/thefastsaga-tokyo-drift-the-fast-and-furious-3-Vvm8uWPnxrm5nEr2Bn',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-Exofpm7E1LxbuHnPGG',
  'https://giphy.com/gifs/thefastsaga-fast-and-furious-tokyo-drift-e7B9RDt1ck7IKioykp'
];

export async function downloadGIF(page: Page, outputName: string) {
  const videoElement = await page.$('video');

  if (videoElement === null) {
    return `Video element not found: ${page.url()}`;
  }

  const src = await videoElement.getProperty('src');

  await page.goto(await src.jsonValue());

  const gifUrl = (await page.$$('img')).at(1)?.getProperty('src');

  if (gifUrl === undefined) {
    return `Gif URL not found: ${page.url()}`;
  }

  const gif = await page.goto(await (await gifUrl).jsonValue());

  if (gif === null) {
    return `Gif not found: ${page.url()}`;
  }

  console.log(`Writing ${outputName}`);

  const startTime = Date.now();

  await writeFile(`${outputDir}/${outputName}`, await gif.buffer());

  console.log(`Finished in ${Date.now() - startTime} ms`);
}
