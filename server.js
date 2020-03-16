const express = require('express');
cheerio = require('cheerio');
mongoose = require('mongoose');
request = require('request');
app = express();
Author = require('./models/info');

authorController = require("./controller/author")

app.set('view engine', 'ejs');

request('https://www.keepinspiring.me/positive-inspirational-life-quotes/', (err, res, body) => {
	if (!err && res.statusCode == 200) {
		const $ = cheerio.load(body);
		// console.log($)

		$('.quote-author-name').each((i, data) => {
			let author_name = $(data).text();
			author_name = author_name.slice(3);

		let	author = new Author({
				name: author_name
			});
			Author
				.findOne({ name: author.name })
				.then((author_data) => {
					if (author_data) {
						console.log("Author exist")
                    }
                    else{
                        author.save()
							
						
                    }
                    
				})
				.catch((err) => {
					console.log(err);
					console.log('Something went Wrong');
				});
		});
	}
});

app.get("/",authorController)



const port = process.env.PORT || 3000;

mongoose
	.connect('mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/scrap')
	.then((data) => {
		console.log('Connect to database');
		app.listen(port, () => {
			console.log(`Server is started at port ${port}`);
		});
	})
	.catch((err) => {
		console.log('Something went wrong');
		console.log(err);
	});
