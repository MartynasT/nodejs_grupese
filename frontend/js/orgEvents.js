let url = "http://localhost:3000/api/v1";
let user;

let token;
window.addEventListener('DOMContentLoaded', ()=>{
  console.log('veikia')
  user = localStorage.getItem('user');
  token = localStorage.getItem('eventauth')
  user = JSON.parse(localStorage.getItem('user'))
  if (!token || user.role != 'admin') {
    window.location.href='./index.html'
  }



  getEvents()
})


let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = `${yyyy}-${mm}-${dd}`;
console.log(today)

const getEvents = async ()=> {
  let response = await fetch(`${url}/organizatorEvents`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'eventauth': token
    }
  })

  let events = await response.json();

  console.log(events)

  showOrgEvents(events)
}

const showOrgEvents = (items) => {
  const eventsHolderFuture = document.querySelector(".all-events");
  const eventsHolderPast = document.querySelector(".all-events.past-events");
  items.forEach((item, index) => {

    const eventDate = new Date(item.eventDate);
    const todayDate = new Date(today);



    let card = `
          <article class="event event-small" >
              <div class="event-image" style="background-image: url('${item.eventImage}')">
                <h2>${item.title}</h2>
              </div>
              <div class="event--body">
                  <div class="event--info d-flex-justify-between">
                      <div class="event--date"><span>Date:</span>${item.eventDate}</div>
                  </div>
                <p>
                 ${item.eventContent}
                </p>
                <div class="event-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>${item.location}</span>
                </div>
                <div class="event-category">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    <span>${item.category}</span>
                </div>
              </div>
            </article>`;
    if (+eventDate >= +todayDate){
      eventsHolderFuture.innerHTML += card;
    }else{
      eventsHolderPast.innerHTML += card;
    }


  });
};