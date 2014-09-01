var request =require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var urls = [
    'http://www.brainyquote.com/quotes/topics/topic_motivational.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational2.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational3.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational4.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational5.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational6.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational7.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational8.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_motivational9.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational2.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational3.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational4.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational5.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational6.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational7.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational8.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational9.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational10.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_inspirational11.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success2.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success3.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success4.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success5.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success6.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_success7.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership2.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership3.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership4.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership5.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership6.html?vm=l',
    'http://www.brainyquote.com/quotes/topics/topic_leadership7.html?vm=l'
]

var quotes = []
var complete = 0
urls.forEach(function (url) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)

        $('.bq_list_i').each(function () {
            var $this = $(this)
            quotes.push({
                quote: $this.find('.bqQuoteLink a').text(),
                author: $this.find('.bq-aut a').text()
            })
        })

        complete++

        if (complete === urls.length) {
            fs.writeFileSync('quotes.json', JSON.stringify(quotes))
        }
    })
})
