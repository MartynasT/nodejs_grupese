let url = 'http://localhost:3000/api/v1'
let token;


window.addEventListener('DOMContentLoaded', ()=>{
  console.log('veikia')
  // user = localStorage.getItem('user');
  token = localStorage.getItem('eventauth')
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
}


const showAllEvents = (items)=>{
  const eventsHolder = document.querySelector('.all-events');
  items.forEach((item)=>{
    console.log(item);

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
              <div class="event--info"><span>Date:</span>2021-05-12</div>
              <span onclick="saveEvent(this, '${item._id}')">💾</span>
            </div>
          </article>`;

    eventsHolder.innerHTML += card;
    // div.innerHTML = card;

    // let cardContainer = document.getElementById('contentAll');
    // cardContainer.appendChild(div);
    //
    // let likeTweetBtn = div.querySelector('.bi.bi-heart-fill');
    // let tweetId = item._id;
    //
    // likeTweetBtn.addEventListener('click', ()=>{
    //   let likes = likeTweetBtn.nextElementSibling;
    //   likes.innerText = Number(likes.innerText) +1;
    //
    // })
  })
}

const saveEvent = async (el, eventId)=> {
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