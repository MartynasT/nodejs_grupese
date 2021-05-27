let url = "http://localhost:3000/api/v1";
let token;
let user;

let userData;
let userSavedEvents;

window.addEventListener("DOMContentLoaded", () => {
  // user = localStorage.getItem('user');
  token = localStorage.getItem("eventauth");

  user = JSON.parse(localStorage.getItem("user"));

  // userSavedEvents = user.savedEvent;
  if (!user) {
    user = {
      role: "guest",
      savedEvent: [],
    };
    localStorage.setItem("user", JSON.stringify(user));
  }
  userSavedEvents = user.savedEvent;
  // if (!token) {
  //   window.location.href='./login.html'
  // }
  //
  // user = JSON.parse(localStorage.getItem('user'))
  //
  // getAllTweets();
  getAllEvents();
});

const getAllEvents = async () => {
  let response = await fetch(`${url}/event`, {
    method: "GET",
  });

  let events = await response.json();
  let today = new Date();
  const todayDate = new Date(today);
  let futureEvents = events.filter(event=>{
    const eventDate = new Date(event.eventDate);
    if (eventDate - todayDate > 0){
        return event
    }
    })
  showAllEvents(futureEvents);
  loadSliderEvents(futureEvents);
};

const showAllEvents = (items) => {
  const bigEventHollder = document.getElementById("bigEventHollder");
  const eventsHolder = document.querySelector(".all-events");

  items.forEach((item, index) => {
    let savedClass = "";
    if (user.role !== "guest") {
      if (userSavedEvents.includes(item._id)) {
        savedClass = "saved";
      }
    }

    let excerption = item.eventContent.slice(0, 200) + '...';


    // if (eventDate - todayDate > 0) {
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
      if (index > 0) {
        eventsHolder.innerHTML += card;
      } else {
        bigEventHollder.innerHTML += card;
      }
    // }
  });
};

const loadSliderEvents = (events) => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  events.forEach((item, index) => {
    if (index < 3) {
      let card = `
        <div class="swiper-slide" style="background-image: url('${item.eventImage}')">
            <div class="container" >
                <h2 class="title">${item.title}</h2>
            </div>
          </div>
          `;
      swiperWrapper.innerHTML += card;
    } else {
      const swiper = new Swiper(".swiper-container", {
        // Optional parameters
        direction: "horizontal",
        loop: true,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  });
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

const categoryList = document.querySelectorAll(".category");
categoryList.forEach((el) => {
  el.addEventListener("click", function () {
    let type = el.getAttribute("data-category");
    localStorage.setItem("category", type);
  });
});
