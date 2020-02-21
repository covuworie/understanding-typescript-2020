let logged;

function sendAnalytics(data: string) {
    console.log(data);
    logged = true;
}

sendAnalytics('The data');