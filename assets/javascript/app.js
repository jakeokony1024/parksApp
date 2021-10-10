
$(document).ready(function () {
 var mykey = config.MY_KEY;
 // require('dotenv').config();
//  console.log(process.env);
 
 // $('#state-selector').on('click', function(){
 // $('.cards-section).detach();
 //  let selectedState = $('#states').find(":selected").val().toLowerCase();
  $.ajax({
   type: 'GET',
   url: 'https://developer.nps.gov/api/v1/parks?&api_key=' + mykey,
   data: {
    limit: '12',
    stateCode: 'ca'
   }
  }).then(function (response) {
   const parkData = response.data;
   
   //Getting all Data for each park into variables //
   for (let i = 0; i < parkData.length; i++) {
    let parkImgSrc = parkData[i].images[0].url;
    let title = parkData[i].fullName;
    let description = parkData[i].description;
    let parkLink = parkData[i].url;
    let latitude = Math.round(parkData[i].latitude * 1000) / 1000;
    let longitude = Math.round(parkData[i].longitude * 1000) / 1000;
    let activityList = parkData[i].activities;
    let activities = activityList.map(a => a.name);
    let cardClass = 'card-' + i;
    ///set image as full background image cover hide everything except title over middle of park
    /// on hover full details become visible
    //Building out the Card//
    let cardHTML = `
    <div class="card ${cardClass}" style="background: url(${parkImgSrc}) no-repeat center; background-size: cover; ">
     <div class="card-contents">
      <h2 class="card-title">${title}</h2>
      <p class="card-description">${description}</p>
      <span class="location-info">${latitude} N</span>
      <span class="location-info">${longitude} W</span>
      <div class="activity-list">
       <h4 class="card-title">Available Activities</h4>
       <p>${activities[0]}</p>
       <p>${activities[1]}</p>
       <p>${activities[2]}</p>
      </div>
      <a class="park-link" href="${parkLink}"><span class="park-link-text">Visit Homepage</span></a>
     </div>
    </div>`;
    $('.cards-section').append(cardHTML);
   };
  });
 // })
});