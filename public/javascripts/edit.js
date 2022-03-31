$(document).ready(async function (){
    const response = await getData();
    load(response.data);
    function getData()
    {
        return $.ajax({
            url: `/fields/times/${id}`,
            method: 'post',
            dataType: 'json'
        })
    }
    function load(data)
    {
            $.each(data, function(index, data) {
                if (index > 0) {
                    console.log(data)
                    $("#time").append(`<div class="atTime">
                    <div class="Time">
                        <label for="startTime" class="Time">Giờ bắt đầu: </label>
                        <input type="time" id="startTime" name="price[start]" min="00:00" max="23:59" value="${data.start}" required>
                    </div>
                    <div class="Time">
                        <label for="endTime" class="Time">Giờ kết thúc: </label>
                        <input type="time" id="endTime" name="price[end]" min="00:00" max="23:59" value="${data.end}" required>
                    </div>
                    <div class="Time">
                        <label for="price" class="Time">Giá: </label>
                        <input class="prices" type="number" id="price" name="price[price]" min="100 000" value="${data.price}" required>
                        <label for="price" class="Time">VND </label>
                    </div>
                </div>`)
                }
            });
    }
})