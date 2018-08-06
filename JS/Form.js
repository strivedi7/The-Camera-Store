var isSubmit = true;
var count = 3;
$(document).ready(function () {
    cart = new shopping_cart("jadrn046");
    $("#SameAddress").change(function () {
        if ($("#SameAddress").is(':checked')) {
            $("input[name=FName2]").val($("input[name=FName]").val());
            $("input[name=LName2]").val($("input[name=LName]").val());
            $("input[name=MName2]").val($("input[name=MName]").val());
            $("input[name=Add012]").val($("input[name=Add01]").val());
            $("input[name=Add022]").val($("input[name=Add02]").val());
            $("input[name=City2]").val($("input[name=City]").val());
            $("input[name=Zip2]").val($("input[name=Zip]").val());
            $("input[name=Phone2]").val($("input[name=Phone]").val());
            $("#State2").val($("#State").val());
        } 
    });
    $( "#FName" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=FName2]").val($("input[name=FName]").val());
       }
    });
    $( "#LName" ).keyup(function() {
        //alert("LName keyup");
       if ($("#SameAddress").is(':checked')) {
             $("input[name=LName2]").val($("input[name=LName]").val());
       }
    });
    $( "#MName" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=MName2]").val($("input[name=MName]").val());
       }
    });
    $( "#Add01" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=Add012]").val($("input[name=Add01]").val());
       }
    });
    $( "#Add02" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=Add022]").val($("input[name=Add02]").val());
       }
    });
    $( "#City" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=City2]").val($("input[name=City]").val());
       }
    });
    $( "#Zip" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=Zip2]").val($("input[name=Zip]").val());
       }
    });
    $( "#Phone" ).keyup(function() {
       if ($("#SameAddress").is(':checked')) {
            $("input[name=Phone2]").val($("input[name=Phone]").val());
       }
    });
    $( "#State" ).change(function() {
        if ($("#SameAddress").is(':checked')) {
            $("#State2").val($("#State").val());
       }
    });
});
