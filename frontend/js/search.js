let url = "http://localhost:3000/api/v1";
let category = localStorage.getItem("category");
let events;
let user;

window.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("eventauth");

  user = JSON.parse(localStorage.getItem("user"));

  userSavedEvents = user.savedEvent;
  if (!user) {
    user = {
      role: "guest",
      savedEvent: [],
    };
    localStorage.setItem("user", JSON.stringify(user));
  }
  getAllEvents();
});

const getAllEvents = async () => {
  let response = await fetch(`${url}/event`, {
    method: "GET",
  });

  events = await response.json();
  events = events.filter((obj) => {
    return obj.category === category;
  });

  showAllEvents(events);
};

const showAllEvents = (items) => {
  const eventsHolder = document.querySelector(".all-events");
  if (events.length === 0) {
    let error = document.createElement("p");
    error.innerText = "No events.";
    eventsHolder.appendChild(error);
  } else {
    items.forEach((item) => {
      let savedClass = "";
      if (user.role !== "guest") {
        if (userSavedEvents.includes(item._id)) {
          savedClass = "saved";
        }
      }

      let excerption = item.eventContent.slice(0, 200) + '...';
      let card = `
          <article class="event event-small" >
              <div class="event-image" style="background-image: url('${
        item.eventImage
      }')">
              ${
        item.active
          ? ""
          : '<span class="canceled-event">Event' + " canceled</span>"
      }
                <h2 id="event-title">${item.title}</h2>
              </div>
              <div class="event--body">
                  <div class="event--info d-flex-justify-between">
                      <div class="event--date"><span>Date:</span>${item.eventDate}</div>
                      ${user.role !== "guest" ? `
                       <div class="save-event ${savedClass}" onclick="saveEvent(this, '${item._id}')">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      `: ''}
                     
                  </div>
                <p>
                 ${excerption}
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
  }
};

const saveEvent = async (el, eventId) => {
  el.classList.toggle("saved");

  updateUserLocalStorage(eventId);

  let body = {
    eventId,
  };
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
    console.log(data);
    // console.log(response.json())
  } catch (e) {
    console.log(e);
  }
};

const updateUserLocalStorage = (id) => {
  console.log("event id :", id);
  console.log("user data:", user);

  if (user.savedEvent.includes(id)) {
    user.savedEvent = user.savedEvent.filter((event) => {
      if (event !== id) {
        return event;
      }
    });
  } else {
    console.log("doesn exists");
    user.savedEvent.push(id);
  }

  localStorage.setItem("user", JSON.stringify(user));

  console.log(user);
};

document.getElementById("eventMusic").addEventListener("click", function () {
  localStorage.setItem("category", "music");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventFamily").addEventListener("click", function () {
  localStorage.setItem("category", "family");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventComedy").addEventListener("click", function () {
  localStorage.setItem("category", "comedy");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventArt").addEventListener("click", function () {
  localStorage.setItem("category", "art");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventFair").addEventListener("click", function () {
  localStorage.setItem("category", "fair");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventConferences").addEventListener("click", function () {
  localStorage.setItem("category", "conferences");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
document.getElementById("eventWorkshops").addEventListener("click", function () {
  localStorage.setItem("category", "workshops");
  category = localStorage.getItem("category");
  document.querySelector(".all-events").innerHTML = "";
  getAllEvents();
});
