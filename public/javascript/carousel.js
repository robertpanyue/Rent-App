// $('#carouselExample').on('slide.bs.carousel', function (e) {

//     var $e = $(e.relatedTarget);
//     var idx = $e.index();
//     var itemsPerSlide = 3;
//     var totalItems = $('.carousel-item').length;
<<<<<<< haritha
    
=======

>>>>>>> master
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

<<<<<<< haritha
$('#carouselExample').on('slide.bs.carousel', function (e) {

    /*

=======
$('#carouselExample').on('slide.bs.carousel', function(e) {
	/*
>>>>>>> master
    CC 2.0 License Iatek LLC 2018
    Attribution required
    
    */

<<<<<<< haritha
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
>>>>>>> master
