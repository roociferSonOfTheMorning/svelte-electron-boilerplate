var PouchDB = require("pouchdb");

const remoteURL = "http://localhost:5984";

module.exports = class PouchDBBase {
  constructor(name) {
    this.name = name;
    this.remote = remoteURL + "/" + name;
    this.docCnt = 0;
    this.db = new PouchDB(this.remote);

    // let options = {
    //   live: true,
    //   retry: true,
    //   continuous: true,
    //   auto_compaction: true,
    // };
    // this.db.sync(this.remote, options);
  }

  /**
   * Methods
   */

  // Loads the database with document count.
  // NOTE: This method need to be called after the contructor to load information about the database and sync data
  async load() {
    // Get database info
    try {
      let info = await this.getDB().info();
      this.docCnt = info["doc_count"];
    } catch (err) {
      console.error("Error while getting OUI database: " + JSON.stringify(err));
    }
  }

  getName() {
    return this.name;
  }

  getDocumentCount() {
    return this.docCnt;
  }

  addDocuments(cnt) {
    this.docCnt += cnt;
  }
}; // Finish abstract class
