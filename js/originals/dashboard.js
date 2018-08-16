/**
 * Page - Dashboard JS
 */

// CSS
import styles from '../scss/dashboard.scss';

const $ = window.jQuery;
import 'datatables.net-dt';
import 'jquery.scrollto/jquery.scrollTo.min';
import 'jquery.localscroll/jquery.localScroll.min';
import 'waypoints/lib/jquery.waypoints.min';
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js';

$('.sticky-utilities__top').localScroll({ offset: -106 });

$('html').on('click', '[data-stop-propagation]', event => {
  event.stopPropagation();
});

// Mobile dashboard menu
$('[data-toggle-dashboard-menu]').on('click', event => {
  $('html').toggleClass('html--dashboard-menu-open');
});
$('.has-submenu > span').on('click', event => {
  if (window.innerWidth < 1280) {
    const anchor = $(event.currentTarget)
      .next()
      .children('li:first-child')
      .children('a');
    window.open(anchor.attr('href'), anchor.attr('target') || '_self');
  }
});

// Create waypoint for back to top button
$('.dashboard__content').waypoint(
  direction => {
    if (direction === 'down') {
      $('.sticky-utilities__top').removeClass('is-hidden');
    } else if (direction === 'up') {
      $('.sticky-utilities__top').addClass('is-hidden');
    }
  },
  { offset: 0 }
);

// Append dropdowns to body
$('.dropdown').each((index, element) => {
  const dropdown = $(element);
  const dropdownMenu = dropdown.find('.dropdown-menu');
  const appendToBody = dropdownMenu.data('append-to-body');

  if (dropdownMenu && appendToBody) {
    let dropdownMenuMarginTop = -5;
    let dropdownMenuMarginLeft = 0;

    if (
      dropdownMenu.hasClass('dropdown-menu--position-top-left') ||
      dropdownMenu.hasClass('dropdown-menu--position-top-right')
    ) {
      dropdownMenuMarginTop = 5;
    } else if (
      dropdownMenu.hasClass('dropdown-menu--position-left-top') ||
      dropdownMenu.hasClass('dropdown-menu--position-left-bottom')
    ) {
      dropdownMenuMarginLeft = 5;
    } else if (
      dropdownMenu.hasClass('dropdown-menu--position-right-top') ||
      dropdownMenu.hasClass('dropdown-menu--position-right-bottom')
    ) {
      dropdownMenuMarginLeft = -5;
    }

    // Detach and append dropdown menu to body on show
    dropdown.on('show.bs.dropdown', event => {
      const dropdownMenuOffset = dropdownMenu.offset();
      const dropdownMenuWidth = dropdownMenu.outerWidth();

      dropdown.addClass('is-transitioning');
      $('body').append(dropdownMenu.detach());

      dropdownMenu.css({
        width: dropdownMenuWidth,
        top: dropdownMenuOffset.top,
        left: dropdownMenuOffset.left,
        minWidth: 'auto',
        right: 'auto',
        bottom: 'auto',
        marginTop: dropdownMenuMarginTop,
        marginLeft: dropdownMenuMarginLeft,
      });
    });

    // Add visibility class to dropdown after it is shown
    dropdown.on('shown.bs.dropdown', event => {
      setTimeout(() => {
        dropdownMenu.addClass('is-visible');
        dropdown.removeClass('is-transitioning');
      });
    });

    // Remove visibility class from dropdownMenu on hide
    dropdown.on('hide.bs.dropdown', event => {
      dropdown.addClass('is-transitioning');
      dropdownMenu.removeClass('is-visible');
    });

    // Once hidden, detach and append dropdown menu back to
    // original position w/in dropdown container after it is hidden
    dropdown.on('hidden.bs.dropdown', event => {
      const transitionDuration = 150;

      setTimeout(() => {
        dropdown.append(dropdownMenu.detach());

        dropdownMenu.css({
          width: '',
          minWidth: '',
          top: '',
          left: '',
          right: '',
          bottom: '',
          marginTop: '',
          marginLeft: '',
        });

        dropdown.removeClass('is-transitioning');
      }, transitionDuration);
    });
  }
});

// Toggle content/excerpt
$('[data-show-content]').on('click', () => {
  $('[data-excerpt]').hide();
  $('[data-content]').show();
});

// Scanner DataTables
$('.scanner-load-content table').DataTable();
