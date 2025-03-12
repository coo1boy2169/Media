fetch('index.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('post');

        // You can use a list of nice pastel/baby colors or generate random ones
        const colors = ['#66ccff', '#ff99cc', '#99ffcc', '#ffcc99', '#cc99ff', '#ff6666' , '#ffcc00', '#ccff00', '#00ccff', '#ff00cc'];

        data.forEach(item => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="post_container">
                    <div class="post_row">
                        <div class="user_profile">
                            <img src="user.png" alt="User Profile">
                            <p class="name" style="color: ${randomColor};">${item.name} ${item.last_name}</p>
                        </div>
                        <a href=""><i class="fa fa-ellipsis-v"></i></a>
                    </div>
                    <p class="post_text">${item.text}</p>
                    <img src="${item.image}" alt="Feedback" class="post_img">
                    <div class="post_row">
                        <div class="activity_icon">
                            <div><img class="icon" src="like.jpg" alt="Like">${item.likes}</div>
                            <div><img class="icon" src="coment.png" alt="Comment">${item.comments}</div>
                            <div><img class="icon" src="share.png" alt="Share">${item.shares}</div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching data:', error));



    // for the img to te voegen
    document.querySelector('.create-post button').addEventListener('click', function () {
        const postContent = document.querySelector('.create-post textarea').value.trim();
        const imageInput = document.querySelector('.create-post .image-upload');
        const file = imageInput.files[0];
    
        if (postContent === '' && !file) {
            alert('Please write something or select an image.');
            return;
        }
    
        const postElement = document.createElement('div');
        postElement.classList.add('post');
    
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
    
        const userAvatar = document.createElement('img');
        userAvatar.src = 'user.png';
        userAvatar.alt = 'User Avatar';
    
        const userName = document.createElement('span');
        userName.textContent = 'User Name';
    
        postHeader.appendChild(userAvatar);
        postHeader.appendChild(userName);
    
        const postContentElement = document.createElement('div');
        postContentElement.classList.add('post-content');
    
        if (postContent !== '') {
            const postText = document.createElement('p');
            postText.textContent = postContent;
            postContentElement.appendChild(postText);
        }
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const postImage = document.createElement('img');
                postImage.src = e.target.result;
                postImage.alt = 'Uploaded Image';
                postImage.classList.add('uploaded-img');
    
                postContentElement.appendChild(postImage);
                postElement.appendChild(postHeader);
                postElement.appendChild(postContentElement);
    
                document.querySelector('.news-feed').insertBefore(postElement, document.querySelector('.news-feed .post'));
    
                // Clear inputs
                document.querySelector('.create-post textarea').value = '';
                imageInput.value = '';
            };
            reader.readAsDataURL(file);
        } else {
            postElement.appendChild(postHeader);
            postElement.appendChild(postContentElement);
            document.querySelector('.news-feed').insertBefore(postElement, document.querySelector('.news-feed .post'));
    
            // Clear inputs
            document.querySelector('.create-post textarea').value = '';
            imageInput.value = '';
        }
    });
    