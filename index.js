const express = require('express');
const Joi = require('joi'); 
const app = express();
const data=require('./data')
const fs = require("fs");
let request = require('request');


app.use(express.json());

 
const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]

app.get('/', (req, res) => {
res.send('Serving on port');
});
 
app.get('/api/books', (req,res)=> {
   res.send(data)
  
});
 
app.get('/api/books/:id', (req, res) => {
const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('Not valid');
res.send(book);
});

fs.readFile("./data.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const customer = JSON.parse(jsonString);
    console.log("Customer address is:", customer); // => "Customer address is: Infinity Loop Drive"
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
 

app.post('/api/books', (req, res)=> {
 

  books.push(req.body.options)
  res.send(books)
  // let jsonData = fs.readFileSync( req.body, 'utf8');
 
  // request({
  //   method: 'POST',
  //   url: 'http://localhost:8080/api/books',
  //   body: jsonData,
  //   headers: {
  //     'User-Agent': 'Request-Promise'
  //   },
  //   json: true
  // }, function (error, response, body) {
  //   // if (error) {
  //   //   console.log('error', error);
  //   // }
  
   
  //  res.send(body)
  // });

// res.send(req.body)

// books.push(JSON.stringify(req));
// res.send(JSON.stringify(req));
});
 

app.put('/api/books/:id', (req, res) => {
const book = books.find(c=> c.id === parseInt(req.params.id));
if (!book) res.status(404).send('Not Found!! ');
 
// const { error } = validateBook(req.body);
// if (error){
// res.status(400).send(error.details[0].message);
// return;
// }
 
book.title = req.body.title;
res.send(book);
});
 

app.delete('/api/books/:id', (req, res) => {
 
const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send('Not Found!! ');
 
const index = books.indexOf(book);
books.splice(index,1);
 
res.send(book);
});
 
// function validateBook(book) {
// const schema = {
// title: Joi.string().min(3).required()
// };
// return Joi.validate(book, schema);
 
// }
 

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));