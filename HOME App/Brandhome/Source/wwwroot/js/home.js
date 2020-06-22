function homeLogin() {
    hideProfileAndError();
    getToken().then(data => {
        accessToken = data.accessToken;
        idToken = data.idToken;
        successfulLogin();
    });
}

function getToken() {
    return new Promise((resolve, reject) => {
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + "/Start",
            width: 600,
            height: 535,
            successCallback: result => {
                resolve(result);
            },
            failureCallback: reason => {
                reject(reason);
            }
        });
    });
}