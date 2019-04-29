$(document).ready(function () {
  let confirmPassword = document.getElementById("confirmPassword");
  console.log(confirmPassword);

  // check if confirmPassword exists in page
  if (confirmPassword) {
    // when something is typed into the field it will check if passwords are equal
    $("#password, #confirmPassword").on("keyup", function () {
      // need to clean up error message
      if ($("#password").val() == $("#confirmPassword").val()) {
        $("#passwordMessage").html("Matching").css("color", "green");
      } else
        $("#passwordMessage").html("Not Matching").css("color", "red");
    });
  }
});
