function initMenus() {
    $.ajax({
        type: 'GET',
        url: '/admin/currentMenus',
        async: false,
        success: function (data) {
            if (data.code == 0) {
                // showMsg(data.msg, "error", 1000);
            } else {
                var content = ' <li class="header">HEADER</li>';
                $.each(data.result, function (index, value) {
                    if (value.childPermissions != null) {
                        content += '<li class="treeview">' +
                            '   <a data-pjax="true" href="' + value.url + '">' +
                            // '   <i class="' + value.icon + '"></i>' +
                            '   <span>' + value.name + '</span>' +
                            '   <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>' +
                            '   </a>';
                        content += '<ul class="treeview-menu">';
                        $.each(value.childPermissions, function (index2, value2) {
                            content +=
                                '    <li>' +
                                '        <a data-pjax="true" href="' + value2.url + '">' +
                                // '            <i class="' + value2.icon + '"></i>' +
                                '            <i class="fa fa-circle-o"></i>' +
                                value2.name +
                                '        </a>' +
                                '     </li>';
                        });
                        content += '</ul></li>';

                    } else {
                        content += '<li>' +
                            '   <a data-pjax="true" href="' + value.url + '">' +
                            // '   <i class="' + value.icon + '"></i>' +
                            '   <span>' + value.name + '</span>' +
                            '   </a>' +
                            '</li>';
                    }
                    ;
                })
                $('.sidebar-menu').html(content);
            }

        }
    });
}

initMenus();

$(document).ready(function () {
    if ($(window).width() < 1024) {
        if ($('body').hasClass('layout-boxed')) {
            $('body').removeClass('layout-boxed');
        }
        if ($('body').hasClass('sidebar-collapse')) {
            $('body').removeClass('sidebar-collapse');
        }
    }
    initMenu();
});

/**
 * https://github.com/JpressProjects/jpress/blob/master/jpress-web/src/main/resources/static/admin/js/jpressadmin.js
 */
function initMenu() {
    var pathName = location.pathname;
    $(".sidebar-menu").children().each(function () {
        var li = $(this);
        li.find('a').each(function () {
            var href = $(this).attr("href");
            if (pathName == href) {
                li.addClass("active");
                $(this).parent().addClass("active");
            } else {
                //li.removeClass("active");
                $(this).parent().removeClass("active");
            }
        });
    });
}


$(document).on('pjax:clicked', function () {
    $('.content-wrapper').html("");
});

$(document).on('pjax:complete', function () {
    initMenu();
});

/**
 * 提示框
 * @param text
 * @param icon
 * @param hideAfter
 */
function showMsg(text, icon, hideAfter) {
    if (heading == undefined) {
        var heading = "Tips";
    }
    $.toast({
        text: text,
        heading: heading,
        icon: icon,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: hideAfter,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff'
    });
}

function showMsgAndReload(text, icon, hideAfter) {
    if (heading == undefined) {
        var heading = "Tips";
    }
    $.toast({
        text: text,
        heading: heading,
        icon: icon,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: hideAfter,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff',
        afterHidden: function () {
            window.location.reload();
        }
    });
}

function showMsgAndRedirect(text, icon, hideAfter, redirectUrl) {
    if (heading == undefined) {
        var heading = "Tips";
    }
    $.toast({
        text: text,
        heading: heading,
        icon: icon,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: hideAfter,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff',
        afterHidden: function () {
            window.location.href = redirectUrl;
        }
    });
}


function showMsgAndOpen(text, icon, hideAfter, redirectUrl) {
    if (heading == undefined) {
        var heading = "Tips";
    }
    $.toast({
        text: text,
        heading: heading,
        icon: icon,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: hideAfter,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff',
        afterHidden: function () {
            window.open(redirectUrl);
        }
    });
}


/**
 * 全选和反选
 * @constructor
 */
function doCheck() {
    var ch = document.getElementsByName("ids");
    if (document.getElementById("allSelect").checked == true) {
        for (var i = 0; i < ch.length; i++) {
            ch[i].checked = true;
        }
    } else {
        for (var i = 0; i < ch.length; i++) {
            ch[i].checked = false;
        }
    }
}


