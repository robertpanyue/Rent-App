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
            data: {
              url: result.info.url,
              turl: result.info.thumbnail_url
            }
          });

          let imageRow = document.getElementById("cloudinary-image-row");
          let xRow = document.getElementById("x-button-row");

          let imageCell = document.createElement('td');
          let thumbnail = document.createElement('img');
          let xCell = document.createElement('td');
          let xButton = document.createElement('button');

          imageCell.setAttribute('class', result.info.thumbnail_url);
          thumbnail.src = result.info.thumbnail_url;
          xCell.setAttribute('class', result.info.url);
          xButton.setAttribute('class', `cloudinary-delete btn ${result.info.url} ${result.info.thumbnail_url}`);
          xButton.innerHTML = '&times;';

          imageCell.appendChild(thumbnail);
          imageRow.appendChild(imageCell);
          xCell.appendChild(xButton);
          xRow.appendChild(xCell);
        }
      }
    )

    // add event listener to button
    document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  }

  let cloudinaryTable = document.getElementById("cloudinary-table");

  if (cloudinaryTable) {
    let xs = document.getElementsByClassName("cloudinary-delete");

    if (xs) {
      for (index = 0; index < xs.length; index++) {
        let x = xs[index];
        x.addEventListener('click', removeImage, false);
      }
    }
  }
});

let removeImage = function(e) {
  console.log($(e.target).attr('class'));
  let id = document.URL.split('/');
  id = id[id.length - 1];

  let classes = $(e.target).attr('class').split(' ');
  let url = classes[classes.length - 2];
  let turl = classes[classes.length - 1];
  let urlSeg = url.split('/');
  let publicId = urlSeg[urlSeg.length - 1];
  if (publicId.includes('.')) {
    publicId = publicId.split('.')[0];
  }

  $.ajax({
    type: "POST",
    url: `removeCloudinary/${id}`,
    data: {
      url: url,
      turl: turl,
      publicId: publicId
    }
  });

  let img = document.getElementById(url);
  let x = document.getElementById(turl);
  if (img) {
    img.parentNode.removeChild(img);
  }
  if (x) {
    x.parentNode.removeChild(x);
  }
}
