
    const LoginBtn = document.createElement('button')
    LoginBtn.innerText="Login"
    LoginBtn.setAttribute("type", "button")
    LoginBtn.setAttribute('onclick', 'location.href="./login.html"')
  
    const RegisterBtn = document.createElement('button')
    RegisterBtn.innerText="Register"
    RegisterBtn.setAttribute("type", "button")
    RegisterBtn.classList.add('dark-btn')
    RegisterBtn.setAttribute('onclick', 'location.href="./register.html"')

    const header = document.getElementById('header')
    header.append(RegisterBtn)
    header.append(LoginBtn)