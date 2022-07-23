
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
                    circleGen(getCircles());
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
                elementDef2 = document.getElementById('theBottom');
                var topExc = elementDef.getBoundingClientRect();
                var botExc = elementDef2.getBoundingClientRect();

                topEdge = topExc.top;
                bottomEdge = topExc.top + topExc.height;
                zebottom = botExc.top;

                //this code \/ \/ \/ very important and I fail to understand why 

                var selectMenu = document.querySelector(".menu");
                selectMenu.onchange = function () {
                    console.log("changed"); }


            //creating circles in the background 

            function getCircles() {
            
                docHeight = $(document).height()
                number = Math.round(docHeight/69);
                return number;

            }

            circles = [];

            function circleGen(num) {

            for (i = 0; i < (num * 2); i++) {
                
                maxHeight = $(document).height() - 250;

                circles.push(document.createElement('div'));
                circles[i].setAttribute('id',i);
                document.body.appendChild(circles[i]);

                document.getElementById(i).style.borderRadius = '50%';
                document.getElementById(i).style.zIndex = -1;

                randomColor = Math.floor(Math.random()*16777215).toString(16);
                randomColor = "#" + randomColor;
                document.getElementById(i).style.backgroundColor = randomColor;

                randomSize = Math.floor(Math.random() * (150 - 30 + 1) + 30).toString();
                randomSize = randomSize + "px";
                document.getElementById(i).style.height = randomSize;
                document.getElementById(i).style.width = randomSize;

                randomP1 = Math.floor(Math.random() * (maxHeight - 1 + 1) + 1).toString();
                if (((randomP1 >= topEdge) && (randomP1 <= bottomEdge))) {
                    while (((randomP1 >= topEdge) && (randomP1 <= bottomEdge)) || (randomP1 >= zebottom)) {
                        randomP1 = Math.floor(Math.random() * (maxHeight - 1 + 1) + 1).toString();
                    }
                }
                if (randomP1 >= document.getElementById('theBottom').getBoundingClientRect().top) {
                    while (randomP1 >= document.getElementById('theBottom').getBoundingClientRect().top) {
                        randomP1 = Math.floor(Math.random() * (maxHeight - 1 + 1) + 1).toString();
                    }
                } 
                randomP1 = randomP1 + 'px';

                randomP2 = Math.floor(Math.random() * (100 - 1 + 1) + 1).toString();
                randomP2 = randomP2 + '%';
                document.getElementById(i).style.position = "absolute";
                document.getElementById(i).style.top = randomP1;
                document.getElementById(i).style.right = randomP2; 

                randomOp = Math.floor(Math.random() * (100 - 1 + 1) + 1).toString();
                randomOp = randomOp + "%";
                document.getElementById(i).style.opacity = randomOp;

               }
            }

       $(window).on('load', function(){ 
            
               circleGen(getCircles());

           }); 

        $('select').on('change', function() {

            for (i = 0; i < circles.length; i++) {
                circles[i].remove();
                }

            circleGen(getCircles());

        });

            // function for shuffling the array that builds table

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
            }

        var myArray = shuffle(myArray); 

            //making randomize button work

          $(document).ready(function() {
            $("#button").click(function(){

                var select = document.getElementById('filter');
                var selection = select.options[select.selectedIndex].value;
                var table = document.getElementById('tableData');
                var tableRows = table.getElementsByTagName("tr");

                //function to delete old table and build new one with shuffling rows

                function reFresh() {
                    shuffle(myArray);
                        
                    var tableHeaderRowCount = 0;
                    var rowCount = myArray.length;
                    for (var i = tableHeaderRowCount; i < rowCount; i++) {
                        table.deleteRow(tableHeaderRowCount);
                    }

                    buildTable(myArray); 

                }
                    //simply shuffles upon on filter
                    if (selection == "-") { 

                        reFresh();

                    }
                    //upon detecting filter first shuffles then filters again with old code
                    else { 

                        reFresh();

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

            }); 
        }); 

        //makes it so "jump to bottom and top" work without changing link

        jQuery(document).ready(function($) {

            $(".jump").click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1200);
            });
        });


