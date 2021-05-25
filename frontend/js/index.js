let url = 'http://localhost:3000/api/v1'
let token;

let userData;
let userSavedEvents;


window.addEventListener('DOMContentLoaded', ()=>{
  console.log('veikia')
  // user = localStorage.getItem('user');
  token = localStorage.getItem('eventauth')

  userData = JSON.parse(localStorage.getItem('user'));

  userSavedEvents = userData.savedEvent;
  console.log(userSavedEvents)
  // if (!token) {
  //   window.location.href='./login.html'
  // }
  //
  // user = JSON.parse(localStorage.getItem('user'))
  //
  // getAllTweets();
  getAllEvents();
})

const getAllEvents = async()=>{
  let response = await fetch(`${url}/event`, {
    method: 'GET',
  });

  let events = await response.json()
  console.log(events)
  showAllEvents(events)
  loadSliderEvents(events);
}


const showAllEvents = (items)=>{

  const bigEventHollder = document.getElementById('bigEventHollder');
  const eventsHolder = document.querySelector('.all-events');
  items.forEach((item, index)=>{

    let savedClass ='';
    if (userSavedEvents.includes(item._id)){
      savedClass = 'saved';
    }

    let card = `
          <article class="event event-small" >
              <div class="event-image" style="background-image: url('${item.eventImage}')">
                <h2>${item.title}</h2>
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
    if (index > 0){
      eventsHolder.innerHTML += card;
    } else {
      bigEventHollder.innerHTML += card
    }

  })
}

const loadSliderEvents = (events) =>{
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  events.forEach((item, index)=>{
    if (index < 3) {
      let card = `
        <div class="swiper-slide" style="background-image: url('${item.eventImage}')">
            <div class="container" >
                <h2 class="title">${item.title}</h2>
            </div>
          </div>
          `;
      swiperWrapper.innerHTML += card;
    }
    const swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      // init: false,
      speed: 500,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
    // setTimeout(swiper.init(), 2000)


  })


}

const saveEvent = async (el, eventId)=> {

  el.classList.toggle('saved');

  updateUserLocalStorage(eventId);

  let body = {
    eventId
  }
  try{
    let response = await fetch(`${url}/saveEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'eventauth': token,
      },
      body: JSON.stringify(body)

    });
    let data = await response.json();
    console.log(data)
    // console.log(response.json())
  } catch (e) {
    console.log(e)
  }
}

const updateUserLocalStorage = (id)=>{
  console.log('event id :', id)
  console.log('user data:', userData)

  if (userData.savedEvent.includes(id)){
    userData.savedEvent = userData.savedEvent.filter(event=>{
    if (event !== id){
      return event;
    }
    });
  }else {
    console.log('doesn exists')
    userData.savedEvent.push(id);
  }

  localStorage.setItem('user', JSON.stringify(userData))

  console.log(userData)

}