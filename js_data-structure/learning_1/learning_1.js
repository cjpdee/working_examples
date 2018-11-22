// global vars
var post_count = 0;
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

User.prototype.upvoteComment = function(post_id) {}



function createPost(subreddit,body) {}

function createComment(post_id,body) {}

function deleteUser(name,password) {}

function deletePost(comment_id) {}

function deleteComment(post_id) {}

function upvote(post_id) {}

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
    })
    return allPosts;
}

function getThisPost(post_id) {
    return allPosts.find(post => post.post_id == post_id);
}

function getUserFromPost(post_id) {
    var x = users.forEach(function (user) {
        let post = user.posts.find(post => post_id == post_id);
        let postIndex = user.posts.indexOf(post => post_id == post_id);
        if(post.post_id == post_id) {
            console.log(user.posts);
            // console.log(
            // users.filter(user => user.posts[postIndex].post_id == post_id)
            // )
        }
    });

    console.log(x);
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

var $display = $("[hook-js=display]");

function drawPost(post_id) {
    var post = getThisPost(post_id);
    
    $display.append(
        $(`
        <div class="post">
            <div class="post__votes__wrap">
                <button class="post__votes__upvote">${post.upvote}</button>
                <button class="post__votes__downvote">${post.downvotes}</button>
            </div>
            <div class="post__main">
                <h3 class="post__header">${post.title}</h3>
                <div class="post__details">
                    <span class="post__detail">${post.subreddit}</span>
                    <span class="post__detail">${post.OOOOO}</span>
                    <span class="post__detail">date created</span>
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
        `)
    );
}