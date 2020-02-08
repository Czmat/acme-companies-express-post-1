const fs = require('fs');
const uuid = require('uuid');

const readJSON = (file)=> {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data)=> {
      if(data){
        try {
          resolve(JSON.parse(data.toString()));
        }
        catch(ex){
          reject(ex);
        }
      }
      else {
        reject(err);
      }
    });
  });
};

const writeJSON = (file, data)=> {
  return new Promise((resolve, reject)=> {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err)=> {
      if(err){
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};

const create = (file, item) => {
  return getCompany('./companies.json')
    .then(items => {
      item.id = uuid()
      items.push(item)
      return writeJSON('./companies.json', items)
    })
    .then(() => console.log(item))
}

const getCompany = (file) => {
  return readJSON(file)
}

create('./companies.json', {})

module.exports = {
  readJSON,
  writeJSON
};
