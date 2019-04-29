const form = document.getElementById('form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email');

        if (!email.value || validateEmail(email.value)) {
            console.log("invalid")
            alert('You should enter an email');
        }
    });
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\ - 0 - 9] + \.) + [a - zA - Z] { 2, })) $ /;
    return re.test(email);
}