const cheerio = require('cheerio');

const content = `<ul>
<li>
  <a href='www.google.com'>Apple</a>
</li>
<li>
  <a href='www.google.com'>Orange</a>
</li>
<li>
  <a href='www.google.com'>Banana</a>
</li>
</ul>`

const $ = cheerio.load(content);
const example = $('li a').filter(function() {
  return $(this).text().trim() === 'Apple';
}).html();

console.log(example);