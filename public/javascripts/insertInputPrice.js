$(document).ready(async function (){
    $("#add-input-price").on("click", ()=>{
        $("#time").append(`  <div class="atTime">
        <div class="Time">
            <label for="startTime" class="Time">Giờ bắt đầu: </label>
            <input type="time" id="startTime" name="price[start]" min="00:00" max="23:59" required>
        </div>
        <div class="Time">
            <label for="endTime" class="Time">Giờ kết thúc: </label>
            <input type="time" id="endTime" name="price[end]" min="00:00" max="23:59" required>
        </div>
        <div class="Time">
            <label for="price" class="Time">Giá: </label>
            <input class="prices" type="number" id="price" name="price[price]" min="100 000" required>
            <label for="price" class="Time">VND </label>
        </div>
    </div>`)
    })
})