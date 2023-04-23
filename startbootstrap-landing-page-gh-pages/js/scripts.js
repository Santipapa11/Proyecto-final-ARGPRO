var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
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
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
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
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }

  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
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

