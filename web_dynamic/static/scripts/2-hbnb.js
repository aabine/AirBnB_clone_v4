$(document).ready(async function() {
    var $checkboxes = $('input[type="checkbox"]');
    var $selectedAmenities = $('#selectedAmenities');
    var selectedAmenities = new Set();

    $(document).on('change', 'input[type="checkbox"]', async function() {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectedAmenities.add(amenityId);
        } else {
            selectedAmenities.delete(amenityId);
        }

        var amenitiesList = Array.from(selectedAmenities).map(function(id) {
            return amenityName;
        }).join(', ');

        $selectedAmenities.text("Selected Amenities: " + amenitiesList);
    });

    var data = await $.get('http://0.0.0.0:5001/api/v1/status/');
    var $apiStatus = $('#api_status');

    if (data.status === 'OK') {
        $apiStatus.addClass('available');
    } else {
        $apiStatus.removeClass('available');
    }
});
