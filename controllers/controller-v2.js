const { Sequelize, where, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Blog, User } = require("../models");

const sequelize = new Sequelize(config.development);

const saltRounds = 10;

async function renderHome(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);
  res.render("index", { user: user });
}

async function renderContact(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);
  res.render("contact", { user: user });
}

async function renderTestimonials(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);
  res.render("testimonial", { user: user });
}

async function renderLogin(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  if (user) {
    req.flash("warning", "user already login");
    res.redirect("/");
  }
  res.render("auth-login", { user: user });
}

async function renderRegister(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  if (user) {
    res.redirect("/");
  }
  res.render("auth-register", { user: user });
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  //   console.log(`yang mau login : ${email} ${password}`);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    req.flash("error", "user tidak ditemukan");
    return res.redirect("/login");
  }

  //   console.log("usernya ada !", user);
  //check passwordnya salah
  const isVAlidated = await bcrypt.compare(password, user.password);

  if (!isVAlidated) {
    req.flash("error", "password missmatch");
    return res.redirect("/login");
  }

  let loggedInUser = user.toJSON(); // convert dari object sequelize ke object biasa

  delete loggedInUser.password; // menghapus properti password

  console.log("user setelah passwordnya di delete:", loggedInUser);
  req.session.user = loggedInUser;

  req.flash("success", `Selamat Datang ${loggedInUser.name}`);
  res.redirect("/index");
}

async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body; // object destructuring

  if (password != confirmPassword) {
    req.flash("error", "password Tidak Sama");
    return res.redirect("/register");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    req.flash("error", "Email Sudah Terpakai");
    return res.redirect("/register");
  }
  //   console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  //   console.log(newUser);

  const userInsert = await User.create(newUser);

  req.flash("success", "berhasil mendafar silahkan Login");
  res.redirect("/login");
}

async function authLogout(req, res) {
  //hapus user dari session
  req.session.user = null;

  res.redirect("/login");
}

async function renderBlog(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  const blogs = await Blog.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });

  console.log("hasil fetch data dari controller v2", blogs);

  // console.log("pemilik blog paling atas :", blogs[0].user);

  if (user) {
    res.render("blog-list", { blogs: blogs, user: user });
  } else {
    res.render("blog-list", { blogs: blogs });
  }
}

async function renderBlogDetail(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

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
    res.render("blog-detail", { blog: blogYangDipilih, user: user }); //tidak perlu index
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
  const user = req.session.user;

  if (!user) {
    req.flash("error", "Please login.");
    return res.redirect("/login");
  }
  // create blog submission
  const { title, content } = req.body; // title dan content adalah properti milik req.body

  let dummyImage = "https://picsum.photos/200/150";

  const image = req.file.path;
  console.log("image yg di upload :", image);

  const newBlog = {
    title, // ini sama saja dengan menuliskan title: title
    content,
    authorId: user.id,
    image: image,
  };

  const resultSubmit = await Blog.create(newBlog); // apa result nya ketika disubmit, gagal atau berhasil?

  res.redirect("/blog"); // URL, bukan nama file
}

async function renderBlogEdit(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);
  const id = req.params.id;

  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.redirect("/login");
  }

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 blog detail : ", blogYangDipilih);
    res.render("blog-edit", { blog: blogYangDipilih, user: user }); //tidak perlu index
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

async function renderError(req, res) {
  res.render("page-404");
}

module.exports = {
  renderHome,
  renderContact,
  renderTestimonials,
  authLogin,
  authRegister,
  authLogout,
  renderLogin,
  renderRegister,
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderBlogCreate,
  createBlog,
  renderBlogEdit,
  updateBlog,
  renderError,
};
