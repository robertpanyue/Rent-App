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
          console.log('Done! Here is the image info: ', result.info);
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

    // grab images for this project
    // cloudinary.v2.api.resources_by_tag(`${id}`,
    //   function(error, result){
    //     console.log(result);
    //     for (i in result) {
    //       let images = document.getElementById("cloudinary-images");
    //       let thumbnail = document.createElement('img');
    //       thumbnail.src = result.info.thumbnail_url;
    //       images.appendChild(thumbnail);
    //     }
    //   }
    // );

  }
});
