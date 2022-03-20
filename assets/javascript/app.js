// Wait for Page to Load//
$(document).ready(function () {

 const mykey = config.MY_KEY;
 //On button click, render list of parks//

 $('#state-selector').on('click', function(){
  //on button click, empty out the card section, to re-populate//
  $('.cards-section').empty();
  
  //getting value from selected option in dropdown//
  let selectedState = $('#states').find(":selected").val().toLowerCase();
  
  ajaxRequest(selectedState, mykey);
 });
});

function ajaxRequest(state, key) {
 return new Promise((resolve, reject) => {
  $.ajax({
   type: 'GET',
   url: 'https://developer.nps.gov/api/v1/parks?&api_key='+key,
   data: {
    limit: '12',
    stateCode: state
   },
   error: function(xhr, error) {
    reject(error)
    var errorMessage = xhr.status + ': ' + xhr.statusText;
    console.log('Error -', error);
    alert('Error - ' + errorMessage);
   },
   success: function(response) {
    resolve(response)
    const parkData = response.data; 
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
     <div class="card ${cardClass}">
      <div class="card-inner">
       <div class="card-front">      
        <div class="card-front-img-cont">
         <h2 class="card-title">${title}</h2> 
         <img src="${parkImgSrc}" class="card-front-image" loading="eager">
        </div>      
       </div>
       <div class="card-back">
        <div class="card-contents">
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
         <a class="park-link" href="${parkLink}"><span class="park-link-text">Visit Homepage</span></a>
        </div>
       </div>
      </div>
     </div>`;
     $('.cards-section').append(cardHTML);
    };
   } 
  })
 })
}
