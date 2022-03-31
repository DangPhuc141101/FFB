$(document).ready(async function (){
    await load();
    $("#orderField-Form--day").on("change", () => {      
        const valueDate = $("#orderField-Form--day").val();
        return $.ajax({
            url: `/bookings/time/${id}?date=${valueDate}`,
            method: 'post',
            dataType: 'json',
            success: (function (response) {
              if (response.data){
                $("#orderField-Form--Time").html('');
                $("#orderField-Form--Time").append(`<option selected value="${response.data[0]}">${response.data[0]}</option>`)
                $.each(response.data, function(index, data) {
                    if (index > 0) {
                        $("#orderField-Form--Time").append(`<option selected value="${response.data[index]}">${response.data[index]}</option>`)
                    }
                });
              }
            })
        })
    })

    $("#orderField-Form--Time").on("change", () => {     
        const timeValue = $("#orderField-Form--Time").val();
        return $.ajax({
            url: `/bookings/price/${id}?time=${timeValue}`,
            method: 'post',
            dataType: 'json',
            success: (function (response) {
                $("#orderField-Form--day--price").html('');
               $("#orderField-Form--day--price").append(`<b>Giá:</b> ${response.data}`)

            })
        })
    })

    async function load()
    {
        const valueDate = $("#orderField-Form--day").val();
        const times = await getTime(valueDate);
       
        $("#orderField-Form--Time").append(`<option selected value="${times.data[0]}">${times.data[0]}</option>`)
        $.each(times.data, function(index, data) {
                if (index > 0) {
                    $("#orderField-Form--Time").append(`<option selected value="${times.data[index]}">${times.data[index]}</option>`)
                }
        });

        price =  await getPrice(times.data);
            $("#orderField-Form--day--price").append(`<b>Giá:</b> ${price.data}`)
    }
    function getTime(valueDate)
    {
        return  $.ajax({
            url: `/bookings/time/${id}?date=${valueDate}`,
            method: 'post',
            dataType: 'json'});
    }
    function getPrice(times)
    {
        return $.ajax({
            url: `/bookings/price/${id}?time=${times[0]}`,
            method: 'post',
            dataType: 'json'});
    }
})