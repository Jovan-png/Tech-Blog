

async function commentForm() {
    const c_text = document.querySelector('textarea[name="comment-body"]').value.trim();

const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
]
if(c_text){
    const response = await fetch('/api/comments',{
        method: 'POST',
        body: JSON.stringify({
            c_text,
            post_id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        document.location.reload()
    }else{
        alert(response.statusText);
    }
}



}


document.querySelector('.comment-container').addEventListener('click', commentForm)