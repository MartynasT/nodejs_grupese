let buyer;

window.addEventListener("DOMContentLoaded", () => {
  buyer = JSON.parse(localStorage.getItem("buyer"));

  console.log(buyer)

  showBuyerInfo(buyer)
});

const showBuyerInfo = (buyer) =>{
  let moreInfo = document.getElementById('moreInfo');
  let eventTitle = `<div><p>Event title: ${buyer.event}</p></div>`;

  let userName = `<div><p>Buyer: ${buyer.name}</p></div>`;

  let userEmail = `<div><p>Buyer email: ${buyer.email}</p></div>`;
  let date = `<div><p>Event dat: ${buyer.eventDate}</p></div>`;

  moreInfo.innerHTML = eventTitle+userName+userEmail+date;
}