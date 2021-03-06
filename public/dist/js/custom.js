$(function () {
    $('#searchBtn').click(function() {
        "use strict";
        $("#loader").show();
        $('#resTbody').text("");
        setTimeout(showResult, 100);
    });

    function showResult() {
        var selectedFlags = $("#flagOptions").select2("val");
        var flagsQuery = "";
        selectedFlags.forEach(function(flag){
            "use strict";
            flagsQuery += flag + "*";
        });
        flagsQuery = flagsQuery.substring(0,flagsQuery.length-1);

        var selectedCategory = $("#categoryOptions").select2("val");
        var categoryQuery = "";
        selectedCategory.forEach(function(category){
            "use strict";
            categoryQuery += category + "*";
        });
        categoryQuery = categoryQuery.substring(0,categoryQuery.length-1);

        var selectedPrecondition = $("#preconditionOptions").select2("val");
        var preconditionQuery = "";
        selectedPrecondition.forEach(function(precondition){
            "use strict";
            preconditionQuery += precondition + "*";
        });
        preconditionQuery = preconditionQuery.substring(0,preconditionQuery.length-1);

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/getDataByAllFilters/" + categoryQuery + "/" + flagsQuery + "/" + preconditionQuery,
            contentType: 'application/json',
            async: false,
            success: function (data) {
                var res = JSON.parse(data);

                var tableContent = "";
                var index = 1;
                res = res.reverse();
                console.log(res);
                res.forEach(function (record) {
                    var dataContent = record['data'];
                    var date = new Date(dataContent["dateTime"]);
                    //console.log(dataContent["preconditions"]);
                    tableContent = "<tr> " +
                        "<th scope=\"row\">"+index+"</th> " +
                        "<td>"+dataContent["data"]+"<\/td> " +
                        "<td>"+dataContent["category"]+"<\/td> " +
                        "<td>"+dataContent["preconditions"]+"<\/td> " +
                        "<td>"+dataContent["flags"]+"<\/td> " +
                        "<td>"+date+"<\/td> " +
                        "<td>"+dataContent["deviceId"].split("#")[1] + ": " + dataContent["deviceId"].split("#")[2] +"<\/td> " +
                        "</tr>" + tableContent;
                    index++;
                });

                $('#resTbody').append(tableContent);

                $("#result").show();
                $("#loader").hide();

                $("#resTable").DataTable();
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