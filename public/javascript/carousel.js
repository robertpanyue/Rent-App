// $('#carouselExample').on('slide.bs.carousel', function (e) {

//     var $e = $(e.relatedTarget);
//     var idx = $e.index();
//     var itemsPerSlide = 3;
//     var totalItems = $('.carousel-item').length;
<<<<<<< HEAD
<<<<<<< HEAD
    
=======

>>>>>>> 9bde5110b433f7a4f56db896567aca0d16075bf5
=======
<<<<<<< haritha
    
=======

>>>>>>> master
>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
//     if (idx >= totalItems-(itemsPerSlide-1)) {
//         var it = itemsPerSlide - (totalItems - idx);
//         for (var i=0; i<it; i++) {
//             // append slides to end
//             if (e.direction=="left") {
//                 $('.carousel-item').eq(i).appendTo('.carousel-inner');
//             }
//             else {
//                 $('.carousel-item').eq(0).appendTo('.carousel-inner');
//             }
//         }
//     }
// });

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< haritha
>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
$('#carouselExample').on('slide.bs.carousel', function (e) {

    /*

=======
$('#carouselExample').on('slide.bs.carousel', function(e) {
	/*
<<<<<<< HEAD
>>>>>>> 9bde5110b433f7a4f56db896567aca0d16075bf5
=======
>>>>>>> master
>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
    CC 2.0 License Iatek LLC 2018
    Attribution required
    
    */

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< haritha
>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});
=======
	var $e = $(e.relatedTarget);
	var idx = $e.index();
	var itemsPerSlide = 3;
	var totalItems = $('.carousel-item').length;

	if (idx >= totalItems - (itemsPerSlide - 1)) {
		var it = itemsPerSlide - (totalItems - idx);
		for (var i = 0; i < it; i++) {
			// append slides to end
			if (e.direction == 'left') {
				$('.carousel-item').eq(i).appendTo('.carousel-inner');
			} else {
				$('.carousel-item').eq(0).appendTo('.carousel-inner');
			}
		}
	}
});
<<<<<<< HEAD
>>>>>>> 9bde5110b433f7a4f56db896567aca0d16075bf5
=======
>>>>>>> master
>>>>>>> 336398affe87a06a3f4d5e7998def9c6e6c7b710
