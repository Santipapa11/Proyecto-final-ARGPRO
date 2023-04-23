var currentTab = 0; 
showTab(currentTab); 

function showTab(n) {
 
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
 
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("print").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Enviar";
  } else {
    document.getElementById("print").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
 
  fixStepIndicator(n)
}

function nextPrev(n) {
 
  var x = document.getElementsByClassName("tab");
  
  if (n == 1 && !validateForm()) return false;
  
  x[currentTab].style.display = "none";
  
  currentTab = currentTab + n;
 if (currentTab == 4){
    $("#idname").html($("#inputname").val())
    $("#idlname").html($("#inputlname").val())
    $("#idemail").html($("#inputemail").val())
    $("#idtelefono").html($("#inputelefono").val())
    $("#idddmmyyyy").html($("#inputddmmyyyy").val())
    $("#idus").html($("#inputus").val())
    $("#idpass").html($("#inputpass").val())
  }

  if (currentTab >= x.length) {
   
    document.getElementById("regForm").submit();
    return false;
  }

  showTab(currentTab);
}

function validateForm() {
 
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  for (i = 0; i < y.length; i++) {
   
    if (y[i].value == "") {
      
      y[i].className += " invalid";
      
      valid = false;
    }
  }
  
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; 
}

function fixStepIndicator(n) {
  
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  
  x[n].className += " active";
}

$( "#submitButton" ).on( "click", function () { 
  guardado() 
});
   
$( "#clearButton" ).on( "click", function () { 
    $("#name").val("")
    $("#email").val("")
    $("#Message").val("")
});


function imprimirElemento(imprimr){

  var ventana = window.open('', 'PRINT', 'height=400,width=600');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('</head><body >');
  ventana.document.write(imprimr.innerHTML);
  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
  return true;
}

$( document ).ready(function() {
  getAPI();
});

const getAPI = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '622beaf4a1msh1e94b767e8b1222p10e557jsnacbb8ab7a40e',
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
    }
  };
  
  fetch('https://fitness-calculator.p.rapidapi.com/foodids/tablenames', options)
    .then(response => response.json())
    .then(response =>  { 
      var tblName = response.table_names[Math.floor(Math.random() * response.table_names.length)];
      fetch(`https://fitness-calculator.p.rapidapi.com/foodids/subtablenames?tablename=${tblName}`, options)
        .then(response2 => response2.json())
        .then(response2 => {
          var subtblName = response2.data[Math.floor(Math.random() * response2.data.length)];
          fetch(`https://fitness-calculator.p.rapidapi.com/foodids?subtablename=${subtblName.id}`, options)
            .then(response3 => response3.json())
            .then(response3 => {
              var foodtblname = response3.data[Math.floor(Math.random() * response3.data.length)];
              fetch(`https://fitness-calculator.p.rapidapi.com/food?foodid=${foodtblname.id}`, options)
                .then(response4 => response4.json())
                .then(response4 => {
                  var food = response4.data;
                  $("#vianda").html(food.description);

                  $("#proteina").html(food.foodNutrients.Protein.value + food.foodNutrients.Protein.unitname)

                  $("#grasas").html(food.foodNutrients.Fat["Total lipid (fat)"].value + food.foodNutrients.Fat["Total lipid (fat)"].unitname)

                  $("#carbohidratos").html(food.foodNutrients.Carbonhydrate.value + food.foodNutrients.Carbonhydrate.unitname )

                  $("#energia").html(food.foodNutrients.Energy.value + food.foodNutrients.Energy.unitname )
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
    
} 

function guardado(){
  var myModal = new bootstrap.Modal(document.getElementById('alerta'))
  myModal.show()
}

