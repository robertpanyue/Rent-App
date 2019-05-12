$(document).ready(function () {

  $("#startDate").datetimepicker({
    dateFormat: "dd-M-yy",
    minDate: 0,
    onSelect: function () {
      var endDate = $('#endDate');
      var startDate = $(this).datepicker('getDate');
      var minDate = $(this).datepicker('getDate');
      var ed = endDate.datepicker('getDate');
      //difference in days. 86400 seconds in day, 1000 ms in second
      var dateDiff = (ed - minDate)/(86400 * 1000);

      startDate.setDate(startDate.getDate() + 30);
      if (ed == null || dateDiff < 0) {
      		endDate.datepicker('setDate', minDate);
      }
      else if (dateDiff > 30){
      		endDate.datepicker('setDate', startDate);
      }
      //sets dt2 maxDate to the last day of 30 days window
      endDate.datepicker('option', 'maxDate', startDate);
      endDate.datepicker('option', 'minDate', minDate);
    }
  });
  $('#endDate').datepicker({
    dateFormat: "dd-M-yy",
    minDate: 0
  });
});
