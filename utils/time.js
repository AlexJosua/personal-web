function formatDateToWIB(date) {
  //   let date = new Date();
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
  // console.log("Waktu Sekarang :", now);
  // console.log("Waktu User Post :", postTime);

  let diffTime = now - postTime;
  // console.log("diffTime waktu nya : ", diffTime);

  let diffInSeconds = Math.floor((now - postTime) / 1000);
  // console.log("Ini hasil selisih : ", diffInSeconds);

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

module.exports = {
  formatDateToWIB,
  getRelativeTime,
};
