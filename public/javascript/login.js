function signup(event){
    event.preventDefault();

    const username = document.querySelector('#uSign').value.trim()
    const email = document.querySelector('#eSign').value.trim()
    const password = document.querySelector('#pSign').value.trim()

}


document.querySelector('.sign-up').addEventListener('submit', signup)