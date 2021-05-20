let url = "http://localhost:3000/api/v1";
<<<<<<< Updated upstream

document.getElementById("loginUser").addEventListener("click", async (e) => {
=======
console.log("veikia");
document.getElementById("login").addEventListener("click", async (e) => {
>>>>>>> Stashed changes
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email || !password) return alert("Enter email and password");

  let body = {
    email,
    password,
  };
  try {
    let response = await fetch(`${url}/user/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
<<<<<<< Updated upstream
    if (response.status != 200) throw await response.json();
    //is response headerio pasiemam tokena kuri siunciam is serverio
    let token = response.headers.get("eventauth");

    //tokena issaugom localstorage (narsykleje)
    localStorage.setItem("eventauth", token);
    //Issaugom userio duomenis localstorate
    localStorage.setItem("user", await JSON.stringify(await response.json()));
    // siunciam useri i homepage
    // window.location.href = "./";
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
});

document.getElementById("loginOrg").addEventListener("click", async (e) => {
  e.preventDefault();

  let email = document.getElementById("email1").value;
  let password = document.getElementById("password1").value;

  if (!email || !password) return alert("Enter email and password");

  let body = {
    email,
    password,
  };
  try {
    let response = await fetch(`${url}/user/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status != 200) throw await response.json();
    //is response headerio pasiemam tokena kuri siunciam is serverio
    let token = response.headers.get("eventauth");

    //tokena issaugom localstorage (narsykleje)
    localStorage.setItem("eventauth", token);
    //Issaugom userio duomenis localstorate
    localStorage.setItem("user", await JSON.stringify(await response.json()));
    // siunciam useri i homepage
    // window.location.href = "./";
=======
    // jeigu atsakymas is serverio yra klaida (kitaip sakant ne 200) tada stabdome funckija ir numetam i catch blocka
    if (response.status != 200) throw await response.json();
    //is response headerio pasiemam tokena kuri siunciam is serverio
    let token = response.headers.get("twitterauth");

    //tokena issaugom localstorage (narsykleje)
    localStorage.setItem("twitterauth", token);
    //Issaugom userio duomenis localstorate
    localStorage.setItem(
      "twitter-user",
      await JSON.stringify(await response.json())
    );
    // siunciam useri i homepage
    window.location.href = "./";
>>>>>>> Stashed changes
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
});
