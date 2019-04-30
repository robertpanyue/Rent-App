$(document).ready(function () {
  let confirmPassword = document.getElementById("confirmPassword");

  // check if confirmPassword exists in page
  if (confirmPassword) {
    // when something is typed into the field it will check if passwords are equal
    $("#password, #confirmPassword").on("keyup", function () {
      // need to clean up error message
      if ($("#password").val() == $("#confirmPassword").val()) {
        $("#passwordMessage").html("Matching").css("color", "green");
        $('#registerButton').prop('disabled', false);
        console.log('matching');
      } else {
        console.log('different');
        $("#passwordMessage").html("Not Matching").css("color", "red");
        $('#registerButton').prop('disabled', true);
      }
    });
  }
});
