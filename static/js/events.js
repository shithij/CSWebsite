var pastEventsDiv = document.querySelector("#past");
var upEventsDiv = document.querySelector("#upcoming");
var todayEventsDiv = document.querySelector("#todayEvents");

db.ref("events").orderByChild("timeStamp").on("value", function(snapshot) {
    this.data = [];

    snapshot.forEach(function(child) {
        this.data.push(child.val());
    }.bind(this));

    var now = new Date();
    var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var todayEvents = "";
    var pastEvents = "";
    var upEvents = "";
    Object.keys(this.data).forEach(function(k){
        if (this.data[k]["name"] !== "dummy" && this.data[k]["organiser"] == "Computer Society") {
            if(!(this.data[k]['name']=="Enigma")){
               
                var date = this.data[k]["date"].split("-");
            var eventDate = new Date(date[2], date[1]-1, date[0]);
            var event = `
            <div class="grid">
                <figure class="effect-layla">
                    <img src=`+ this.data[k]["imgUrl"] +` alt="img03">
                    <figcaption>
                    
                        <div class="details">        
                            <h1>`  + this.data[k]["name"]  + `</h1>
                            <span>Venue:</span>` +this.data[k]["venue"]  +  `
                            <br>
                            <span>Date:</span>` + this.data[k]["date"] + `
                            <span>Time:</span>` + this.data[k]["time"] +  `
                        
                        </div>
                    </figcaption>			
                </figure>
                <div class="detailsMobile">        
                    <h1>`  + this.data[k]["name"]  + `</h1>
                    <span>Venue:</span>` +this.data[k]["venue"]  +  `
                    <br>
                    <span>Date:</span>` + this.data[k]["date"] + `
                    <span>Time:</span>` + this.data[k]["time"] +  `
                    <br>
                    <br>
                    <br>
                </div>
            </div>
            `;
            if ((todayDate - eventDate) === 0) {
                todayEvents = event + todayEvents;
            } else if ((todayDate - eventDate) < 0) {
                upEvents += event;
            } else if ((todayDate - eventDate) > 0) {
                pastEvents = event + pastEvents;
            }

            }
            
        }
    });
    todayEventsDiv.innerHTML = todayEvents;
    upEventsDiv.innerHTML = upEvents;
    pastEventsDiv.innerHTML = pastEvents;

    if (todayEvents === "") {
        todayEventsDiv.parentNode.style.display = "none";
    } else {
        todayEventsDiv.parentNode.style.display = "block";
        document.querySelector("#todayLoad").style.display = "none";
    }
    if (upEvents === "") {
        document.querySelector("#upLoad").style.display = "block";
        document.querySelector("#upLoad").innerHTML = "Brainstorming now. We will update soon.";
    } else {
        document.querySelector("#upLoad").style.display = "none";
    }
    if (pastEvents === "") {
        document.querySelector("#pastLoad").style.display = "block";
        document.querySelector("#pastLoad").innerHTML = "Error fetching information.";
    } else {
        document.querySelector("#pastLoad").style.display = "none";
    }
});