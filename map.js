  var map;

  function initMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
      center: {lat: 59.349987, lng:18.069688},
      zoom: 14,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      // heading: 90,
      // tilt: 45,
      disableDefaultUI:true,
      zoomControl:false,
      draggable: false
    });

    mapDiv.index = 1;

    /* ZOOM */
    // IN
    var buttonZoomIn = document.createElement("BUTTON");
    buttonZoomIn.id = "zoomInBtn";
    var i = document.createTextNode("+");
    buttonZoomIn.appendChild(i);
    google.maps.event.addDomListener(buttonZoomIn,'click',zoomIn);  
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(buttonZoomIn);
    // OUT
    var buttonZoomOut = document.createElement("BUTTON");
    buttonZoomOut.id = "zoomOutBtn"; 
    var o = document.createTextNode("-");
    buttonZoomOut.appendChild(o);
    google.maps.event.addDomListener(buttonZoomOut,'click',zoomOut);
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(buttonZoomOut);

    /* PANNING */
    // UP
    var buttonPanUp = document.createElement("BUTTON");
    buttonPanUp.id = "panUpBtn";    
    var spanUp = document.createElement("SPAN");
    spanUp.className = "glyphicon glyphicon-chevron-up";
    buttonPanUp.appendChild(spanUp);
    google.maps.event.addDomListener(buttonPanUp,'click',panUp);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(buttonPanUp);
    // LEFT
    var buttonPanLeft = document.createElement("BUTTON");
    buttonPanLeft.id = "panLeftBtn";    
    var spanLeft = document.createElement("SPAN");
    spanLeft.className = "glyphicon glyphicon-chevron-left";
    buttonPanLeft.appendChild(spanLeft);
    google.maps.event.addDomListener(buttonPanLeft,'click',panLeft);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(buttonPanLeft);
    // RIGHT
    var buttonPanRight = document.createElement("BUTTON");
    buttonPanRight.id = "panRightBtn";    
    var spanRight = document.createElement("SPAN");
    spanRight.className = "glyphicon glyphicon-chevron-right";
    buttonPanRight.appendChild(spanRight);
    google.maps.event.addDomListener(buttonPanRight,'click',panRight);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(buttonPanRight);
    // DOWN
    var buttonPanDown = document.createElement("BUTTON");
    buttonPanDown.id = "panDownBtn";
    var spanDown = document.createElement("SPAN");
    spanDown.className = "glyphicon glyphicon-chevron-down";
    buttonPanDown.appendChild(spanDown);
    google.maps.event.addDomListener(buttonPanDown,'click',panDown);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(buttonPanDown);

    /* MARKER */
    // draggable
    marker = new google.maps.Marker({
	    map: map,
	    draggable: true,
	    animation: google.maps.Animation.DROP,
	    position: {lat: 59.349987, lng:18.069688}
	  });
	  marker.addListener('click', toggleBounce);
    // not draggable
    marker2 = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: {lat: 59.359987, lng:18.059688}
    });

  }

  /* ZOOM */
  function zoomIn() {
  	map.setZoom(map.getZoom()+1);
  }
  function zoomOut() {
  	map.setZoom(map.getZoom()-1);
  }

  /* PANNING */
  function pan(direction) {
      var offsetX = 300;
      var offsetY = 200;
      var scale = Math.pow(2,map.getZoom());
      var center_ = map.getProjection().fromLatLngToPoint(map.center);
      switch(direction){
        case 0: // pan UP
          var newCenterPoint = new google.maps.Point(
            center_.x,
            center_.y - offsetY/scale
          );
          break;
        case 1: // pan DOWN
          var newCenterPoint = new google.maps.Point(
            center_.x,
            center_.y + offsetY/scale
          );
          break;
        case 2: // pan LEFT
          var newCenterPoint = new google.maps.Point(
            center_.x - offsetX/scale,
            center_.y
          );
          break;
        case 3: // pan RIGHT
          var newCenterPoint = new google.maps.Point(
            center_.x + offsetX/scale,
            center_.y
          );
          break;
      }  
      var newCenter = map.getProjection().fromPointToLatLng(newCenterPoint);
    
      map.panTo(newCenter);
  }

  function panUp() {
    pan(0);
  }
  function panDown() {
    pan(1);
  }
  function panLeft() {
    pan(2);
  }
  function panRight() {
    pan(3);
  }

  /* MARKER */
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }