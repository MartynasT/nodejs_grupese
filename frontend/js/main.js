let token;
let url = 'http://localhost:3000/api/v1'
let user;

window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('eventauth')

  if (!token) return window.location.href = './login.html'

user = JSON.parse(localStorage.getItem('user'))
console.log(user.role)

if(user.role == "basic") {
    setUpNavBasic()
} else if (user.role =="admin") {
    setUpNavAdmin()
}
//   getAllEvents()
//   setUpNavBar()

})

// const getAllEvents = async () => {
//   let response = await fetch(`${url}/event`, {
//     method: 'GET'
//   })

//   let events = await response.json()
//   console.log(events)
//   showEvents(events)

// }

// const setUpNavBasic = async () => {
//   const logOutBtn = document.getElementById('login').innerHTML ="Log out"

// }
// const setUpNavAdmin = async () => {
//     const logOutBtn = document.getElementById('login').innerHTML ="Log out"
//     const createEventBtn = document.getElementById('register').innerHTML="Create event"
//     const profile = `<i class="fa fa-user" aria-hidden="true"></i>` 
//     const profileEl= document.getElementById("prof").append(profile)
//   }
  

// const showEvents = (events) => {

//   for (let event of events) {
//     let event = `<div class="all-events">
//     <article class="event event-small">
//       <div class="event-image" style="background-image: url(image.jpg)">
//         <h2>${event.title}</h2>
//       </div>
//       <div class="event--body">
//         <p>${event.eventContent}</p>
//         <div class="event--info"><span>Date:</span>${event.eventDate}</div>
//       </div>
//     </article>`
//     let cardContainer = document.getElementById('cardContainer')
//     cardContainer.innerHTML += card
//   }
// }

// const selectEvent = async (el, id) => {

// }

const logOut = async () => {
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