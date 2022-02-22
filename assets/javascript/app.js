// Wait for Page to Load//
$(document).ready(function () {

 var mykey = config.MY_KEY;
 //On button click, render list of parks//

 $('#state-selector').on('click', function(){
  //on button click, empty out the card section, to re-populate//
  $('.cards-section').empty();
  
  //getting value from selected option in dropdown//
  let selectedState = $('#states').find(":selected").val().toLowerCase();
  $.ajax({
   type: 'GET',
   url: 'https://developer.nps.gov/api/v1/parks?&api_key='+mykey,
   data: {
    limit: '12',
    stateCode: selectedState
   },
   success: function(response) {
    const parkData = response.data;  
    //Getting all Data for each park into variables //
    
    for (let i = 0; i < parkData.length; i++) {
     let parkImgSrc = parkData[i].images[0].url;
     let title = parkData[i].fullName;
     let description = parkData[i].description;
     let parkLink = parkData[i].url;
     //Rounding up the lat longs//

     let latitude = Math.round(parkData[i].latitude * 1000) / 1000;
     let longitude = Math.round(parkData[i].longitude * 1000) / 1000;
     let activityList = parkData[i].activities;

     //Using .map to get the activities list//
     let activities = activityList.map(a => a.name);

     //using iterator to add index to each card for grid layout//
     let cardClass = 'card-' + i;
     //setting image as full background image of card//
     //Building out the Card using template Literals//
     
     let cardHTML = `
     <div class="card ${cardClass}" style="background: url(${parkImgSrc}) no-repeat center; background-size: cover; ">
      <div class="card-contents">
       <h2 class="card-title">${title}</h2>
       <p class="card-description">${description}</p>
       <div class="location-container">
        Location:
        <span class="location-info">${latitude} N</span>
        <span class="location-info">${longitude} W</span>
       </div>
       <div class="activity-list">
        <h4 class="card-title">Available Activities</h4>
        <p>${activities[0]}</p>
        <p>${activities[1]}</p>
        <p>${activities[2]}</p>
       </div>
       <span class="park-link-text"><a class="park-link" href="${parkLink}">Visit Homepage</a></span>
      </div>
     </div>`;
     $('.cards-section').append(cardHTML);
    };
   },
   error: function(xhr, error) {
    var errorMessage = xhr.status + ': ' + xhr.statusText;
    console.log('Error -', error);
    alert('Error - ' + errorMessage);
   }
  });
 });
});
