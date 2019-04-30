$(document).ready(function () {
  let confirmPassword = document.getElementById("confirmPassword");
  let lengthOK = false;
  let matchOK = false;

  // check if confirmPassword exists in page
  if (confirmPassword) {
    // when something is typed into the field it will check if passwords are equal
    $("#password, #confirmPassword").on("keyup", function () {
      // need to clean up error message
      if ($("#password").val().length < 6) {
        lengthOK = false;
        $("#passwordLength").html("Password must be at least 6 characters long").css("color", "red");
      } else {
        lengthOK = true;
        $("#passwordLength").html("");
      }

      if ($("#password").val() == $("#confirmPassword").val()) {
        matchOK = true;
        $("#passwordMatch").html("")
      } else {
        matchOK = false;
        $("#passwordMatch").html("Not Matching").css("color", "red");
      }

      if (lengthOK && matchOK) {
        $('#registerButton').prop('disabled', false);
      } else {
        $('#registerButton').prop('disabled', true);
      }
    });
  }
});
