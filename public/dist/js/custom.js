$(function () {
    $('#searchBtn').click(function() {
        "use strict";
        $("#loader").show();
        setTimeout(showResult, 2000);
    })

    function showResult() {
        $("#loader").hide();
        $("#result").show();
    }

    $('#orderBtn').click(function () {
        var notify = $.notify('<strong>Sending Txn</strong> Do not close this page...', {
            type: 'success',
            allow_dismiss: false,
            showProgressbar: true,
            onClosed: function () {
                $('#buyBtn').hide();
                $('#downloadBtn').show();
                $('#avtokens').html('1217');
                $('#totokens').html('1760');
            }
        });

        setTimeout(function() {
            notify.update('message', '<strong>Confirmation</strong> 1/10.');
        }, 1000);

        setTimeout(function() {
            notify.update('message', '<strong>Confirmation</strong> 6/10.');
        }, 2000);

        setTimeout(function() {
            notify.update('message', '<strong>Confirmation</strong> 10/10.');
        }, 3000);

        setTimeout(function() {
            notify.update('message', '<strong>Your Data</strong> is ready!');
        }, 4000);

        setTimeout(function() {
            notify.update('message', '<strong>Your Balance</strong> is updated!');
        }, 5000);
    });
});