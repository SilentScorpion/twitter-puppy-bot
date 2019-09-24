const config = require('./config');
const twit = require('twit');

const T = new twit(config);


//Search/Post after every 2000ms
setInterval(() => {
     searchTweets({q: '#dogs', geocode: '19.076090,72.877426,500km'});
    searchTweets({q: '#puppies', geocode: '19.076090,72.877426,500km'});
    // searchTweets({q: '#dog', geocode: '19.076090,72.877426,1000km'});
    // searchTweets({q: '#puppy', geocode: '19.076090,72.877426,1000km'});
    searchTweets({q: '#goldenretrievers'});
},5000);
//searchTweets({q: '#goldenretrievers'});
//searchTweets({q: '#puppy', geocode: '19.076090,72.877426,3000'});

//Get is used to get all the tweets that contain a particular wordd
function searchTweets(query){
    T.get('search/tweets', query, (err,data,response) => {
       if(err){
           console.log('some error in searchTweets()::: Check');
           return;
       }  
        var messages = data.statuses;
        console.log(messages);

        var randomTweet = randIndex(messages);
        let retweetId = randomTweet.id_str;
        if(retweetId.url != 'undefined'){
            postTweet(retweetId);
            favouriteTweet(retweetId);
        }
       

        //choose a random tweet, select the user and then follow him
        var randomUser = randIndex(messages);
        let followId = randomUser.user.id_str;
        followUser(followId);

        // for(let message of messages){
        //     let retweetId = message.id_str;
        //     postTweet(retweetId);
        //     favouriteTweet(retweetId);
        // }
    });
}

//Post is used to retweet something on my TL
function postTweet(tweetId){  
    T.post('statuses/retweet/:id',{id:tweetId}, (err,data,response) => {
        if(response)
            console.log('retweeted successfully');
        else if(err)
            console.log('some error');
      
    });
}

function followUser(userId){
    T.post('friendships/create', {id:userId}, (err,data,response) => {
       if(response)
            console.log('added to friends list');
        else if(err)
            console.log('some error');
    
    });
}

function favouriteTweet(tweetId){
    T.post('favorites/create',{id:tweetId}, (err,data,response) => {
        if(response)
            console.log('favorited successfully');
        else if(err)
            console.log('some error');
      
    });
}

function randIndex (arr) {
    var index = Math.floor(arr.length*Math.random());
    return arr[index];
  };


