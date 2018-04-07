const fs = require("fs");
const filePath = "./data/random.txt";
const encode = "utf8";

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encode, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}