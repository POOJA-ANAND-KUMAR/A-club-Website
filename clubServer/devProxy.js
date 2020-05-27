const Bundler = require('parcel-bundler');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
// Paths we want to forward to the app server
const forward = ['/activities', '/login', '/logout', '/users','activities/:_id'];
app.use(forward, createProxyMiddleware({target: 'http://127.0.0.1:3001'}));
// Instance of the parcel.js bundler with start file
const bundler = new Bundler('../ReactClub/index.html');
app.use(bundler.middleware());
app.listen(1234);