$(document).ready(() =>
{
    PopulateYears($('#ddlYear'));
    jsonBrothers = JSON.parse($('#jsonBigBrothers').val());//Parses json string into object
    PopulateBigBrothers($(`#cmbBigBrother`), jsonBrothers, $('#inputBigBrother').val());//Populates combobox
    $('#ddlYear').val($('#inputYear').val());//Sets year dropdown
    $('#ddlStatus').val($('#inputStatus').val());//Sets status dropdown
});