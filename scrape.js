const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 50 + i);
const baseUrl = 'http://127.0.0.1:8000/seed'; // Replace with real base URL
let total = 0;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Seed ${seed} sum: ${sum}`);
    total += sum;
  }

  console.log(`Total sum across all seeds: ${total}`);
  await browser.close();
})();
