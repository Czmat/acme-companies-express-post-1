const fs = require('fs');
const uuid = require('uuid');

const readJSON = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (data) {
        try {
          resolve(JSON.parse(data.toString()));
        } catch (ex) {
          reject(ex);
        }
      } else {
        reject(err);
      }
    });
  });
};

const writeJSON = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const create = item => {
  return getCompany('./companies.json')
    .then(items => {
      item.id = uuid();
      items.push(item);
      return writeJSON('./companies.json', items);
    })
    .then(() => item);
};

const getCompany = file => {
  return readJSON(file);
};

module.exports = {
  readJSON,
  writeJSON,
  create,
};
