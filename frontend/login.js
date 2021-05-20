let url = "http://localhost:3000/api/v1";

document.getElementById("loginUser").addEventListener("click", async (e) => {
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
    if (response.status != 200) throw await response.json();
    //is response headerio pasiemam tokena kuri siunciam is serverio
    let token = response.headers.get("eventauth");

    //tokena issaugom localstorage (narsykleje)
    localStorage.setItem("eventauth", token);
    //Issaugom userio duomenis localstorate
    localStorage.setItem("user", await JSON.stringify(await response.json()));
    // siunciam useri i homepage
    window.location.href = "index.html";
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
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
});
