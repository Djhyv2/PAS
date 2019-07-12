$(document).ready(() =>
{
    PopulateYears($('#ddlYear'));
    jsonBrothers = JSON.parse($('#jsonBigBrothers').val());//Parses json string into object
    PopulateBigBrothers($(`#cmbBigBrother`), jsonBrothers);//Populates combobox
});