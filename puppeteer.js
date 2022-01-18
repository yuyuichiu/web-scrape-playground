const express = require("express");
const puppeteer = require("puppeteer");

// Web scraping with puppeteer
async function main(url) {
  // Setup a virtual browser with puppeteer & go to site
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Extract things we want with help of Xpath.
  const [el] = await page.$x('//*[@id="landingImage"]');
  const src = await el.getProperty('src');
  const srcTxt = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty('textContent');
  const rawtxt = await txt.jsonValue();

  console.log({ url: srcTxt, title: rawtxt.trim() })

  // Remember to close your virtual browser
  await browser.close();
}

main("https://www.amazon.com/Galaxy-%E5%85%A7%E5%BB%BA%E8%9E%A2%E5%B9%95%E4%BF%9D%E8%AD%B7%E8%B2%BC-Poetic-%E5%85%A8%E6%A9%9F%E9%87%8D%E5%9E%8B%E9%98%B2%E9%9C%87%E4%BF%9D%E8%AD%B7-Samsung/dp/B07R6TNLDJ/ref=sr_1_1_sspa?keywords=galaxy%2Btab%2Bs6%2Bcase&qid=1642498699&sprefix=galaxy%2Btab%2Bs6%2Caps%2C245&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFNSk02WjkyWFA3OTcmZW5jcnlwdGVkSWQ9QTEwMDAwMTAzRjM2VUxDSE5BVVZQJmVuY3J5cHRlZEFkSWQ9QTAxMjA0NjAyNVowRjk5OVhUSktBJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==");