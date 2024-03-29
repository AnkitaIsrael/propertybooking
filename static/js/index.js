console.clear();

var map = ''

function customMarker(latlng, map, args) {
	// Initialize all properties.
	this.latlng = latlng;
	this.args = args;

	// Explicitly call setMap on this overlay.
	this.setMap(map);
}

customMarker.prototype = new google.maps.OverlayView();

customMarker.prototype.draw = function() {
	var self = this,
		div = this.div;

	if (!div) {
		div = this.div = document.createElement('div');

		div.className = self.args.class_name;
		
		if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}
		if (typeof(self.args.price) !== 'undefined') {
			div.innerHTML = self.args.price + '<span class="currency">EURO/Price per Night</span>';
		}
		
		google.maps.event.addDomListener(div, 'click', function (event) {
			google.maps.event.trigger(self, 'click');
		});

		var panes = self.getPanes();
		panes.overlayImage.appendChild(div);
	}

	var point = self.getProjection().fromLatLngToDivPixel(self.latlng);

	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}

};

function initialize() {
	var mapCanvas = document.getElementById('map');
	var myLatlng1 = new google.maps.LatLng(53.65914, 0.072050);
	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
         });
     }
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);


     var mapOptions = {
         zoom: 9,
         center: myLatlng1,
         mapTypeId: google.maps.MapTypeId.ROADMAP,

}




	map = new google.maps.Map(mapCanvas, mapOptions);

	// Get list of hotels
	var hotels = document.getElementById('hotel-list').children;

	// Go through list of hotels
	for (var a = 0, al = hotels.length; a < al; a++) {
		// Make marker for every hotel using the data properties from the hotel list
		var hotelMarker = new customMarker(new google.maps.LatLng(hotels[a].getAttribute('data-lat'), hotels[a].getAttribute('data-lng')), map, {
			class_name: 'hotel-marker',
			marker_id: hotels[a].id,
			price: hotels[a].getAttribute('data-price')
		});

		// Make markers clickable
		hotelMarker.addListener('click', function (event) {
			// Get list of markers
			var markers = document.querySelectorAll('.hotel-marker');

			// Go thru list of markers
			for (var m = 0, ml = markers.length; m < ml; m++) {
				if (markers[m].getAttribute('data-marker_id') == this.div.getAttribute('data-marker_id')) {
					markers[m].classList.add('js-active');
				} else {
					markers[m].classList.remove('js-active');
				}
			}

			// Get list of hotels
			var hotels = document.getElementById('hotel-list').children;

			// Go through list of hotels
			for (var h = 0, hl = hotels.length; h < hl; h++) {
				if (hotels[h].id === this.div.getAttribute('data-marker_id')) {
					hotels[h].classList.add('js-active');
				} else {
					hotels[h].classList.remove('js-active');
				}
			}
		});

		// Make list items clickable
		hotels[a].addEventListener('click', function (event) {
			// Get list of markers
			var markers = document.querySelectorAll('.hotel-marker');

			// Go through list of markers
			for (var m = 0, ml = markers.length; m < ml; m++) {
				if (markers[m].getAttribute('data-marker_id') == this.id) {
					markers[m].classList.add('js-active');
				} else {
					markers[m].classList.remove('js-active');
				}
			}

			// Get list of hotels
			var hotels = document.getElementById('hotel-list').children;

			// Go thru list of hotels
			for (var h = 0, hl = hotels.length; h < hl; h++) {
				if (hotels[h].id === this.id) {
					hotels[h].classList.add('js-active');
				} else {
					hotels[h].classList.remove('js-active');
				}
			}
		});
	}

	google.maps.event.addDomListener(map, 'idle', function () {
		myLatlng1 = map.getCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function () {
		map.panTo(myLatlng1);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);