let blogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let image = document.getElementById("image");

  let imageFileName = URL.createObjectURL(image.files[0]);

  let blog = {
    title: title,
    content: content,
    image: imageFileName,
    author: "Leo G",
    postedAt: new Date(),
  };

  blogs.push(blog);

  console.log(blogs);

  renderBlog();
}

// formatDateToWIB();

function renderBlog() {
  let blogListElement = document.getElementById("blogList");

  blogListElement.innerHTML = firstBlogContent();

  for (let index = 0; index < blogs.length; index++) {
    console.log(blogs[index]);

    blogListElement.innerHTML += `
            <article class="blog-item">
                <div class="blog-item-img">
                    <img src="${blogs[index].image}" alt="">
                </div>
                <div class="blog-item-text">
                    <div class="blog-item-buttons">
                        <button class="blog-edit-button">Edit Blog</button>
                        <button class="blog-post-button">Post Blog</button>
                    </div>
                    <h1 class="blog-item-title">${blogs[index].title}</h1>
                    <p>${formatDateToWIB(blogs[index].postedAt)} | ${
      blogs[index].author
    }</p>
                    <p>${blogs[index].content}</p>
                    <p class="blog-item-relative-time">${getRelativeTime(
                      blogs[index].postedAt
                    )}</p>
                </div>
            </article>
        `;
  }
}

function firstBlogContent() {
  return `
        <article class="blog-item">
            <div class="blog-item-img">
                <img src="/img/shoes.jpg" alt="">
            </div>
            <div class="blog-item-text">
                <div class="blog-item-buttons">
                    <button class="blog-edit-button">Edit Blog</button>
                    <button class="blog-post-button">Post Blog</button>
                </div>
                <a href="blog-detail.html" style="text-decoration: none">
                    <h1 class="blog-item-title" >Pasar Coding Di Indonesia</h1>
                </a>
                <p>03 Feb 2025 11:22 WIB | Alex Josua</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda, voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto, unde magni enim itaque. Nostrum quod veniam quaerat modi ducimus accusamus dolorem, repellat iusto, autem, ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.</p>
                <p class="blog-item-relative-time">${getRelativeTime(
                  new Date(
                    "Mon Jan 03 2025 03:00:54 GMT+0700 (Western Indonesia Time)"
                  )
                )}</p>
                </div>
        </article>
    `;
}

function formatDateToWIB() {
  let date = new Date();
  let monthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = monthsList[date.getMonth()];
  let year = date.getFullYear();
  //   console.log(year);

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  //   console.log(`sekarang jam ${hours}:${minutes}`);

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  // console.log("Tanggal Format Baru", formattedDate);

  return formattedDate;
}

function getRelativeTime(postTime) {
  let now = new Date();
  console.log("Waktu Sekarang :", now);
  console.log("Waktu User Post :", postTime);

  let diffTime = now - postTime;
  console.log("diffTime waktu nya : ", diffTime);

  let diffInSeconds = Math.floor((now - postTime) / 1000);
  console.log("Ini hasil selisih : ", diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} Seconds ago`;
  }
  let diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  let diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  let diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  let diffInMonth = Math.floor(diffInDays / 30);
  return `${diffInMonth} month${diffInMonth === 1 ? "" : "s"} ago`;
}
