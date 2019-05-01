$(document).ready(function () {
  // cloudinary integration
  let cloudin = document.getElementById("upload_widget");

  if (cloudin) {
    // create widget
    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'dl6xltl5t',
      uploadPreset: 'xc8fh9wr',
      tags: ['INSERT POST ID HERE']}, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
        }
      }
    )

    // add event listener to button
    document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  }
});
