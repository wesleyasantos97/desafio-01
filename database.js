const fs = require('fs').promises
const path = require('path') 

const databasePath = path.join(__dirname, "src/db.json")

module.exports = class Database {
    #database = {}

    constructor() {
      
        fs.readFile(databasePath, 'utf8')
            .then(data => { 
               
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        console.log(this.#database)
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

   
    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    selectById(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
       let data = {}
        
        if (rowIndex > -1) {
           
           
           data = this.#database[table][rowIndex]
        }
        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
       
        
        if (rowIndex > -1) {
           
           
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
       
        
        if (rowIndex > -1) {
           
           this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    insert(table, data) {
        console.log(data)
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
        return data;
    }
}
