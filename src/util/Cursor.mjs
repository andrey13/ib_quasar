//---------------------------------------------------------------------------------------
function renderStartedCursor(tabulator, table) {
    //console.log("renderStarted");
    if ((tabulator.rowManager.activeRowsCount > 0) && (table.id_current == 0)) {
        table.id_current = tabulator.rowManager.activeRows[0].data.id;
    }
    //console.log("renderStarted table.id_current=", table.id_current);
    table.row_current = tabulator.searchRows("id", "=", table.id_current)[0];
}
//---------------------------------------------------------------------------------------
function rowFormatterCursor(row, table) {
    //console.log("rowFormatterCursor");
    // сохранение цвета фона и -рифта текущей записи---------------------------------
    table.bg_current = row.getElement().style.backgroundColor;
    //console.log('row.getElement().style.backgroundColor1=',row.getElement().style.backgroundColor)
    //console.log("rowFormatterCursor -> table.bg_current1=", table.bg_current);

    if (row.getData().id == table.id_current) {
        // изменение цвета фона и -рифта текущей записи----------------------------------
        row.getElement().style.backgroundColor = "#008080";  // w3-teal
        row.getElement().style.color = "#FFFFFF";  //
    } else {
        // изменение цвета фона и -рифта остальных записей-------------------------------
        //row.getElement().style.backgroundColor = '';
        row.getElement().style.color = "#000000";
    }
}
//---------------------------------------------------------------------------------------
function rowClickCursor(row, table) {
    //console.log("rowClickCursor---------------------------------------------------------------------------");
    //console.log("rowClickCursor -> row.id", row.getData().id);
    //console.log("rowClickCursor -> id_current", table.id_current);

    if (row.getData().id == table.id_current) {
        //console.log("rowClickCursor - row.id=id_current");
        return false;
    }

    // установить указатель на новую строку -----------------------------------------
    table.id_current = row.getData().id;

    if (table.row_current) {
        //console.log("rowClickCursor -> row_current", table.row_current.getData().id);
        // вернуть цвет фона и текста быв-ей текущей строке -----------------------------
        table.row_current.getElement().style.backgroundColor = table.bg_current;
        //table.row_current.getElement().style.backgroundColor = '';
        table.row_current.getElement().style.color = "#000000";
        // переформатировать быв-ую текущей строку --------------------------------------
        table.row_current.reformat();
        // назначить новую текущую строку -----------------------------------------------
    }
    table.row_current = row;
    // переформатировать новую текущую строку ---------------------------------------
    table.row_current.reformat();

    return true;
}

//---------------------------------------------------------------------------------------
function cellClickCursor(cell, table) {
    //console.log("cellClickCursor");
    let v_fieldName = cell.getField();
    //if (v_fieldName != "id") return;

    // вернуть цвет фона и текста быв-ей текущей строке -----------------------------
    table.row_current.getElement().style.backgroundColor = table.bg_current;
    table.row_current.getElement().style.color = "#010101";

    // установить указатель на новую строку -----------------------------------------
    table.id_current = cell.getRow().getData().id;

    // переформатировать быв-ую текущей строку --------------------------------------
    table.row_current.reformat();

    // назначить новую текущую строку -----------------------------------------------
    table.row_current = cell.getRow();

    // переформатировать новую текущую строку ---------------------------------------
    table.row_current.reformat();
}

export {
    renderStartedCursor,
    rowFormatterCursor,
    rowClickCursor,
    cellClickCursor,
}
