const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const uuid = require('uuid');

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use(express.json());

app.delete('/api/companies/:id', (req, res, next) => {
  const id = req.params.id;

  try {
    db.readJSON('./companies.json').then(items =>
      db.writeJSON(
        './companies.json',
        items.filter(item => item.id !== id)
      )
    );
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.post('/api/companies', async (req, res, next) => {
  try {
    res.send(await db.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/api/companies', (req, res, next) => {
  db.readJSON('./companies.json')
    .then(companies => res.send(companies))
    .catch(next);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}`));
