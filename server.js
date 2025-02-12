const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use(express.static("assets"));

//  MENGACU KE HALAMAN HOME
app.get("/", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

app.get("/index", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//  REQUEST PARAMS
app.get("/about/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Halo ini halaman tentang ${id}`);
});

//REQUEST QUERY

app.get("/blog", (req, res) => {
  //   const title = req.query.title;
  //   const author = req.query.author;
  //   const year = req.query.year;

  const { title, author, year } = req.query;
  res.send(`Ini Halaman Blog ${title} dengan author ${author} Tahun ${year}`);
});

app.listen(port, () => {
  console.log(`My personal web app listening on port ${port}`);
});
