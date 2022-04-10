
function buildTable(data) {
            var table = document.getElementById('tableData')

            for (var i = 0; i < data.length; i++) {
                // combine the two dataTags items into one .. then add to the row ...
                let dataTags = (data[i].dataTag1 + " " + data[i].dataTag2).trim();
                // create the row & cells tag
                var row = `<tr data-tags='${(dataTags)}'>
           <td><a href="${data[i].link}" target="_blank">${data[i].site}</a></td>
           <td>${data[i].description}</td>
           <td>${data[i].tags}</td>
           </tr>`
                // add the row & cells code ...
                table.innerHTML += row
            }
        }

        // clear the previous console entries each time we open this page.
        //console.clear();

        window.onload = function () {
            // DOM elements are ready ...

            // populate the table, using the data from an array.
            buildTable(myArray);

            // which table tbody has the rows to filter?
            let tableData = document.getElementById("tableData");
            // grab the collection of TRs ...
            let tableRows = tableData.getElementsByTagName("tr");

            // selection box changes ..
            var selectMenu = document.querySelector(".menu");
            selectMenu.onchange = function () {

                let selection = this.value;

                if (selection !== "-") {
                    // selected a particular menu item
                    // .. loop thru the rows and hide the ones that don't match.
                    for (let i = 0; i < tableRows.length; i++) {
                        let rowTR = tableRows[i];
                        // get the row's dataTags and split them into an array
                        let rowTags = rowTR.getAttribute("data-tags").split(" ");
                        // then check if any of the tags match the selected one ..
                        if (rowTags.indexOf(selection) >= 0) {
                            // have a matching data-tag
                            if (rowTR.classList.contains("hide-row")) {
                                rowTR.classList.remove("hide-row");
                            }
                        }
                        else {
                            // doesn't have the matching data-tag
                            rowTR.classList.add("hide-row");
                        }
                    }
                }
                else {
                    // show all rows
                    // remove the "hide-row" class from all rows.
                    for (let i = 0; i < tableRows.length; i++) {
                        let rowTR = tableRows[i];
                        if (rowTR.classList.contains("hide-row")) {
                            rowTR.classList.remove("hide-row");
                        }
                    }
                }
            }
        }

       function RandomButton(arr) {
        let newPos,
        temp;

        for(let i = arr.length - 1; i > 0; i--) {

            newPos = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr
       };


      var myArray = RandomButton(myArray);


            //array that stores all unique data tags

            var uniqueDataTags = [];
            uniqueDataTags.push("-");
            for (var i = 0; i < myArray.length; i++) {
                if ((!(uniqueDataTags.includes(myArray[i].dataTag1)))&&(!(myArray[i].dataTag1 == ""))) {
                uniqueDataTags.push(myArray[i].dataTag1);
                } 
            }
          for (var i = 0; i < myArray.length; i++) {
                if ((!(uniqueDataTags.includes(myArray[i].dataTag2)))&&(!(myArray[i].dataTag2 == ""))) {
                uniqueDataTags.push(myArray[i].dataTag2);
                } 
            }

            //capitalizing the first letter of all unique tag values

            var uniqueDataTagTitles = [];
            for (i = 0; i < uniqueDataTags.length;  i++) {
                uniqueDataTagTitles.push(uniqueDataTags[i].replace(/\b\w/g, c => c.toUpperCase()));
            } 

            //taking first term from the string of all unique tag values

            var uniqueDataTagValues = [];
            for (i = 0; i < uniqueDataTags.length;  i++) {
                var z = uniqueDataTags[i].indexOf(" ");
                var firstTerm = z == -1 ? uniqueDataTags[i] : uniqueDataTags[i].substring(0, z);
                uniqueDataTagValues.push(firstTerm);
            }

            //creating dropdown list with arrays

                var select = document.getElementById("filter");

                for(var i = 0; i < uniqueDataTagTitles.length; i++) {
                    var opt = uniqueDataTagTitles[i];
                    var val = uniqueDataTagValues[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = val;
                    select.appendChild(el);
                }

            //excluding circle generation from the top of the table

                elementDef = document.getElementById('bHeader');
                var topExc = elementDef.getBoundingClientRect();

                possibleHeights = [];
                topEdge = topExc.top;
                bottomEdge = topExc.top + topExc.height;
 