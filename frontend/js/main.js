window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('eventauth')
  let user;
  // if (!token) return window.location.href = './login.html'

user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
// console.log(user.role)

  if(!user){
     user = {
      role: 'guest',
    }
    localStorage.setItem('user',JSON.stringify(user) )
  }

if(user.role == "basic") {
    setUpNavBasic()
} else if (user.role =="admin") {
    setUpNavAdmin()
} else {
  setUpNav()
}
})

const setUpNavBasic = async () => {

  const HomeBtn = document.createElement('a')
  HomeBtn.innerText="Home"
  HomeBtn.href="./"
  
  const SavedEventsBtn = document.createElement('a')
  SavedEventsBtn.innerText="Saved events"
  SavedEventsBtn.href="./userSavedEvents.html" 
  
  const LogOutBtn = document.createElement('button')
  LogOutBtn.innerText="Log out"
  LogOutBtn.setAttribute("type", "button")
  LogOutBtn.setAttribute("onclick", "logOut()")
  LogOutBtn.classList.add=("navBtn")

  const header = document.getElementById('header')
  header.append(HomeBtn)
  header.append(SavedEventsBtn)
  header.append(LogOutBtn)

}
const setUpNavAdmin = async () => {

  const CreatedEventsBtn = document.createElement('a')
  CreatedEventsBtn.innerText="Created Events"
  CreatedEventsBtn.href="./orgEvents.html" 

  const HomeBtn = document.createElement('a')
  HomeBtn.innerText="Home"
  HomeBtn.href="./index.html"
  
  const CreateEventBtn = document.createElement('a')
  CreateEventBtn.innerText="Create event"
  CreateEventBtn.href="./createEvent.html" 
  
  const LogOutBtn = document.createElement('button')
  LogOutBtn.innerText="Log out"
  LogOutBtn.setAttribute("type", "button")
  LogOutBtn.setAttribute("onclick", "logOut()")

  const header = document.getElementById('header')
  header.append(CreatedEventsBtn)
  header.append(HomeBtn)
  header.append(CreateEventBtn)
  header.append(LogOutBtn)

  }
  const setUpNav = async () => { 
    const LoginBtn = document.createElement('button')
    LoginBtn.innerText="Login"
    LoginBtn.setAttribute("type", "button")
    LoginBtn.setAttribute('onclick', 'location.href="./login.html"')
  
    const RegisterBtn = document.createElement('button')
    RegisterBtn.innerText="Register"
    RegisterBtn.setAttribute("type", "button")
    RegisterBtn.classList.add('dark-btn')
    RegisterBtn.setAttribute('onclick', 'location.href="./register.html"')

    const header = document.getElementById('header')
  header.append(RegisterBtn)
  header.append(LoginBtn)
 

  }


const logOut = async () => {
  let url = "http://localhost:3000/api/v1";
  let response = await fetch(`${url}/user/logOut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'eventauth': token
    }
  })

  localStorage.removeItem('eventauth')
  localStorage.removeItem('user')

  window.location.href = './login.html'

}

