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

   calendar = new dhtmlXCalendarObject("calendar");
});