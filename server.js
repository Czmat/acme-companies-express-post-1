const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');

app.delete('/api/companies/:id', (req, res, next) => {
  const id = req.params.id;

  db.readJSON('./companies.json').then(items => {
    return db
      .writeJSON(
        './companies.json',
        items.filter(item => item.id !== id * 1)
      )
      .catch(next);
  });
});

app.get('/api/companies', (req, res, next) => {
  db.readJSON('./companies.json')
    .then(companies => res.send(companies))
    .catch(next);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`listening on port ${port}`));
