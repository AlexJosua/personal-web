const { equal } = require("assert");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./middlewares/upload-file");
require("dotenv").config();

// const { renderBlogEdit, updateBlog } = require("./controllers/controller-v1");

const {
  renderHome,
  authLogin,
  authRegister,
  authLogout,
  renderLogin,
  renderRegister,
  renderContact,
  renderTestimonials,
  renderError,
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderBlogCreate,
  createBlog,
  renderBlogEdit,
  updateBlog,
} = require("./controllers/controller-v2");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const checkUser = require("./middlewares/auth");

const port = process.env.SERVER_PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

//module apa saja yang digunakan di dalam express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: "qpwoeiruty1111",
    resave: false,
    saveUninitialized: true,
  })
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

// HALAMAN HOME
app.get("/", renderHome);

app.get("/index", renderHome);

app.get("/login", renderLogin);

app.get("/register", renderRegister);

app.get("/logout", authLogout);

app.post("/login", authLogin);

app.post("/register", authRegister);

//HALAMAN BLOG
app.get("/blog", renderBlog);

app.get("/blog-create", checkUser, renderBlogCreate);

//SUBMIT NEW BLOG
app.post("/blog-create", checkUser, upload.single("image"), createBlog);

//RENDER EDIT BLOG
app.get("/blog-edit/:id", renderBlogEdit);

//SUBMIT/SAVE EDIT BLOG
app.patch("/blog-update/:id", updateBlog);

//DELETE EXISTING BLOG
app.delete("/blog/:id", deleteBlog);

//blog detail
app.get("/blog/:id", renderBlogDetail);

app.get("/testimonial", renderTestimonials);

app.get("/contact", renderContact);

app.get("*", renderError);

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
