$(document).ready(function () {

  // cloudinary integration
  let cloudin = document.getElementById("upload_widget");

  if (cloudin) {
    // create widget
    let id = document.URL.split('/');
    id = id[id.length - 1];

    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'dl6xltl5t',
      uploadPreset: 'xc8fh9wr',
      tags: [id]}, (error, result) => {
        if (!error && result && result.event === "success") {

          $.ajax({
            type: "POST",
            url: `addCloudinary/${id}`,
            data: { url: result.info.url }
          });

          let images = document.getElementById("cloudinary-images");
          let thumbnail = document.createElement('img');
          thumbnail.src = result.info.thumbnail_url;
          images.appendChild(thumbnail);
        }
      }
    )

    // add event listener to button
    document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  }
});
