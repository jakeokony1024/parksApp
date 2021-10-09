$(document).ready(function() {
 $.ajax({

  type: 'GET',
  url: 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=' + API_KEY
 }).then(function(response){
  console.log(response)
 });


});
