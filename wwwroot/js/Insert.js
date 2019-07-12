let nextRow = 0;//Stores value of next row to be added
let jsonBrothers;//Stores all brothers and ids

$(document).ready(() =>
{
    let year;
    PopulateYears($('#ddlYear'));

    jsonBrothers = JSON.parse($('#jsonBigBrothers').val());//Parses json string into object
});

function addRow()
{
    let frmBrothers = $('#frmBrothers');
    $(`
    <div class="form-row" id="row${nextRow}">
        <div class="p-1 col-3 my-1">
            <input type="text" class="form-control" id="txtName${nextRow}" name="txtName${nextRow}" required />
        </div>
        <div class="p-1 col-3 my-1">
            <input type="text" class="form-control" id="txtStaffName${nextRow}" name="txtStaffName${nextRow}" required />
        </div>
        <div class="p-1 col-3 my-1">
            <select class="form-control" id="cmbBigBrother${nextRow}" name="cmbBigBrother${nextRow}" required>
                <option value=-1></option>
            </select>
        </div>
        <select class="form-control custom-select p-1 col-2 my-2" id="ddlStatus${nextRow}" name="ddlStatus${nextRow}" required>
            <option value="Brother">Brother</option>
            <option value="Elder">Elder</option>
            <option value="Founder">Founder</option>
        </select>
        <div class="p-1 my-1 col-1">
            <button class="btn-block btn" type="button" onclick="deleteRow(${nextRow})">x</button>
        </div>
    </div>`).insertBefore('#btnSubmit');//Adds row to form
    PopulateBigBrothers($(`#cmbBigBrother${nextRow}`), jsonBrothers);//Populates combobox
    $('#btnSubmit').val(nextRow);//Sets button value to track how many rows have been submitted
    nextRow++;
}//Adds row to form

function deleteRow(rowNumber)
{
    $(`#row${rowNumber}`).remove();//Deletes row
}