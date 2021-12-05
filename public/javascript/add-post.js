

async function newPostForm() {
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

if(title && text){
    const response = await fetch('/api/posts',{
        method: 'POST',
        body: JSON.stringify({
            title,
            text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(err=>{
        console.log(err)
    })
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText);
    }
}
}

document.querySelector('.create_post').addEventListener('click', newPostForm);