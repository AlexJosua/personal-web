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
  const blogs = await sequelize.query(
    `
    SELECT * FROM public."Blogs" ORDER BY "createdAt" DESC `, // raw query
    {
      type: QueryTypes.SELECT,
    }
  );
  //   console.log(blogs);
  res.render("blog-list", { blogs: blogs });
}

async function renderBlogDetail(req, res) {
  const id = req.params.id;

  const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
  const blogYangDipilih = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  //   console.log(blogYangDipilih);

  res.render("blog-detail", { blog: blogYangDipilih[0] });
}

async function createBlogs(req, res) {
  // const title = req.body.title;
  // const content = req.body.content;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("Judulnya title", title);
  console.log("Content nya ", content);

  let image = "https://picsum.photos/200/120";

  let query = `INSERT INTO "Blogs" (title, content, image)
                VALUES ('${title}', '${content}','${image}')`;

  const newblog = await sequelize.query(query, {
    type: QueryTypes.INSERT,
  });

  //   blogs.push(blog);

  res.redirect("/blog");
}

async function renderBlogEdit(req, res) {
  const id = req.params.id;
  const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
  const blogYangDipilih = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  res.render("blog-edit", { blog: blogYangDipilih[0] });
}

async function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("Judul Baru", title);
  console.log("Content Baru ", content);

  const query = `UPDATE "Blogs"
                SET title = '${title}', content = '${content}'
                WHERE id = ${id}`;

  const updatedResult = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
  });

  console.log("result update : ", updatedResult);
  //   let image = "https://picsum.photos/200/120";
  //   let updatedBlog = {
  //     title: title,
  //     content: content,
  //     image: image,
  //     author: "Leo G",
  //     postedAt: new Date(),
  //   };

  //   blogs[id] = updatedBlog;

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const id = req.params.id;

  const query = `DELETE FROM "Blogs" WHERE id = ${id}`;
  const deleteResulted = await sequelize.query(query, {
    type: QueryTypes.DELETE,
  });

  console.log("result query deletenya ", deleteResulted);
  //   blogs.splice(id, 1); // arrry amnipulation => perubahan data pada array

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
