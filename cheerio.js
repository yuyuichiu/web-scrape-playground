const cheerio = require("cheerio");
const axios = require('axios');

// Cheerio is faster than puppeteer as it does not need a browser
// It means that JavaScript is ignored during the process, but it makes things faster

axios.get('https://www.amazon.com/-/zh_TW/Amazon-Essentials-%E7%94%B7%E6%AC%BE%E8%BC%95%E9%87%8F%E9%98%B2%E6%B0%B4%E5%8F%AF%E6%8A%98%E7%96%8A%E7%BE%BD%E7%B5%A8%E5%A4%BE%E5%85%8B-%E9%BB%91%E8%89%B2-XL/dp/B07BN3XQ4R?ref_=Oct_DLandingS_D_8fca4759_61&smid=ATVPDKIKX0DER')
.then((res) => {
  // put extracted HTML into cheerio
  const $ = cheerio.load(res.data);

  // get your thing with $('selector')
  const heading = $('#productTitle').text().trim();
  const image = $('#landingImage').attr('src');

  console.log({ heading, image })
})
.catch((err) => {
  throw new Error(err);
})

// Extracting data from EDGAR summaries
axios.get('https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/R2.htm')
.then((res) => {
  const $ = cheerio.load(res.data);

  const getFinData = (query) => {
    return $('tbody tr td').filter(function() {
      return $(this).children().text().toLowerCase().trim() === query
    }).first().next('.nump').text().match(/[0-9,]+/)[0];
  }

  const netIncome = getFinData('net income');

  const netSales = getFinData('net sales');

  const costOfSales = getFinData('cost of sales');
  
  const grossMargin = getFinData('gross margin');

  console.log({ netSales, netIncome, costOfSales, grossMargin })
})