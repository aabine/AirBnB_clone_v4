const amenitiesChecked = {};
const statesCitiesChecked = {};

$(document).ready(function () {
  // Check API status and update the h4 tag inside the div Locations
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Handle changes in input checkbox tags
  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if ($(this).is(':checked')) {
      if ($(this).data('type') === 'amenity') {
        amenitiesChecked[id] = name;
      } else if ($(this).data('type') === 'state' || $(this).data('type') === 'city') {
        statesCitiesChecked[id] = name;
      }
    } else {
      if ($(this).data('type') === 'amenity') {
        delete amenitiesChecked[id];
      } else if ($(this).data('type') === 'state' || $(this).data('type') === 'city') {
        delete statesCitiesChecked[id];
      }
    }
    updateLocationsDisplay();
  });

  // Handle button click to send the POST request
  $('button').click(function () {
    const amenitiesList = Object.keys(amenitiesChecked);
    const statesCitiesList = Object.keys(statesCitiesChecked);
    const data = JSON.stringify({
      amenities: amenitiesList,
      states: statesCitiesList,
      cities: statesCitiesList,
    });

    $.ajax({
      url: '/api/v1/places_search/',
      type: 'POST',
      data: data,
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        // Handle the response data here
        console.log(data);
      },
      error: function (error) {
        // Handle any errors here
        console.error('Error:', error);
      }
    });
  });

  // Function to update the h4 tag inside the div Locations
  function updateLocationsDisplay() {
    const locations = [...Object.values(amenitiesChecked), ...Object.values(statesCitiesChecked)];
    if (locations.length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(locations.join(', '));
    }
  }
});
