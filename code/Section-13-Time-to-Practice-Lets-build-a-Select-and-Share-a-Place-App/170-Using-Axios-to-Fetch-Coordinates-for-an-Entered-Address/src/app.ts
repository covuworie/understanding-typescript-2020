import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

// You would of course never have your API key in plain text like this in source code
const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

type GoogleGeocodingResponse = {
  // these are the only parts of the response we are interested in 
  results: { geometry: { location: { lat: number; long: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';  // other status codes are possible too here
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
        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch location!');
        }
      const coordinates = response.data.results[0].geometry.location;

      // output on a map
    })
    .catch(err => {
        alert(err.message);
        console.log(err)
    } );
}

form.addEventListener("submit", searchAddressHandler);
