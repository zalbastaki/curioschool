import firebase from 'firebase';

const protectRoute = {
    // TO DO: Check that this is working correctly
    beforeRouteEnter(to, from, next) {
        if (firebase.auth().currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page.');
            next({ path: '/' });
        }
    },
};

export default protectRoute;
