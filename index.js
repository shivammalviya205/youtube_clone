const api_key="AIzaSyBKnfXwtRZ3ULUZRmym-srAUCQuOMKRQLU";
const url="https://www.googleapis.com/youtube/v3/videos?";
const channel_url="https://www.googleapis.com/youtube/v3/channels?";
const VideoCard=document.querySelector(".video-grid");

fetch(url+ new URLSearchParams({
    key:api_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults:20,
    regionCode:'IN'
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data);
     data.items.forEach(item=>{
        getChannelIcon(item);
     })
})
.catch(err=>console.log(err));

const getChannelIcon=(video_data)=>{
   fetch(channel_url+ new URLSearchParams({
    key:api_key,
    part:'snippet',
    id:video_data.snippet.channelId,
   }))
   .then(res=>res.json())
   .then(data=> {
      video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
   })
   .catch(err=>{console.log(err)});
}

const makeVideoCard=(data)=>{
   VideoCard.innerHTML+=`<div class="video-preview" onClick="location.href='https://youtube.com/watch?v=${data.id}' ">
   <div class="thumbnail-row">
     <img class="thumbnail" src="${data.snippet.thumbnails.high.url}">
     <div class="video-time">19:59</div>
   </div>
   <div class="video-info-grid">
     <div class="channel-picture">
       <img class="profile-picture" src="${data.channelThumbnail}">
     </div>
     <div class="video-info">
       <p class="video-title">
         ${data.snippet.title}
       </p>
       <p class="video-author">
         ${data.snippet.channelTitle}
       </p>
       <p class="video-stats">
         141M views &#183; 1 year ago
       </p>
     </div>
   </div>
 </div>`;
}


//search bar 

const searchinput=document.querySelector('.search-bar');
const search_icon=document.querySelector('.search-button');
let search_url="https://www.youtube.com/results?search_query=";

search_icon.addEventListener('click',()=>{
    if(searchinput.value.length){
        location.href=search_url+searchinput.value;
    }
})  