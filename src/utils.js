function onError(e, cb) {
    switch (e.code) {
        case `auth/password-mismatch`:
            e.msg = "Passwords don't match"
            break;
        case "auth/email-already-in-use":
            e.msg = "Your email address is already in use";
            break;
        case "auth/invalid-email":
            e.msg = "Your email address is invalid";
            break;
        case "auth/weak-password":
            e.msg = "Your password is too weak.";
            break;
        case "auth/user-not-found":
            e.msg = "User not found";
          break;
        case "auth/empty-fields":
            e.msg = "Please complete all fields";
            break;
        case "auth/wrong-password":
            e.msg = "Wrong password";
            break;
        default:
            e.msg = "Internal error, try again later.";
    }
    cb(e)
}

export { onError }