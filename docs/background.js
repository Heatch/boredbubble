
            //creating circles in the background 

            circles = [];

            function circleGen() {

            for (i = 0; i < (myArray.length * 2); i++) {
                
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
                if ((randomP1 >= topEdge) && (randomP1 <= bottomEdge)) {
                    while ((randomP1 >= topEdge) && (randomP1 <= bottomEdge)) {
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
                
                setTimeout(circleGen);

            });
            
