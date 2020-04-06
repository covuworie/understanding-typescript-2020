import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

// You would of course never have your API key in plain text like this in source code
// Note that this API key does not work! Use one that does!
const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

//declare var google: any; // tell typescript this imported API will exist

type GoogleGeocodingResponse = {
  // these are the only parts of the response we are interested in
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS"; // other status codes are possible too here
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=YOUR_API_KEY${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLDivElement,
        {
          center: { lat: coordinates.lat, lng: coordinates.lng },
          zoom: 16,
        }
      );

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
