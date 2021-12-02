
async function editPost() {
    const title = document.querySelector('#edit-post-title').value.trim();
    const text = document.querySelector('#edit-post-text').value.trim();


    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ]

if(title && text){
    const response = await fetch(`/api/posts/${post_id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText);
    }
}
}

document.querySelector('.edit-post').addEventListener('click', editPost);