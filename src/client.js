const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault();

    const body = compileFormData(false);
    
    console.log(body);

    const response = await fetch( "/api/submit", {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    });
    const text = await response.text();
    
    appendScoutingData(text);
    
    document.getElementById("scoutingForm").reset();
    
};

const appendScoutingData = function( text ) {
    const button = document.querySelector("button");
    button.onclick = submit;
    
    var scoutingData;
    try {
        scoutingData = JSON.parse(text);
    } catch (error) {
        console.log(error);
        window.location.href = "/api/login";
        return;
    }
    
    console.log( "scouting data:", text );
    
    if (scoutingData.length > 0) {
        // Create header row
        document.getElementById("matches").innerHTML = "";
        const table = document.createElement("table");
        table.className = "table";
        document.getElementById("matches").appendChild(table);
        const tr = document.createElement("tr");
        for (var prop in scoutingData[0]) {
            if (!prop.includes('_') && Object.prototype.hasOwnProperty.call(scoutingData[0], prop)) {
                var th = document.createElement("th");
                th.innerHTML = prop;
                tr.appendChild(th);
            }
        }
        var th = document.createElement("th");
        tr.appendChild(th);
        table.appendChild(tr);

        // Create rest of table
        for ( let i = 0; i < scoutingData.length; i++ ) {
            console.log( "match:", scoutingData[i]);
            const tr = document.createElement("tr");
            tr.id = scoutingData[i]["_id"];
            // Insert all data into this row
            for (var prop in scoutingData[i]) {
                if (!prop.includes('_') && Object.prototype.hasOwnProperty.call(scoutingData[i], prop)) {
                    var td = document.createElement("td");
                    td.innerHTML = scoutingData[i][prop];
                    tr.appendChild(td);
                }
            }
            
            // Add button to delete this row of data
            var buttonCell = document.createElement("td");
            buttonCell.innerHTML = `<button aria-label="Delete" class="delete" onclick="del('${tr.id}')"><span class="icon is-small"> <i class="fa fa-trash"></i> </span></button>
                                   <button aria-label="Edit" class="edit button is-rounded is-small" onclick="edit('${tr.id}')"><span class="icon is-small"> <i class="fa fa-pencil"></i> </span></button>`;
            tr.appendChild(buttonCell);
            
            
            // Add row to table
            table.appendChild(tr);
        }
    }
    else {
        document.getElementById("matches").innerHTML = "No results yet.";
    }
    
};

const getData = async function() {
    const response = await fetch( "/api/data", {
        method:'GET'
    });
    const text = await response.text();
    
    appendScoutingData(text);
};

const del = async function ( rowId ) {
    const response = await fetch( "/api/" + rowId, {
        method:'DELETE'
    });
    const text = await response.text();
    
    appendScoutingData(text);
};

