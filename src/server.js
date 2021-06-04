const express = require("express");
const server = express();

//pegar banco de dados
const db = require("./database/db");

//configurar public
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//configurar caminhos na minha aplicação
//pagina inicial
//req = requisição
//res =  resposta
server.get("/", (req, res) => {
  return res.render("index.njk", { title: "Um título" });
});

server.get("/create-point", (req, res) => {
  //req.query: Query Strings da URL
  //console.log(req.query)

  return res.render("create-point.njk");
});

server.post("/savepoint", (req, res) => {
  //req.body: corpo do formulário
  //console.log(req.body)

  //inserir dados no db
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro!");
    }

    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("create-point.njk", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    //pesquisa vazia (pega todos os cadastros)
    db.all(`SELECT * FROM places`, function (err, rows) {
      if (err) {
        return console.log(err);
      }

      const total = rows.length;

      //mostrar html com dados do db
      return res.render("search-results.njk", { places: rows, total: total });
    });
    //return res.render("search-results.njk", { total: 0 })
  } else {
    db.all(
      `SELECT * FROM places WHERE city LIKE '%${search}%'`,
      function (err, rows) {
        if (err) {
          return console.log(err);
        }

        const total = rows.length;

        //mostrar html com dados do db
        return res.render("search-results.njk", { places: rows, total: total });
      }
    );
  }

  //pegar dados do db (foi colocado dentro do else)
  // db.all(
  //   `SELECT * FROM places WHERE city LIKE '%${search}%'`,
  //   function (err, rows) {
  //     if (err) {
  //       return console.log(err)
  //     }

  //     const total = rows.length

  //     //mostrar html com dados do db
  //     return res.render("search-results.njk", { places: rows, total: total })
  //   }
  // )
});

//ligar o servidor
server.listen(3001);
