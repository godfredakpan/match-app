'use strict';

(function ($) {

    $(document).on('click', '.layout-builder .layout-builder-toggle', function () {
        $('.layout-builder').toggleClass('show');
    });

    $(window).on('load', function () {
        setTimeout(function () {
            $('.layout-builder').removeClass('show');
        }, 500);
    });

    $('.body').append(`
    <div className="layout-builder show">
        <div className="layout-builder-toggle shw">
            <i className="ti-settings"></i>
        </div>
        <div className="layout-builder-toggle hdn">
            <i className="ti-close"></i>
        </div>
        <div className="layout-builder-body">
            <h5>Customizer</h5>
            <div className="mb-3">
                <p>Layout</p>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="horizontal-side-menu" data-layout="horizontal-side-menu">
                  <label className="custom-control-label" for="horizontal-side-menu">Horizontal Menu</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="icon-side-menu" data-layout="icon-side-menu">
                  <label className="custom-control-label" for="icon-side-menu">Icon Menu</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="hidden-side-menu" data-layout="hidden-side-menu">
                  <label className="custom-control-label" for="hidden-side-menu">Hidden Menu</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="layout-container-1" data-layout="layout-container icon-side-menu">
                  <label className="custom-control-label" for="layout-container-1">Container Layout 1</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="layout-container-2" data-layout="layout-container horizontal-side-menu">
                  <label className="custom-control-label" for="layout-container-2">Container Layout 2</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="layout-container-3" data-layout="layout-container hidden-side-menu">
                  <label className="custom-control-label" for="layout-container-3">Container Layout 3</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="dark-1" data-layout="dark">
                  <label className="custom-control-label" for="dark-1">Dark Layout 1</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="dark-2" data-layout="layout-container dark icon-side-menu">
                  <label className="custom-control-label" for="dark-2">Dark Layout 2</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="dark-3" data-layout="layout-container dark horizontal-side-menu">
                  <label className="custom-control-label" for="dark-3">Dark Layout 3</label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="layout" id="dark-4" data-layout="layout-container dark hidden-side-menu">
                  <label className="custom-control-label" for="dark-4">Dark Layout 4</label>
                </div>
            </div>
            <button id="btn-layout-builder-reset" className="btn btn-danger btn-uppercase">Reset</button>
            <div className="layout-alert mt-3">
                <i className="fa fa-warning m-r-5 text-warning"></i>Some theme options can not be displayed in case of combined when they are not relevant each other. For that reason, you are adviced to try all theme options seperately.
            </div>
        </div>
    </div>`);

    var site_layout = localStorage.getItem('site_layout');
    $('body').addClass(site_layout);

    $('.layout-builder .layout-builder-body input[type="radio"][data-layout="' + $('body').attr('class') + '"]').prop('checked', true);

    $('.layout-builder .layout-builder-body input[type="radio"]').click(function () {
        var class_names = '';

        $('.layout-builder .layout-builder-body input[type="radio"]:checked').each(function () {
            class_names += ' ' + $(this).data('layout');
        });

        localStorage.setItem('site_layout', class_names);

        window.location.href = (window.location.href).replace('#', '');
    });

    $(document).on('click', '#btn-layout-builder', function () {

    });

    $(document).on('click', '#btn-layout-builder-reset', function () {
        localStorage.removeItem('site_layout');
        localStorage.removeItem('site_layout_dark');

        window.location.href = (window.location.href).replace('#', '');
    });

    $(window).on('load', function () {
        if ($('body').hasClass('horizontal-side-menu') && $(window).width() > 768) {
            if ($('body').hasClass('layout-container')) {
                $('.side-menu .side-menu-body').wrap('<div className="container"></div>');
            } else {
                $('.side-menu .side-menu-body').wrap('<div className="container"></div>');
            }
            setTimeout(function () {
                $('.side-menu .side-menu-body > ul').append('<li><a href="#"><span>Other</span></a><ul></ul></li>');
            }, 100);
            $('.side-menu .side-menu-body > ul > li').each(function () {
                var index = $(this).index(),
                    $this = $(this);
                if (index > 7) {
                    setTimeout(function () {
                        $('.side-menu .side-menu-body > ul > li:last-child > ul').append($this.clone());
                        $this.addClass('d-none');
                    }, 100);
                }
            });
        }
    });

    $(document).on('click', '[data-attr="layout-builder-toggle"]', function () {
        $('.layout-builder').toggleClass('show');
        return false;
    });

})(jQuery);