function buildTable(data) {
    var table = document.getElementById('grid')

    for (var i = 0; i < data.length; i++) { 
        // combine the two dataTags items into one .. then add to the row ...
        let dataTags = (data[i].dataTag1 + " " + data[i].dataTag2).trim();
        let rowNumber = i.toString();
        var row = `<div class="row" data-tags='${(dataTags)}'>
        <div class="cell s"><a href="${data[i].link}" target="_blank">${data[i].site}</a></div>
        <div class="cell d">${data[i].description}</div>
        <div class="cell t">${data[i].tags}</div>
        </div>`
                // add the row & cells code ...
                table.innerHTML += row;
    }
}

        goodToGo = true;

        window.onload = function () {
            // DOM elements are ready ...

            // populate the table, using the data from an array.
            buildTable(myArray); 
            randomize();
            limitRows();
            circleGen();

            // which table tbody has the rows to filter? 
            let tableData = document.getElementById("grid");
            // grab the collection of TRs including the withheld rows
            let tableRows = tableData.querySelectorAll("[data-tags]");


            // selection box changes ..
            var selectMenu = document.querySelector(".menu");
            selectMenu.onchange = function () {
                goodToGo = false;
                let selection = this.value;

                if (selection !== "-") {
                    document.getElementById("more").classList.add("hide-row");
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
                            if (rowTR.classList.contains("fade-in")) {
                                rowTR.classList.remove("fade-in");
                            }
                        }
                        else {
                            // doesn't have the matching data-tag
                            rowTR.classList.add("hide-row");
                        }
                    }
                    circleGen();
                }
                else {
                    document.getElementById("more").classList.remove("hide-row");
                    // show all rows
                    // remove the "hide-row" class from all rows.
                    for (let i = 0; i < tableRows.length; i++) {
                        let rowTR = tableRows[i];
                        rowTR.className = "row";
                    }
                    limitRows();
                    circleGen();
                }
            }
        }

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
            
            // capitalizing the first letter of all unique tag values
            // and capitalizing unique tag values that have two characters
            
            var uniqueDataTagTitles = [];
            for (i = 0; i < uniqueDataTags.length;  i++) {
                if (uniqueDataTags[i].length == 2) {
                    uniqueDataTagTitles.push(uniqueDataTags[i].toUpperCase());
                } else {
                    uniqueDataTagTitles.push(uniqueDataTags[i].replace(/\b\w/g, c => c.toUpperCase()));
                }
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
                    el.setAttribute('class', 'menu-item')
                    el.textContent = opt;
                    el.value = val;
                    select.appendChild(el);
                }

            circles = [];

            function circleGen() {

            if (circles.length > 0) {
                for (i = 0; i < circles.length; i++) {
                    circles[i].remove();
                }
            }

            docHeight = $(document).height();
            docWidth = $(document).width();
            num = docHeight/92;

            for (i = 0; i < (num * 2); i++) {

                circles.push(document.createElement('div'));
                circles[i].setAttribute('id',i);
                circles[i].setAttribute('class','circle');
                document.body.appendChild(circles[i]);

                randomColor = Math.floor(Math.random()*16777215).toString(16);
                randomColor = "#" + randomColor;
                document.getElementById(i).style.backgroundColor = randomColor;

                randomSize = Math.floor(Math.random() * (150 - 30 + 1) + 30).toString();
                randomSize = randomSize + "px";
                document.getElementById(i).style.height = randomSize;
                document.getElementById(i).style.width = randomSize;

                randomP1 = Math.floor(Math.random() * (docHeight - 0 + 1) + 0).toString();
                randomP1 = randomP1 + "px";
                randomP2 = Math.floor(Math.random() * (docWidth - 0 + 1) + 0).toString();   
                randomP2 = randomP2 + "px";

                document.getElementById(i).style.top = randomP1;
                document.getElementById(i).style.right = randomP2; 

                randomOp = Math.floor(Math.random() * (100 - 1 + 1) + 1).toString();
                randomOp = randomOp + "%";
                document.getElementById(i).style.opacity = randomOp;

               }
            }

            // function for shuffling the array that builds table

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
            }

            //making randomize button work

            function randomize() {
                var table = document.getElementById('grid');
                var rows = Array.from(table.querySelectorAll('.row'));
                var header = rows.shift(); // remove the first row (header) and store it in a variable

                for (i = 0; i < rows.length; i++) {
                    if (rows[i].classList.contains("fade-in")) {
                        rows[i].classList.remove("fade-in")
                    }
                }
            
                for (var i = rows.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i + 1));
                  var temp = rows[i];
                  rows[i] = rows[j];
                  rows[j] = temp;
                }
            
                // Re-add the shuffled rows to the table
                table.innerHTML = ''; // clear the table
                table.appendChild(header); // re-add the header
                rows.forEach(row => table.appendChild(row)); // re-add the shuffled rows
            }

          $(document).ready(function() {
            $("#button").click(function(){
                randomize();
            });
            });

        //limits rows of table to 50
            
        function limitRows() {
            var table = document.getElementById('grid');
            var rows = Array.from(table.querySelectorAll('.row'));
            rows.shift(); //ignores header row

            for (var i = rows.length - 1; i > 49; i--) {
                rows[i].classList.add('hide-row');
            } }

        //show more button function

        $(document).ready(function() {
            $("#more").click(function(){
                var hiddenRows = document.querySelectorAll('.hide-row');
                goodToGo = true;
                
                var i = 0;
                function fadeInRow() {
                  if (i < 49 && goodToGo) {
                    hiddenRows[i].classList.add('fade-in');
                    hiddenRows[i].classList.remove('hide-row');
                    i++;
                    setTimeout(fadeInRow, 100);
                    if (i == 49) {
                        circleGen();
                    }
                  }
                }
                fadeInRow();
            });
            });

        //makes it so "jump to bottom and top" work without changing link

        jQuery(document).ready(function($) {

            $(".jump").click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1200);
            });
        });