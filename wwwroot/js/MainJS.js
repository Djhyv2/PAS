function PopulateYears(ddlYear)
{
    let year;
    for (year = new Date().getFullYear(); year >= 2004; year--) {
        ddlYear.append(`<option>${year}</option>`);
    }//Add years to combobox
}

function PopulateBigBrothers(cmbBigBrother, jsonBrothers)
{
    $.each(jsonBrothers, (index, value) =>
    {
        cmbBigBrother.append(`<option value=${value.id}>${value.name} (${value.staffName})</option>`);
    })//Adds brothers to drop down list
    cmbBigBrother.combobox();//Converts select to combobox
}