const edit = function ( rowId ) {
    var editButtons = document.getElementsByClassName("edit");
    while (editButtons[0]) {
        editButtons[0].parentElement.removeChild(editButtons[0]);
    }
    
    var tableRow = document.getElementById(rowId);
    var cells = tableRow.children;
    
    var value = cells[0].innerHTML;
    cells[0].innerHTML = `<input class="input is-small" type="number" id="matchnumEdit">`;
    cells[0].children[0].value = value;
    value = cells[1].innerHTML;
    cells[1].innerHTML = `<input class="input is-small" type="number" id="teamEdit">`;
    cells[1].children[0].value = value;
    value = cells[2].innerHTML;
    cells[2].innerHTML = `<select class="select is-small" id="startingposEdit" name="startingpos">
                            <option value="Red Left">Red Left</option>
                            <option value="Red Center">Red Center</option>
                            <option value="Red Right">Red Right</option>
                            <option value="Blue Left">Blue Left</option>
                            <option value="Blue Center">Blue Center</option>
                            <option value="Blue Right">Blue Right</option>
                        </select>`;
    cells[2].children[0].value = value;
    value = cells[3].innerHTML;
    cells[3].innerHTML = `<input type="radio" name="leaveEdit" id="leave-y" value="Yes"><label for="leave-y">Yes</label><br/>
                        <input type="radio" name="leaveEdit" id="leave-n" value="No"><label for="leave-y">No</label>`;
    if (value === "Yes") {
        cells[3].children[0].setAttribute("checked", "");
    } else {
        cells[3].children[3].setAttribute("checked", "");
    }
    value = cells[4].innerHTML;
    cells[4].innerHTML = `<input type="radio" name="gamepieceEdit" id="gamepiece-coralEdit" value="coral"><label for="gamepiece-coral">Coral</label><br/>
                        <input type="radio" name="gamepieceEdit" id="gamepiece-algaeEdit" value="algae"><label for="gamepiece-algae">Algae</label>`;
    if (value === "coral") {
        cells[4].children[0].setAttribute("checked", "");
    } else {
        cells[4].children[3].setAttribute("checked", "");
    }
    value = cells[5].innerHTML;
    cells[5].innerHTML = `<input class="input is-small" type="number" id="coralEdit">`;
    cells[5].children[0].value = value;
    value = cells[6].innerHTML;
    cells[6].innerHTML = `<input class="input is-small" type="number" id="algaeEdit">`;
    cells[6].children[0].value = value;
    value = cells[7].innerHTML;
    cells[7].innerHTML = `<select class="select is-small" id="endgameEdit" name="endgame">
                            <option value="shallow">Shallow Climb</option>
                            <option value="deep">Deep Climb</option>
                            <option value="park">Park</option>
                            <option value="none">None</option>
                        </select>`;
    cells[7].children[0].value = value;
    value = cells[8].innerHTML;
    cells[8].innerHTML = `<input class="input is-small" type="number" id="pointsEdit">`;
    cells[8].children[0].value = value;
    value = cells[9].innerHTML;
    cells[9].innerHTML = `<input type="radio" name="matchresultEdit" id="winEdit" value="win"><label for="win">Win</label><br/>
                        <input type="radio" name="matchresultEdit" id="loseEdit" value="lose"><label for="lose">Lose</label><br/>
                        <input type="radio" name="matchresultEdit" id="tieEdit" value="tie"><label for="tie">Tie</label>`;
    if (value === "win") {
        cells[9].children[0].setAttribute("checked", "");
    } else if (value === "lose") {
        cells[9].children[3].setAttribute("checked", "");
    } else {
        cells[9].children[6].setAttribute("checked", "");
    }
    
    cells[11].innerHTML = `<button aria-label="Update" class="update button is-success is-small" onclick="update('${tableRow.id}')">
                        <span class="icon is-small"> <i class="fa fa-check"></i> </span></button>`;
};

const update = async function ( rowId ) {
    const body = compileFormData(true);
    console.log(body);
    
    const response = await fetch( "/api/" + rowId, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    });
    const text = await response.text();
    
    appendScoutingData(text);
};

const compileFormData = function (edit) {
    var suffix = "";
    if (edit) {
        suffix = "Edit";
    }
    
    const match = document.querySelector( "#matchnum" + suffix ),
        t = document.querySelector("#team" + suffix),
        start = document.querySelector("#startingpos" + suffix),
        l = document.querySelector(`input[name="leave${suffix}"]:checked`),
        g = document.querySelector(`input[name="gamepiece${suffix}"]:checked`),
        c = document.querySelector("#coral" + suffix),
        a = document.querySelector("#algae" + suffix),
        e = document.querySelector("#endgame" + suffix),
        p = document.querySelector("#points" + suffix),
        r = document.querySelector(`input[name="matchresult${suffix}"]:checked`),
        json = { 
            matchnum: match.value,
            team: t.value,
            startingpos: start.value,
            leave: l.value,
            gamepiece: g.value,
            coral: c.value,
            algae: a.value,
            endgame: e.value,
            points: p.value,
            matchresult: r.value
        };
    
    return JSON.stringify( json );
};

window.onload = function() {
    //const button = document.querySelector("button");
    //button.onclick = submit;
    
    getData();
};
