async function getArray() {
    const requestURL = 'tabledata.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const data = await response.json();
    return data;
}

async function buildTable(data) {
    const table = document.querySelector('#grid');
    const rows = data.map((item) => {
      const dataTags = (item.dataTag1 + ' ' + item.dataTag2).trim();
      return `
        <div class="row" data-tags="${dataTags}">
          <div class="cell s"><a href="${item.link}" target="_blank">${item.site}</a></div>
          <div class="cell d">${item.description}</div>
          <div class="cell t">${item.tags}</div>
        </div>
      `;
    });
    table.innerHTML += rows.join('');

    randomize();
    limitRows();
    circleGen();
}

        goodToGo = true;

        window.onload = function () {
            // DOM elements are ready ...

            // populate the table, using the data from an array.
            getArray().then(data => buildTable(data));

            // selection box changes ..
            var selectMenu = document.querySelector(".menu");
            selectMenu.onchange = function () {

            // which table tbody has the rows to filter? 
            let tableData = document.getElementById("grid");
            // grab the collection of TRs including the withheld rows
            let tableRows = tableData.querySelectorAll("[data-tags]");

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

            getArray().then(data => createDataTags(data))

            function createDataTags(myArray) {
                var uniqueDataTags = [];
                uniqueDataTags.push("-");
                for (var j = 0; j < myArray.length; j++) {
                  if (!uniqueDataTags.includes(myArray[j].dataTag1.trim()) && myArray[j].dataTag1.trim() !== "") {
                    uniqueDataTags.push(myArray[j].dataTag1.trim());
                  }
                }
                for (var k = 0; k < myArray.length; k++) {
                  if (!uniqueDataTags.includes(myArray[k].dataTag2.trim()) && myArray[k].dataTag2.trim() !== "") {
                    uniqueDataTags.push(myArray[k].dataTag2.trim());
                  }
                }
              
                // capitalize the first letter of each word, except for two-letter data tags which are fully capitalized
                var uniqueDataTagTitles = [];
                for (var i = 0; i < uniqueDataTags.length; i++) {
                  var tag = uniqueDataTags[i];
                  if (tag.length === 2) {
                    uniqueDataTagTitles.push(tag.toUpperCase());
                  } else {
                    var words = tag.toLowerCase().split(" ");
                    for (var j = 0; j < words.length; j++) {
                      words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
                    }
                    uniqueDataTagTitles.push(words.join(" "));
                  }
                }
              
                // taking first term from the string of all unique tag values
                var uniqueDataTagValues = [];
                for (var i = 0; i < uniqueDataTags.length; i++) {
                  var z = uniqueDataTags[i].indexOf(" ");
                  var firstTerm = z === -1 ? uniqueDataTags[i] : uniqueDataTags[i].substring(0, z);
                  uniqueDataTagValues.push(firstTerm);
                }
              
                var select = document.getElementById("filter");
              
                for (var i = 0; i < uniqueDataTagTitles.length; i++) {
                  var opt = uniqueDataTagTitles[i];
                  var val = uniqueDataTagValues[i];
                  var el = document.createElement("option");
                  el.setAttribute("class", "menu-item");
                  el.textContent = opt;
                  el.value = val;
                  select.appendChild(el);
                }
              }              

            // Circles

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

        $(document).ready(function() {
            $(".jump").click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1200);
            });
        });