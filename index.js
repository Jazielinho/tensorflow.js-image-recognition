
google.charts.load('current', {packages: ['corechart', 'bar']});
//google.charts.setOnLoadCallback(drawStacked);

let net = null;
//let img_ = null;
//let data_ = null;

function drawStacked(result) {
    var data_ = Array((result.length + 1));

    data_[0] = ['clase','Probabilidad', { role: "style" }];
    data_[1] = [result[0].className, result[0].probability, '#982107'];

    for (iter = 1; iter < result.length; iter++){
        data_[(iter + 1)] = [result[iter].className, result[iter].probability, '#6F76C2'];
    }

    var data = google.visualization.arrayToDataTable(data_);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
        width: 600,
        height: 200,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };


    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(view, options);
  }


 function showFiles() {
    // An empty img element
    let demoImage = document.getElementById('idImage');
    // read the file from the user
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {
        // Assign to src --->>>  <img src="path-to-file">
        demoImage.src = reader.result;
    }
    
// console.log(file);
// console.log(demoImage);
// console.log(demoImage.src);
    reader.readAsDataURL(file);
    //console.log('ejecutando la prediccion');
    app();
    //console.log('prediccion terminada');
}  


async function app(){
    console.log('loading mobilenet...');
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');
    await predice();
}


async function predice(){
    //console.log(net);
    img_ = document.getElementById('idImage');
    //console.log(img_);
    if (img_.src != ""){
        or_width = img_.width;
        or_height = img_.height;
        img_.width = 224;
        img_.height = 224;

        const result = await net.classify(img_);
        
        //text_ = '';

        //for(iter = 0; iter < result.length; iter++){
        //    text_ += '\nprediction:' + result[iter].className + '\n probability:' + result[iter].probability + '\n';
        //}

        //document.getElementById('console').innerText = text_;

        // console.log(text_);
        img_.width = or_width;
        img_.height = or_height;

        drawStacked(result);
        console.log(result);

    }
}

app();