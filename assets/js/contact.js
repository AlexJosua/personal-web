function submitForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let Email = document.getElementById("Email").value;
  let subject = document.getElementById("subject").value;
  let Skill = document.getElementById("Skill").value;
  let Message = document.getElementById("Message").value;

  //   alert(`name : ${name} \n
  //         email : ${Email}\n
  //         subject : ${subject}\n
  //         skill : ${Skill}\n
  //         Message : ${Message}`);

  let emailTujuan = "alexjosua62@gmail.com";
  let a = document.createElement("a");

  a.href = `mailto:${emailTujuan}?subject=${subject}&body=${`Halo , Nama saya ${name}. Silahkan Hubungi ${Email}. skill yang saya miliki ${Skill}. Berikut yang ingin saya sampaikan : ${Message}`}`;

  a.click();
}
