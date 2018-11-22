// global vars
var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;
//

// User Constructor
function User(username,password) {
    this.username = username;
    this.password = password;
    this.date_created = new Date();
    this.comments = [];
    this.posts = [];
    this.votes = {
        up   : [],
        down : []
    }
}

User.prototype = {
    createPost : function(subreddit,title,content) {
        let post = {
            post_id: post_count,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            title: title,
            user: this.username,
            content: content,
            subreddit: subreddit
        }
        this.posts.push(post);
        post_count ++;
    },
    createComment : function(post_id,content) {
        let comment = {
            comment_id: comment_count + 1,
            post_id: post_id,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            content: content,
            subreddit: subreddit
        }
        this.posts.push(post);
    },
    upvotePost : function(post_id) {
        if (this.votes.up.find(upvotedPost => upvotedPost == post_id)) {
            console.log("this user has already voted on this post");
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = allPosts.find(post => post.post_id == post_id);

            thisPost.upvotes++;
            this.votes.up.push(post_id);
            console.log('this post was upvoted',thisPost);
        }
    },
    downvotePost : function(post_id) {
        if (this.votes.down.find(downvotedPost => downvotedPost == post_id)) {
            console.log("this user has already voted on this post");
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = allPosts.find(post => post.post_id == post_id);

            thisPost.downvotes++;
            this.votes.down.push(post_id);
            console.log('this post was downvoted',thisPost);
        }
    },
    // User.upvote('post',1)
    upvote : function(type,post_id) {
        if (this.votes.up.find(upvoted => upvoted == post_id)) {
            console.log("this user has already voted on this " + type);
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = getThisPost(post_id);

            thisPost.upvotes++;
            this.votes.up.push(post_id);
            console.log('this post was upvoted',thisPost);
        }
    },
}

// admin functions

function createUser(username,password) {
    users.push(new User(username,password));
}

function findUser(username) {
    console.log(
        users.filter(user => user.username == username)
    );
}

function getAllPosts() {
    let allPosts = [];
    users.forEach(function (user) {
        user.posts.forEach(function(post) {
            allPosts.push(post);
        })
    });
    return allPosts;
}

function getThisPost(post_id) {
    return getAllPosts().find(post => post.post_id == post_id);
}

var x,y;
function getUserFromPost(post_id) {
    //debugger;

    var thisPost = getAllPosts().find(post => post.post_id == post_id);
    console.log('Posted by',thisPost.user);
    return thisPost.user;
}

function sortByVotes(type,id) {}

// making sample users
createUser("charlie","pass");
createUser("coolguy1","hunter2");

users[0].createPost('sub','mytitle','somecontent');
users[0].createPost('sub2','atitle','somecontent2');
users[1].createPost('hey','sometitle','something');



/*
============================
----------- DOM ------------
============================
*/

// COMPONENTS

var $display = $("[hook-js=display]");
var $usersDropdown = $("[hook-js=select-user]");
var $newPostBtn = $("[hook-js=new-post]");
var $modal = $("[hook-js=modal]");

function drawPost(post_id) {
    var post = getThisPost(post_id);
    
    $display.append($(`
        <div class="post" data-post-id="${post.post_id}">
            <div class="post__votes__wrap">
                <button class="post__votes__upvote">${post.upvotes}</button>
                <button class="post__votes__downvote">${post.downvotes}</button>
            </div>
            <div class="post__main">
                <h3 class="post__header">${post.title}</h3>
                <div class="post__details">
                    <span class="post__detail">${post.subreddit}</span>
                    <span class="post__detail">${post.user}</span>
                    <span class="post__detail">${post.date_posted}</span>
                </div>
                <div class="post__controls">
                    <span>
                        <label for="showPost">Show Post</label>
                        <input type="checkbox" name="showPost">
                    </span>
                    <span>
                        <label for="showComments">Show Comments</label>
                        <input type="checkbox" name="showComments">
                    </span>
                    <button class="post__controls__btn">Post Comment</button>

                </div>
            </div>
        </div>
    `));
}

function populateUsersDropdown() {
    users.forEach(function(user) {
        $usersDropdown.append(
            $(`
                <option value="${user.username}">
                    ${user.username}
                </option>
            `)
        );
    });
}




// COMPONENT MACROS

// function sortPosts(sortType) {}

function drawAllPosts(sortedPosts) {
    sortedPosts.forEach(function(post) {
        drawPost(post.post_id);
    });
}

function drawNewPostModal() {
    
}

//making newpostmodal into an object

var NewPostModal = function() {
    var $currentModal;
    this.draw = function() {
        $("body").append($(`
            <section class="modal__wrap" data-user="${currentUser.username}" modal-js="modal">
                <div class="modal">
                    <h1>New Post</h1>
                    <form onSubmit="e.preventDefault">
                        <label for="title">Title</label>
                        <input type="text" id="title">
                        <label for="sub">Subreddit</label>
                        <input type="text" id="sub">
                        <label for="content">Content</label>
                        <textarea name="" id="content" cols="30" rows="10"></textarea>
                        <button modal-js="submit">Submit</button>
                    </form>
                </div>
            </section>
        `));
        $(`[modal-js=modal]`).on('click',function(e){
            currentUser.newPost.delete();
        }).children().click(function(){
            return false;
        });
        $(`[modal-js=submit]`).on('click',function(e){
            e.preventDefault();
            currentUser.newPost.submit
        })
    }

    this.delete = function() {
        $(`[modal-js=modal]`).remove();
        delete currentUser.newPost;
    }

    this.submit = function() {
        console.log(this);
        let $form = $(`[modal-js=modal]`).children().children("form");
        let input = {
            title : $form.children("#title").val(),
            subreddit : $form.children("#sub").val(),
            content : $form.children("#content").val(),
        }
    }
}

function NewUserModal() {}


/*
=============================
------ EVENT LISTENERS ------
=============================
*/
// global
$usersDropdown.on('change',function(e) {
    let thisUserName = $(e.currentTarget).val();
    currentUser = users.find(user => user.username == thisUserName);
    console.log(currentUser);
});

$newPostBtn.on('click',function() {
    if (!currentUser) {
        console.log("No user is logged in");
    } else {
        this.content = {
            title : $()
        }
        currentUser.newPost = new NewPostModal();
        currentUser.newPost.draw();
    }
});






function init() {
    // drawAllPosts()
    // set user
}
//
populateUsersDropdown();