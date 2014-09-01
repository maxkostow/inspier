var _ = require('lodash')
var fs = require('fs')

var quotes = JSON.parse(fs.readFileSync('quotes.json'))

function prefix (len) {
    this.len = len
    this.terms = []
}
prefix.prototype.pushTerm = function (term) {
    this.terms.push(term)
    if (this.terms.length > this.len) {
        this.terms.shift()
    }
}
prefix.prototype.toString = function () {
    return this.terms.join(' ')
}

function buildChain (quotes, pfxLen) {
    var chain = {
        chain: {},
        len: pfxLen,
        authors: [],
    }

    _.each(quotes, function (q) {
        chain.authors.push(q.author)

        var pfx = new prefix(chain.len)
        _.each(q.quote.split(' '), function (word) {
            if (!chain.chain[pfx.toString()]) {
                chain.chain[pfx.toString()] = []
            }
            chain.chain[pfx.toString()].push(word)
            pfx.pushTerm(word)
        })
    })

    return chain
}

function generateSentence (chain) {
    var words = []
    var pfx = new prefix(chain.len)

    var choices
    while (choices = chain.chain[pfx.toString()]) {
        words.push(_.sample(choices))
        pfx.pushTerm(_.last(words))
    }

    return words.join(' ')
}

function generateQuote (chain) {
    var s
    while (!s || _.any(quotes, function (q) {
        return q.quote === s
    })) {
        s = generateSentence(chain)
    }

    return '"' + s + '" - ' + _.chain(chain.authors).unique().sample().value()
}

console.log(generateQuote(buildChain(quotes, 2)))
