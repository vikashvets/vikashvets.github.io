$(document).ready(function () {
    $('a[href^="#_"]').on('click', function () {
        var target = $($(this).attr("href"));
        if (target.length > 0) {
            var scroll = target.offset().top;
            $('html,body').animate({scrollTop: scroll}, 800);
            return false;
        }
    });
})

var fActive = '';

function filterImage(image) {
    if (fActive != image) {
        $('.sort').filter('.' + image).slideDown();
        $('.sort').filter(':not(.' + image + ')').slideUp();
        fActive = image;
    }
}

$('.f-websites').click(function () {
    filterImage('websites');
});
$('.f-logos').click(function () {
    filterImage('logos');
});
$('.f-brochures').click(function () {
    filterImage('brochures');
});
$('.f-all').click(function () {
    filterImage('all');
});