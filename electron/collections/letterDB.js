var PouchDBBase = require("./pouchdb");

const lettersJson = [
  { letter: "a", position: "One" },
  { letter: "b", position: "Two" },
  { letter: "c", position: "Three" },
  { letter: "d", position: "Four" },
  { letter: "e", position: "Five" },
  { letter: "f", position: "Six" },
];

class LetterDB extends PouchDBBase {
  constructor() {
    super("letterPositions", false);
  }

  static getInstance() {
    return this._instance || (this._instance = new this());
  }

  async loadDataCollection() {
    console.log("loadDataCollection");
    let data;
    try {
      data = await this.db.bulkDocs(lettersJson);
    } catch (e) {
      console.error(e);
    }
    console.log("loadDataCollection finished");
    return data;
  }

  async getDataCollection() {
    console.log("getDataCollection");
    let response;
    try {
      response = await this.db.allDocs();
    } catch (e) {
      console.error(e);
    }
    console.log("getDataCollection finished");
    return response;
  }
}

const letterDatabase = LetterDB.getInstance();
module.exports = letterDatabase;
