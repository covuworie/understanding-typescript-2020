const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// You would of course never have your API key in plain text like this in source code
const GOOGLE_API_KEY = 'AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs';

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const address = addressInput.value;

    // send this to Google's API
}

form.addEventListener('submit', searchAddressHandler);