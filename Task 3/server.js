const express = require('express')
const app = express()
app.use(express.json())

PORT = process.env.PORT || 8000;

let books = [
    { id: 1, title: 'A day tommorow', author: 'George Seimens' },
    { id: 2, title: 'Invisible man', author: 'Jr. Robert Tolkien' },
]

let nextId = 3;

app.get('/', (req, res) => {
    res.json(books);
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(b => b.id === id)
    if (!book) return res.status(404).json({ error: "Book not found" })
    res.json(book)
})

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and Author required" })
    const book = { id: nextId++, title, author }
    books.push(book)
    res.status(201).json(book)
})

app.put('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Book not found' });
    const { title, author } = req.body;
    if (title) books[idx].title = title;
    if (author) books[idx].author = author;
    res.json(books[idx]);
});

app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Book not found' });
    books.splice(idx, 1);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

