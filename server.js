const { equal } = require("assert");
const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const path = require("path");

const { formatDateToWIB, getRelativeTime } = require("./utils/time");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

let blogs = [];

// HALAMAN HOME
app.get("/", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

app.get("/index", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

app.get("/blog", (req, res) => {
  console.log(blogs);
  res.render("blog-list", { blogs: blogs });
});

app.get("/blog-create", (req, res) => {
  res.render("blog-create");
});

//SUBMIT NEW BLOG
app.post("/blog-create", (req, res) => {
  // const title = req.body.title;
  // const content = req.body.content;

  const { title, content } = req.body; // ttile dan content adalah properti milik req.body
  console.log("Judulnya title", title);
  console.log("Content nya ", content);

  let image = "https://picsum.photos/200/120";
  let blog = {
    title: title,
    content: content,
    image: image,
    author: "Leo G",
    postedAt: new Date(),
  };

  blogs.push(blog);

  res.redirect("/blog");
});

app.get("/blog/:id", (req, res) => {
  res.render("blog-detail");
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
  console.log(`My personal web app listening on port  ${port}`);
});
