$(document).ready(function() {
    var $checkboxes = $('input[type="checkbox"]');
    var $selectedAmenities = $('#selectedAmenities');
    var selectedAmenities = new Set();

    $(document).on('change', 'input[type="checkbox"]', function() {
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
});