const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

let blogs = [
  {
    title: "Pasar Coding Indonesia",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi doloribus distinctio alias consequatur. Molestias odio beatae iusto quas hic assumenda numquam cumque tempora eum distinctio. Porro animi eveniet eum illo unde exercitationem, placeat repudiandae deserunt vitae. Exercitationem quis, placeat possimus voluptates aut at eius saepe soluta provident, omnis sint tempora!",
    image: "/img/shoes.jpg",
    author: "Alex Josua Sahusilawane",
    postedAt: new Date(
      "Mon Jan 03 2025 03:00:54 GMT+0700 (Western Indonesia Time)"
    ),
  },
  {
    title: "Blog Judul Ke 2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi doloribus distinctio alias consequatur. Molestias odio beatae iusto quas hic assumenda numquam cumque tempora eum distinctio. Porro animi eveniet eum illo unde exercitationem, placeat repudiandae deserunt vitae. Exercitationem quis, placeat possimus voluptates aut at eius saepe soluta provident, omnis sint tempora!",
    image: "/img/1.jpg",
    author: "Daniel Eka",
    postedAt: new Date(
      "Mon Feb 18 2025 03:00:54 GMT+0700 (Western Indonesia Time)"
    ),
  },
];

async function renderBlog(req, res) {
  const blogs = await sequelize.query(`SELECT * FROM public."Blogs"`, {
    type: QueryTypes.SELECT,
  });
  console.log(blogs);
  res.render("blog-list", { blogs: blogs });
}

function renderBlogDetail(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  console.log(blogYangDipilih);
  res.render("blog-detail", { blog: blogYangDipilih });
}

function createBlogs(req, res) {
  // const title = req.body.title;
  // const content = req.body.content;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
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
}

function renderBlogEdit(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  console.log(blogYangDipilih);
  res.render("blog-edit", { blog: blogYangDipilih, index: id });
}

function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("Judul Baru", title);
  console.log("Content Baru ", content);

  let image = "https://picsum.photos/200/120";
  let updatedBlog = {
    title: title,
    content: content,
    image: image,
    author: "Leo G",
    postedAt: new Date(),
  };

  blogs[id] = updatedBlog;

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  console.log(blogYangDipilih);

  blogs.splice(id, 1); // arrry amnipulation => perubahan data pada array

  res.redirect("/blog");
}

module.exports = {
  renderBlog,
  renderBlogDetail,
  renderBlogEdit,
  createBlogs,
  updateBlog,
  deleteBlog,
};
