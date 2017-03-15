/**
 * Created by isuru on 3/12/17.
 */
var fromCombo, toCombo;
var calendar;
$(document).ready(function () {
   fromCombo = dhtmlXComboFromSelect('from-station');
   fromCombo.enableFilteringMode(true);
   fromCombo.selectOption(0);

   toCombo = dhtmlXComboFromSelect('to-station');
   toCombo.enableFilteringMode(true);
   toCombo.selectOption(0);

   // calendar = new dhtmlXCalendarObject("calendar");
   $("#calendar").pickadate({
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd'
   });

});

function searchTrain() {
    var fromStationCode = $('#from-station').val();
    var toStationCode = $('#to-station').val();
    var date = $('#calender').val();
    var url = "http://railway.lankagate.gov.lk/train/searchTrain?startStationID="+fromStationCode+"&endStationID="+toStationCode+"&searchDate="+date+
        "&startTime=00:00:00&endTime=23:59:00&lang=en"

    $.get(url, function (data) {
       $('#table').val(data);
    });
}
