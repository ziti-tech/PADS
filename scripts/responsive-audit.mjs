import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const pages = ['/', '/leadership/', '/community-health/', '/gallery/', '/contact-us/', '/make-your-contribution/'];
const sizes = [
  {name:'phone-320', width:320, height:700},
  {name:'phone-390', width:390, height:844},
  {name:'tablet-768', width:768, height:1024},
  {name:'tablet-1024', width:1024, height:768},
  {name:'small-laptop-1110', width:1110, height:800},
  {name:'desktop-1180', width:1180, height:820},
  {name:'laptop-1366', width:1366, height:768},
  {name:'wide-1920', width:1920, height:1080},
];
await mkdir('/tmp/pads-responsive', {recursive:true});
const browser = await chromium.launch({headless:true});
let failures = 0;
for (const size of sizes) {
  const context = await browser.newContext({viewport:{width:size.width,height:size.height}, deviceScaleFactor:1});
  for (const route of pages) {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:5173${route}`, {waitUntil:'networkidle'});
    const report = await page.evaluate(() => {
      const overflow = [...document.querySelectorAll('body *')].filter(el => {
        if (el.classList.contains('heroBg') || el.closest('.filterbar')) return false;
        const r = el.getBoundingClientRect();
        return r.right > innerWidth + 1 || r.left < -1;
      }).slice(0,8).map(el => ({tag:el.tagName, cls:el.className, left:Math.round(el.getBoundingClientRect().left), right:Math.round(el.getBoundingClientRect().right)}));
      return {body:document.body.scrollWidth, viewport:innerWidth, overflow};
    });
    if (size.width <= 1120 && route === '/') {
      await page.click('.hamb');
      const mobileNav = await page.locator('nav.open').evaluate(el => ({visible:getComputedStyle(el).display !== 'none', fits:el.scrollWidth <= el.clientWidth + 1, links:el.querySelectorAll('a').length}));
      if (!mobileNav.visible || !mobileNav.fits || mobileNav.links < 10) report.overflow.push({mobileNav});
      const firstGroup = page.locator('.navgroup').first();
      const initiallyClosed = await firstGroup.locator('.dropdown').evaluate(el => el.getBoundingClientRect().height < 1);
      await firstGroup.locator('button').click();
      await page.waitForTimeout(350);
      const opened = await firstGroup.locator('.dropdown').evaluate(el => el.getBoundingClientRect().height > 1);
      await firstGroup.locator('button').click();
      await page.waitForTimeout(350);
      const closedAgain = await firstGroup.locator('.dropdown').evaluate(el => el.getBoundingClientRect().height < 1);
      if (!initiallyClosed || !opened || !closedAgain) report.overflow.push({accordion:{initiallyClosed,opened,closedAgain}});
    }
    const ok = report.body <= report.viewport + 1 && report.overflow.length === 0;
    if (!ok) failures++;
    console.log(`${ok?'PASS':'FAIL'} ${size.name} ${route} body=${report.body}/${report.viewport}`, report.overflow);
    if (route==='/' || route==='/leadership/') await page.screenshot({path:`/tmp/pads-responsive/${size.name}-${route==='/'?'home':'leadership'}.png`,fullPage:true});
    await page.close();
  }
  await context.close();
}
await browser.close();
if (failures) process.exitCode=1;
