# Inspirational Quote Generator

Generate inspirational quotes using a simple [Markov chain](http://en.wikipedia.org/wiki/Markov_chain)

## Installation

1. `npm install`

## Usage

### Generate `quotes.json`

#### 2 Chainz

Use the included `quotes.json` which constains some 2 Chainz lyrics

#### Provied your own

```javascript
[
    {
        "quote": "This is a quote",
        "author": "Justin Long"
    }
]
```

#### Scrape the web

Run `node scrape.js`

This will scrape [http://www.brainyquote.com](http://www.brainyquote.com) and generate `quotes.json`

### Generate some quotes

Run `node generate.js`

N.B. If you have a cycle in your chain or no diverging links, this may run forever or until your computer crashes.
