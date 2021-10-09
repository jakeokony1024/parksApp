$(document).ready(function() {
 $.ajax({
  type: 'GET',
  url: 'https://developer.nps.gov/api/v1/parks?&api_key=' + API_KEY,
  data: {
   limit: '12',
   stateCode: 'ca'
  }

 }).then(function(response){
  const parkData = response.data;
  console.log(parkData);
  //Getting all Data for each park into variables //
  for (let i = 0; i < parkData.length; i++) {
   let parkImgSrc  = parkData[i].images[0].url;
   let title       = parkData[i].fullName;
   let description = parkData[i].description;
   let parkLink    = parkData[i].url;
   let latitude    = Math.round(parkData[i].latitude * 1000) / 1000;
   let longitude   = Math.round(parkData[i].longitude * 1000) / 1000;
   let activityList= parkData[i].activities; 


   //Building out the Card//
   let cardHTML = `
   <div class="card">
    <div class="card-contents">
     <h2 class="card-title">${title}</h2>
     <img class="card-image" src="${parkImgSrc}">
     <p class="card-description">${description}</p>
     <span class="location-info">${latitude} N</span>
     <span class="location-info">${longitude} W</span>
     <a class="park-link" href="${parkLink}"><span class="park-link-text">Visit ${title}'s Homepage</span></a>
    </div>
   </div>`;
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