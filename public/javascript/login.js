
function signup(){

    const username = document.querySelector('#uSign').value.trim()
    const email = document.querySelector('#eSign').value.trim()
    const password = document.querySelector('#pSign').value.trim()

    if(username && email && password){
      fetch('/api/users',{
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers:{ 'Content-Type': 'application/json'}
        })
        .then(promise =>{
            console.log(promise)
        })
    }

}
function login(){
console.log('hi')
    
    const email = document.querySelector('#eSign').value.trim()
    const password = document.querySelector('#pSign').value.trim()

    if(email && password){
      fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers:{ 'Content-Type': 'application/json'}
        })
        .then(promise =>{
            console.log(promise)
        })
    }

}

document.querySelector('.lBtn').addEventListener('click', login)
document.querySelector('.sBtn').addEventListener('click', signup)