let token;
let url = 'http://localhost:3000/api/v1';
let user;


window.addEventListener('DOMContentLoaded', ()=>{
  console.log('veikia')
  user = localStorage.getItem('user');
  token = localStorage.getItem('eventauth')
  user = JSON.parse(localStorage.getItem('user'))

  if(!user){
    user = {
     role: 'guest',
   }
   localStorage.setItem('user',JSON.stringify(user) )
 }


  if (user.role != "admin" ) {
    window.location.href='./index.html'
  }



})

//create Event
document.getElementById('eventForm').addEventListener('submit', async(e)=>{
  e.preventDefault()

  const formData = new FormData()
  let eventImage = document.getElementById('eventImg');

  let eventTitle = document.getElementById('eventTitle').value;
  let eventDate = document.getElementById('eventDate').value;
  let eventLocation = document.getElementById('eventLocation').value;
  let content = document.getElementById('eventInfo').value;
  let eventCategory = document.getElementById('eventCategory').value;
console.log(eventCategory)
  if(!content && !eventDate && !eventTitle && !eventLocation) alert('Provide content')

  if (eventImage.files !== 0 ){
    formData.append('image', eventImage.files[0])
  }

  formData.append('eventTitle', eventTitle);
  formData.append('eventDate', eventDate);
  formData.append('eventLocation', eventLocation);
  formData.append('content', content);
  formData.append('category', eventCategory);

  try{
    let response = await fetch(`${url}/event`,{
      method: "POST",
      headers: {
        'eventauth': token,
      },
      body:formData
    })

    if(response.status !== 200) throw await response.json()

    let data = await response.json();
    console.log(data)

    // document.getElementById('eventTitle').value = '';
    // document.getElementById('eventDate').value = '';
    // document.getElementById('eventLocation  ').value = '';
    // document.getElementById('content').value = '';

  } catch (e){
    alert(e)
    console.log(e)
  }
})