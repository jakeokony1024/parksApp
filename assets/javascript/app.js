$(document).ready(function() {
 $.ajax({
  type: 'GET',
  url: 'https://developer.nps.gov/api/v1/parks?limit=12&api_key=' + API_KEY
 }).then(function(response){
  const parkData = response.data;
  //Getting all Data for each park into variables //
  for (let i = 0; i < parkData.length; i++) {
   let title       = parkData[i].fullName;
   let description = parkData[i].description;
   let parkLink    = parkData[i].url;
   let latitude    = parkData[i].latitude;
   let longitude   = parkData[i].longitude;
   let activityList= parkData[i].activities; 

   //Building out the Card//
   let cardHTML = `
   <div class="card">
    <div class="card-contents">
     <h2 class="card-title">${title}</h2>
     <img class="card-image" src="">
     <p class="card-description">${description}</p>
     <ul class="card-activities-list></ul>
     <span class="location-info">${latitude + longitude}</span>
     <a class="park-link" href="${parkLink}"><span class="park-link-text">Visit ${title}'s Homepage</span></a>
    </div>
   </div>`;
   console.log(cardHTML);
   $('.cards-section').append(cardHTML);
  };
  // parkData.forEach(parkData => {
  //  for (let key in parkData) {
  //   // console.log(`${key}: ${parkData[key]}`);
  //   // console.log(`${parkTitle}: ${parkData[parkTitle]}`);
  //  }
  // });

 });


});


{/* <div class="card">
  <div class="card-contents">
    <h2 class="card-title"></h2>
    <img class="card-image" src="">
    <p class="card-description"></p>
  </div>
</div> */}