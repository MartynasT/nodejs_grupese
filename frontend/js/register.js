let url = 'http://localhost:3000/api/v1'


document.getElementById('user-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  if (!email || !password) return alert('Fill in form')

  let body = {
    email,
    password
  }
  let response = await fetch(`${url}/user/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  console.log(response)
  if (response.status != 200) return alert('Something went wrong')

  let data = await response.json()

  console.log(data)

  window.location.href = './login.html'

})

//ORGANIZATOR ==================================

document.getElementById('org-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    let orgName = document.getElementById("org-name").value
    let email = document.getElementById('email-org').value
    let password = document.getElementById('password-org').value
  
    if (!email || !password || !orgName) return alert('Fill in form')
  
    let body = {
      email,
      password,
      organization: orgName,
      role: 'admin'
    }
    let response = await fetch(`${url}/user/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    console.log(response)
    if (response.status != 200) return alert('Something went wrong')
  
    let data = await response.json()
  
    console.log(data)
  
    window.location.href = './login.html'
  
  })
  