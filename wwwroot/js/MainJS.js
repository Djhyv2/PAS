function PopulateYears(ddlYear)
{
    let year;
    for (year = new Date().getFullYear(); year >= 2004; year--) {
        ddlYear.append(`<option>${year}</option>`);
    }//Add years to combobox
}

function PopulateBigBrothers(cmbBigBrother, jsonBrothers, value = -1)
{
    $.each(jsonBrothers, (index, value) =>
    {
        cmbBigBrother.append(`<option value=${value.id}>${value.name} (${value.staffName})</option>`);
    })//Adds brothers to drop down list
    cmbBigBrother.val(value);//Sets option before converting to combobox
    cmbBigBrother.combobox();//Converts select to combobox
}