// const infoRequest = new GraphRequest(
//   'me?fields=name,picture,email',
//   null,
//   this._responseInfoCallback,
// );
// AccessToken.getCurrentAccessToken().then(
//   (data) => {
//     if (data) {
//       console.log('we are in data')
//       new GraphRequestManager().addRequest(infoRequest).start()
//     }
//   }
// )

// successfulFbLogin = () => {
//   // this.checkAuthencity()
//   this.getAccessToken();
// }

// checkAuthencity() {
//   AccessToken.getCurrentAccessToken()
//     .then((data) => {
//       this.props.checkAuthencity()
//     })
//     .catch((err) => {
//       console.log('Err', err)
//     })
// }

<LoginButton
    publishPermissions={["publish_actions"]}
    onLoginFinished={
        (error, result) => {
            if (error) {
                alert("Login failed with error: " + result.error);
            } else if (result.isCancelled) {
                alert("Login was cancelled");
            } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                console.log(result)
                AccessToken.getCurrentAccessToken(result)
                    .then((data) => {
                        this.userGraph()
                        console.log('user token', data)
                    })
                    .catch((err) => {
                        console.log('Error', err);
                    })
            }
        }
    }
    {/*20 + Math.random() * 150*/}
    onLogoutFinished={() => alert("User logged out")} />