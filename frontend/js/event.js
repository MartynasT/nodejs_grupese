let url = "http://localhost:3000/api/v1";
let category = localStorage.getItem("category");
let events;
let user;

window.addEventListener("DOMContentLoaded", () => {
  // token = localStorage.getItem("eventauth");
  const eventId = localStorage.getItem('EventId');
  user = JSON.parse(localStorage.getItem("user"));

  userSavedEvents = user.savedEvent;
  if (!user) {
    user = {
      role: "guest",
    };
    localStorage.setItem("user", JSON.stringify(user));
  }
  getEventInfo(eventId);
});


const getEventInfo = async (id) =>{
  let body = {
    id,
  };

  let response = await fetch(`${url}/getOneEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let event = await response.json();

  console.log(event)

  showEvent(event[0]);
  getOrgEvents(event[0].userId)
}

const showEvent = (event) =>{
  let heroImg = document.querySelector('.hero');
  let title = document.querySelector('.hero-event-info h1');
  let eventTitle = document.getElementById('eventTitle');
  let description = document.querySelector('.event--body p');
  let category = document.querySelector('.event-category span');
  let tickets = document.querySelector('.tickets-left');
  let price = document.querySelector('.tickets-price');

  let buyTicketBtn = document.getElementById('buyTicketBtn');
  buyTicketBtn.addEventListener('click', ()=>{
    showTicketModal(event)
  })

  category.innerText = event.category

  description.innerText = event.eventContent;
  title.innerText = event.title;
  eventTitle.innerText = event.title;
  heroImg.style.backgroundImage =  `url(${event.eventImage})`;
  tickets.innerText = event.tickets;
  price.innerText = event.price;
}

const showTicketModal = (event) =>{
  const div = document.createElement("div");
  div.classList.add("edit-modal");

  const h3 = document.createElement('h3');
  h3.classList.add('title');
  h3.innerText = event.title;

  let userName = `
    <div class="input-wrapper">
        <label for="userName">Enter your name</label>
        <input type="text" id="userName">
    </div>`;

  let userEmail = `
    <div class="input-wrapper">
        <label for="userEmail">Enter your email</label>
        <input type="email" id="userEmail">
    </div>`;

  let buttonCancel = document.createElement("button");
  buttonCancel.classList.add("btn", "btn-danger");
  buttonCancel.innerText = "Cancel";

  let buttonBuy = document.createElement("button");
  buttonBuy.classList.add("btn", "btn-primary");
  buttonBuy.innerText = `Buy ${event.price}eur.`;

  buttonCancel.addEventListener("click", () => {
    div.remove();
  });

  buttonBuy.addEventListener('click', ()=>{
    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;

    if (!userName && !userEmail){
      alert('Fill form')
    }else{
      processPayment(event, div, userName, userEmail);
    }
  })

  div.appendChild(h3)
  div.innerHTML += userName + userEmail;
  div.appendChild(buttonCancel)
  div.appendChild(buttonBuy)

  document.querySelector("body").appendChild(div);
}

const processPayment = async (event, el, name, email) =>{
  let tickets = document.querySelector('.tickets-left');
  tickets.innerText = Number(tickets.innerText) -1;

  let body = {
    id: event._id
  };
  try {
    let response = await fetch(`${url}/buyTicket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if(response.status !== 200) throw await response.json()


    let ticket = await response.json();

    let buyer = {
      name,
      email,
      event: event.title,
      eventDate: event.eventDate
    }

    localStorage.setItem('buyer', JSON.stringify(buyer));
    window.location.href = './thanks.html';

  }catch (e){
    console.log(e)
    alert(e)
  }


  el.remove();


}


const getOrgEvents = async (orgId) =>{
  let body = {
    id: orgId
  };

  let response = await fetch(`${url}/organizatorEventsForPage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let events = await response.json();

  console.log(events)
  showAllEvents(events)
}


const showAllEvents = (items) => {
  const eventsHolder = document.querySelector(".all-events");
  items.forEach((item, index) => {
    let savedClass = "";
    if(user.role !== 'guest') {

      if (userSavedEvents.includes(item._id)) {
        savedClass = "saved";
      }
    }

    let card = `
          <article class="event event-small" >
              <div class="event-image" style="background-image: url('${item.eventImage}')">
              ${item.active  ? '': '<span class="canceled-event">Event' +
      ' canceled</span>'}
                <h2 class="event-title">${item.title}</h2>
              </div>
              <div class="event--body">
                  <div class="event--info d-flex-justify-between">
                      <div class="event--date"><span>Date:</span>${item.eventDate}</div>
                      <div class="save-event ${savedClass}" onclick="saveEvent(this, '${item._id}')">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                  </div>
                <p>
                 ${item.eventContent}
                </p>
                <button id="readMore" onclick="goToEvent('${item._id}')">Read more...  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button> 
                
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

      eventsHolder.innerHTML += card;
  });
};

