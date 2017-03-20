function registerCommon() {
  $('.show-in-modal')['click'](function (_0x7c2bx1) {
    var _0x7c2bx2 = $(this)['attr']('src');
    $('#modalShow .modal-body')['html']('<img src=\'' + _0x7c2bx2 + '\' class=\'img-responsive\'>');
    $('#modalShow')['modal']('show');
    _0x7c2bx1['preventDefault']()
  });
  $('.show-image')['click'](function (_0x7c2bx1) {
    var _0x7c2bx2 = $(this)['closest']('.item-img-wrap')['find']('img:first')['attr']('src');
    $('#modalShow .modal-body')['html']('<img src=\'' + _0x7c2bx2 + '\' class=\'img-responsive\'>');
    $('#modalShow')['modal']('show');
    _0x7c2bx1['preventDefault']()
  });
  if ($('#ms-menu-trigger')[0]) {
    $('body')['on']('click', '#ms-menu-trigger', function () {
      $('.ms-menu')['toggleClass']('toggled')
    })
  }
  ;
  $('.chat-sidebar, .nav-controller, .chat-sidebar a')['on']('click', function (_0x7c2bx3) {
    $('.chat-sidebar')['toggleClass']('focus')
  });
  $('.hide-chat')['click'](function () {
    $('.chat-sidebar')['toggleClass']('focus')
  });
  $('.btn-toggle-menu')['click'](function () {
    $('#wrapper')['toggleClass']('toggled')
  });
}
//
// $(document)['ready'](function () {
//   registerCommon();
// });
function groupby(xs, func) {
    return xs.reduce(function (rv, x) {
        (rv[func(x)] = rv[func(x)] || []).push(x);
        return rv;
    }, {});
};