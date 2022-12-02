const express = require('express');
const Joi = require('joi'); 
const app = express();
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
res.send(books);
});
 
app.get('/api/books/:id', (req, res) => {
const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('Not valid');
res.send(book);
});
 

app.post('/api/books', (req, res)=> {
 
// const { error } = validateBook(req.body);
// if (error){
// res.status(400).send(error.details[0].message)
// return;
// }
// console.log(req.body)
const book = {
id: books.length + 1,
title: req.body.title
};
books.push(req.body);
res.send(req.body);
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