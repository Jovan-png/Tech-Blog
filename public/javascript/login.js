
async function signup(){

    const username = document.querySelector('#uSign').value.trim();
    const email = document.querySelector('#eSign').value.trim();
    const password = document.querySelector('#pSign').value.trim();

    if(username && email && password){
     const response = await fetch('/api/users',{
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers:{ 'Content-Type': 'application/json'}
        })
      if(response.ok){
        document.location.replace('/login')
      }else{
          alert(response.statusText)
      }

    }

}
async function login(){
    
    const email = document.querySelector('#eLog').value.trim();
    const password = document.querySelector('#pLog').value.trim();

    if(email && password){
    const response = await  fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers:{ 'Content-Type': 'application/json'}
        })
        if(response.ok){
            document.location.replace('/')
        }else{
            alert(response.statusText)
        }
    }

}

document.querySelector('.lBtn').addEventListener('click', login)
document.querySelector('.sBtn').addEventListener('click', signup)