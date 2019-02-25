import jQuery from "jquery";

(function ($) {
    $('.toggleModal').click(function (e) {
        e.preventDefault();
        const modal = $(this).attr('data-target');
        $(modal).modal('toggle');

        const videoSRC = $(this).attr("data-video"),
            videoSRCauto = videoSRC + "?autoplay=1";
        $(modal + ' iframe').attr('src', videoSRCauto);
        $(modal + ' button.close').click(function () {
            $(modal + ' iframe').attr('src', videoSRC);
        });
        $(modal).on('hidden.bs.modal', function (e) {
            $(modal + ' iframe').attr('src', videoSRCauto);
        })
    })
})(jQuery);