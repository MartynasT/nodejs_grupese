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
      let card = `
    <!--        <div class="card mb-3 p-3 w-50" >-->
              <article class="event event-small">
                <div class="event-image" style="background-image: url('${item.eventImage}')">
    <!--            <img src="${item.eventImage}" style="width: 100%; display: block; height: auto;" alt="">-->
                  <h2>${item.title}</h2>
                </div>
                <div class="event--body">
                  <p>
                    ${item.eventContent}
                  </p>
                  <button id="readMore" onclick="goToEvent('${item._id}')">Read more...  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button> 
                  <div class="event--info"><span>Date:</span>2021-05-12</div>
                  <span onclick="saveEvent(this, '${item._id}')">💾</span>
                </div>
              </article>`;

      eventsHolder.innerHTML += card;
    });
  }
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
