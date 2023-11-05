$(document).ready(function () {
    const api = 'http://' + window.location.hostname;

    // Check API status
    $.get(api + ':5001/api/v1/status/', function (response) {
        if (response.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    }).fail(function (error) {
        console.error('Error:', error);
    });

    // Send a POST request to retrieve places
    $.ajax({
        url: api + '/api/v1/places_search/',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({}),
        dataType: 'json',
        success: function (data) {
            data.forEach(function (place) {
                var article = $('<article></article>');
                article.html(`
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                    <p>Number of rooms: ${place.number_rooms}</p>
                    <p>Number of beds: ${place.number_bathrooms}</p>
                    <p>Maximum capacity: ${place.max_guest}</p>
                    <p>Price per night: $${place.price_by_night}</p>
                    <p>Type of place: ${place.type}</p>
                `);
                $('section.places').append(article);
            });
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    var amenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        if (Object.values(amenities).length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(Object.values(amenities).join(', '));
        }
    });

    $('button').click(function () {
        var amenities = [];
        $('input[type="checkbox"]:checked').each(function () {
            amenities.push($(this).attr('data-id'));
        });

        $.ajax({
            url: '/api/v1/places_search/',
            method: 'POST',
            data: JSON.stringify({ amenities: amenities }),
            contentType: 'application/json',
            success: function (data) {
                // Handle the response data here
                console.log(data);
            },
            error: function (error) {
                // Handle any errors here
                console.error(error);
            }
        }).fail(function (error) {
            console.error('Error:', error);
        });
    });
});