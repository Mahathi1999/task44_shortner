export default function isAuthenticate() {
    const auth = localStorage.getItem('auth');

    return auth == null ? false : true;
}