// #maps
document.addEventListener("deviceready", onDeviceReady, false);
// The device is ready, so let's
// obtain the current geolocation data
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

// Run after successful transaction
// Let's display the position data
function onSuccess(position) {
    var geoElement = document.getElementById('geolocationData');
    geoElement.innerHTML =
        'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +        
        'Accuracy: ' + position.coords.accuracy + '<br />' +        
        'Timestamp: ' + position.timestamp + '<br />';


    var latLng =
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude);
    var mapOptions = {
        center: latLng,
        panControl: false,
        zoomControl: true,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
        document.getElementById('map_canvas'),
        mapOptions
    );
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

// Run if we face an error
// obtaining the position data
function onError(error) {
    var errString = '';
    // Check to see if we have received an error code
    if (error.code) {
        // If we have, handle it by case
        switch (error.code) {
            case 1: // PERMISSION_DENIED
                errString =
                    'Unable to obtain the location information ' +
                    'because the device does not have permission ' +
                    'to the use that service.';
                break;
            case 2: // POSITION_UNAVAILABLE
                errString =
                    'Unable to obtain the location information ' +
                    'because the device location could not be ' +
                    'determined.';
                break;
            case 3: // TIMEOUT
                errString =
                    'Unable to obtain the location within the ' +
                    'specified time allocation.';
                break;
            default: // UNKOWN_ERROR
                errString =
                    'Unable to obtain the location of the ' +
                    'device due to an unknown error.';
                break;
        }
    }
    // Handle any errors we may face
    var element = document.getElementById('map_holder');
    element.innerHTML = errString;
}