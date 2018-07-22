$(function () {
    $('#searchBtn').click(function() {
        "use strict";
        $("#loader").show();
        setTimeout(showResult, 2000);
    });

    function showResult() {
        var selectedFlags = $("#flagOptions").select2("val");
        var flagsQuery = "";
        selectedFlags.forEach(function(flag){
            "use strict";
            flagsQuery += flag + "*";
        });
        flagsQuery = flagsQuery.substring(0,flagsQuery.length-1);
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/searchDataByFlags/" + flagsQuery,
            contentType: 'application/json',
            async: false,
            success: function (data) {
                var res = JSON.parse(data);

                var tableContent = "";
                var index = 1;
                res.forEach(function (record) {
                    var dataContent = record['data'];
                    tableContent += "<tr> " +
                        "<th scope=\"row\">"+index+"</th> " +
                        "<td>"+dataContent["data"]+"<\/td> " +
                        "<td>"+dataContent["category"]+"<\/td> " +
                        "<td>"+dataContent["flags"]+"<\/td> " +
                        "<td>"+dataContent["dateTime"]+"<\/td> " +
                        "<td>"+dataContent["deviceId"].split("#")[1] + ": " + dataContent["deviceId"].split("#")[2] +"<\/td> " +
                        "</tr>";
                    index++;
                });

                $('#resTbody').append(tableContent);

                $("#result").show();
                $("#loader").hide();
            },
            error: function (textStatus, errorThrown) {
                Success = false;//doesnt goes here
            }
        });
    }

    $('#orderBtn').click(function () {
        var notify = $.notify('<strong>Sending Txn</strong> Do not close this page...', {
            type: 'success',
            allow_dismiss: false,
            showProgressbar: true,
            onShow: function () {
                //call pay api
                $.ajax({
                    type: "GET",
                    url: "http://localhost:3000/pay",
                    contentType: 'application/json',
                    async: false,
                    success: function (data) {
                        Success = true;//doesnt goes here
                    },
                    error: function (textStatus, errorThrown) {
                        Success = false;//doesnt goes here
                    }
                });
            },
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