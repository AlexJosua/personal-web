const { Sequelize, where } = require("sequelize");
const config = require("../config/config.json");
const { Blog } = require("../models");

const sequelize = new Sequelize(config.development);

async function renderBlog(req, res) {
  const blogs = await Blog.findAll({
    order: [["createdAt", "DESC"]],
  });

  console.log("hasil fetch data dari controller v2 : ", blogs);
  res.render("blog-list", { blogs: blogs });
}

async function renderBlogDetail(req, res) {
  const id = req.params.id;

  //type data nya adalah object bukan array
  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 blog detail : ", blogYangDipilih);
    res.render("blog-detail", { blog: blogYangDipilih }); //tidak perlu index
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const deleteResult = await Blog.destroy({
    where: {
      id: id,
    },
  });

  console.log("result delete: ", deleteResult);

  res.redirect("/blog");
}

async function renderBlogCreate(req, res) {
  //render edit
  res.render("blog-create");
}

async function createBlog(req, res) {
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("Judulnya title", title);
  console.log("Content nya ", content);

  let dummyImage = "https://picsum.photos/200/120";

  const newBlog = {
    title, // ini sama saja dengan menuliskan title: title
    content, // ini sama saja dengan menuliskan content: content
    image: dummyImage,
  };

  const resultSubmit = await Blog.create(newBlog);
  console.log("result creating blog", resultSubmit);

  res.redirect("/blog"); //ini adalah url bukan nama file
}

async function renderBlogEdit(req, res) {
  const id = req.params.id;

  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 blog detail : ", blogYangDipilih);
    res.render("blog-edit", { blog: blogYangDipilih }); //tidak perlu index
  }
}

async function updateBlog(req, res) {
  // update blog submision
  const id = req.params.id;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("Judulnya title", title);
  console.log("Content nya ", content);

  const updateResult = await Blog.update(
    {
      //form edit
      title,
      content,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id,
      },
    }
  );
  console;

  res.redirect("/blog");
}

module.exports = {
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderBlogCreate,
  createBlog,
  renderBlogEdit,
  updateBlog,
};
