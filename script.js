mapboxgl.accessToken = "pk.eyJ1Ijoic29tc3ViaHJhMSIsImEiOiJja2hkbDhuNGcwNnZnMnNuMGkwcjU3d3UwIn0.ZAeP5aPO4JkxNGD7dIEZtw";

const successLocation = (position) => {
  setupMap([12.97116,79.16109]);
};

const errorLocation = () => {
  setupMap([-2.24, 53.48]);
};

const setupMap = (center) => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 16,
    center,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");

  // Update the distance and toll when directions are updated
  directions.on("route", (e) => {
    const route = e.route[0];
    const distanceElement = document.getElementById("distance");
    const tollElement = document.getElementById("toll");

    if (route) {
      const distance = (route.distance / 1000).toFixed(2); // Convert to kilometers
      const toll = (distance * 10).toFixed(2); // Calculate toll (10 times the distance)

      distanceElement.textContent = distance;
      tollElement.textContent = toll;
    }
  });
};

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});


