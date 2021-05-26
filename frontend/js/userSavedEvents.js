let url = "http://localhost:3000/api/v1";
let category = localStorage.getItem("category");
let events;

window.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("eventauth");
  getAllEvents();
});

const getAllEvents = async () => {
  let response = await fetch(`${url}/event`, {
    method: "GET",
  });

  events = await response.json();
  showAllEvents(events);
};

const showAllEvents = (items) => {
  user = JSON.parse(localStorage.getItem("user"));
  const eventsHolder = document.querySelector(".all-events");
  if (events.length === 0) {
    let error = document.createElement("p");
    error.innerText = "No events.";
    eventsHolder.appendChild(error);
  } else {
    userData = JSON.parse(localStorage.getItem("user"));

    userSavedEvents = userData.savedEvent;
    items.forEach((item) => {
      if (userData.savedEvent.includes(item._id)) {
        let savedClass = "";
        if (userSavedEvents.includes(item._id)) {
          savedClass = "saved";
        }
        let card = `
          <article class="event event-small" id="card">
              <div class="event-image" style="background-image: url('${item.eventImage}')">
                <h2>${item.title}</h2>
              </div>
              <div class="event--body">
                  <div class="event--info d-flex-justify-between">
                      <div class="event--date"><span>Date:</span>${item.eventDate}</div>
                      <div class="save-event ${savedClass}" onclick="saveEvent(this, '${item._id}')" >
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
      }
    });
  }
};

const saveEvent = async (el, eventId) => {
  if (
    confirm("Are you sure you want to remove this event from the database?")
  ) {
    el.classList.toggle("saved");

    updateUserLocalStorage(eventId);
    const eventsHolder = document.querySelector(".all-events");
    eventsHolder.innerHTML = "";
    getAllEvents();
    let body = {
      eventId,
    };
  } else {
    console.log("Event was not removed from the database.");
  }

  try {
    let response = await fetch(`${url}/saveEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        eventauth: token,
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();
  } catch (e) {}
};
const updateUserLocalStorage = (id) => {
  if (userData.savedEvent.includes(id)) {
    userData.savedEvent = userData.savedEvent.filter((event) => {
      if (event !== id) {
        return event;
      }
    });
  } else {
    userData.savedEvent.push(id);
  }

  localStorage.setItem("user", JSON.stringify(userData));
};
