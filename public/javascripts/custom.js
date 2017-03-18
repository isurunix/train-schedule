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
  calendar = $("#calendar").pickadate({
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd'
  });

});

function searchTrain() {
  var fromStationCode = fromCombo.getSelectedValue();
  var toStationCode = toCombo.getSelectedValue();
  var date = calendar.get()[0].value;
  var url = "/search?from=" + fromStationCode + "&to=" + toStationCode + "&date=" + date;

  $.get(url, function (data) {
    console.log(data);
    $('#table').text(data);
  });
}
