//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para operações
db.serialize(() => {
  //   //com comandos SQL
  //   //1 criar uma tabela
  //   db.run(`
  //     CREATE TABLE IF NOT EXISTS places (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       image TEXT,
  //       name TEXT,
  //       address TEXT,
  //       address2 TEXT,
  //       state TEXT,
  //       city TEXT,
  //       items TEXT
  //     );
  //   `)
  // //2 inserir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `
  // const values = [
  //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1401&q=80",
  //     "Colectoria",
  //     "Guilherme Gemballa, Jardim América",
  //     "Número 260",
  //     "Santa Catarina",
  //     "Rio do Sul",
  //     "Resíduos Eletrônicos, Lâmpadas"
  //   ]
  // function afterInsertData(err) {
  //   if(err) {
  //     return console.log(err)
  //   }
  //   console.log("Cadastrado com sucesso")
  //   console.log(this)
  // }
  // db.run(query, values, afterInsertData)
  //3 consultar dados na tabela
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err) {
  //     return console.log(err)
  //   }
  //   console.log("Aqui estão seus registros: ")
  //   console.log(rows)
  // })
  //4 deletar dados na tabela
  // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
  //  if(err) {
  //   return console.log(err)
  //  }
  //  console.log("Registro deletado com sucesso!")
  // })
})
