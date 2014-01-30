# turbo-cors


> Because currently CORS sends twice more requests than needed, which makes it slower than alternative cross domain transports & overloads API with pointless payloads.

Inspired by [blog](http://homakov.blogspot.pt/2014/01/how-to-use-cors-without-preflights.html) post from [@homakov](https://twitter.com/homakov/status/428370724672110592).

The basic idea is to bypass the CORS preflight request by putting the actual method and the extra headers on the `Accept` header.

## usage

1. clone the repo
2. cd into it, `npm install`
3. `node server`
4. point your browser to `http://localhost:8000`