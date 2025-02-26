const { equal } = require("assert");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");

// const { renderBlogEdit, updateBlog } = require("./controllers/controller-v1");

const {
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderBlogCreate,
  createBlog,
  renderBlogEdit,
  updateBlog,
} = require("./controllers/controller-v2");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");

const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(methodOverride("_method"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

// HALAMAN HOME
app.get("/", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

app.get("/index", (req, res) => {
  // res.send("Hello Express! Ini Halaman Saya yang pertama");
  res.render("index");
});

//HALAMAN BLOG
app.get("/blog", renderBlog);

app.get("/blog-create", renderBlogCreate);

//SUBMIT NEW BLOG
app.post("/blog-create", createBlog);

//RENDER EDIT BLOG
app.get("/blog-edit/:id", renderBlogEdit);

//SUBMIT/SAVE EDIT BLOG
app.patch("/blog-update/:id", updateBlog);

//DELETE EXISTING BLOG
app.delete("/blog/:id", deleteBlog);

//blog detail
app.get("/blog/:id", renderBlogDetail);

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("*", (req, res) => {
  res.render("page-404");
});

// //  REQUEST PARAMS
// app.get("/about/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(`Halo ini halaman tentang ${id}`);
// });

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
