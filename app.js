const express = require('express');
const http = require('http');
//const locale = require('locale');
const useragent = require('express-useragent');
const port = process.env.PORT || 3000;

const app = express();

//static route for sending the css file
app.use('/static', express.static('public'));
app.use(useragent.express());

//set view engine for pug
app.set('view engine', 'pug');

//on get request try to get the client IP address, browser type, os, and platform
app.get('/', (req, res)=>{
	const userInfo = { 'IP': req.ip};
	let language = req.headers['accept-language']
	let languageArr = language.split(',');
	userInfo.Language = languageArr[0].slice(0, languageArr[0].length);;
	userInfo.browser = req.useragent.browser;
	userInfo.os = req.useragent.os;
	userInfo.platform = req.useragent.platform;
	console.log(language);
	console.log(JSON.stringify(userInfo));
	res.send(userInfo);
});

app.listen(port, ()=>{
	console.log('server up and running on port '+port+'!!')
});
