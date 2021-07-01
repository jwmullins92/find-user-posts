const showPosts = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users/').then(response => response.json())
    const tableBody = document.querySelector('#table-body')
    const postArea = document.querySelector('#post-area')
    const userPosts = document.querySelector('#user-posts')
    let tableElement
    let posts
    const renderTable = async () => {
        for (let user of users) {
            const newRow = document.createElement('tr')
            tableBody.append(newRow)
            for (let i = 1; i <= 5; i++) {
                tableElement = document.createElement('td')
                tableElement.classList.add('py-3')
                if (i === 1) {
                    tableElement = document.createElement('th')
                    tableElement.classList.add('py-3')
                    tableElement.setAttribute('scope', 'row')
                    tableElement.innerText = user.id
                } else if (i === 2) {
                    postLink = document.createElement('button')
                    postLink.classList.add('post-link')
                    postLink.setAttribute('type', 'submit')
                    postLink.setAttribute('value', `${user.id}`)
                    postLink.innerText = user.username
                    tableElement.append(postLink)
                } else if (i === 3) {
                    tableElement.innerText = user.name
                } else if (i === 4) {
                    tableElement.innerText = user.email
                } else if (i === 5) {
                    tableElement.innerText = user.website
                }
                newRow.append(tableElement)
            }
        }
    }
    await renderTable()
    const links = document.querySelectorAll('.post-link')
    for (let link of links) {
        link.addEventListener('click', async (e) => {
            while (userPosts.children.length) {
                userPosts.removeChild(userPosts.children[0])
            }
            let userTitle = document.createElement('li')
            for (let user of users) {
                console.log('hello')
                if (parseInt(user.id) === parseInt(link.value)) {
                    userTitle.classList.add('fs-2', 'fw-bold', 'list-group-item', 'py-3')
                    userTitle.innerText = `${user.username}'s Posts`
                }
            }
            userPosts.append(userTitle)
            posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${link.value}`).then(response => response.json())
            for (let post of posts) {
                let postItem = document.createElement('li')
                postItem.classList.add('list-group-item', 'mx-0', 'py-3')
                let postTitle = document.createElement('h3')
                let postBody = document.createElement('p')
                postTitle.innerText = post.title
                postBody.innerText = post.body
                postItem.append(postTitle)
                postItem.append(postBody)
                userPosts.append(postItem)
            }
        })
    }
}

showPosts()