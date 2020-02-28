var calcExercise = {
  visor: document.getElementById("display"),
  displayValor: "0",
  resultKey: false,
  init: (function () {
this.overButtons(".tecla");
    this.asignKeyEvents();
  }),
overButtons: function(selector){
var x = document.querySelectorAll(selector);
for (var i = 0; i<x.length;i++) {
x[i].onmouseover = this.overSmall;
x[i].onmouseleave = this.backButton;
}
},

overSmall: function(event){
calcExercise.smallButton(event.target);
},
backButton: function(event){
calcExercise.returnSizeButton(event.target);
},
smallButton: function(calButton){
var button = calButton.id;
if (button=="1" || button=="2" || button=="3" || button=="0" || button=="igual" || button=="punto" ) {
calButton.style.width = "28%";
calButton.style.height = "62px";
calButton.style.border = "1px solid grey";
} else if(button=="mas") {
calButton.style.width = "88%";
calButton.style.height = "98%";
calButton.style.border = "1px solid grey";
} else {
calButton.style.width = "21.5%";
calButton.style.height = "62px";
calButton.style.border = "1px solid grey";
}
},
returnSizeButton: function(calButton){
var button = calButton.id;
if (button=="1" || button=="2" || button=="3" || button=="0" || button=="igual" || button=="punto" ) {
calButton.style.width = "29%";
calButton.style.height = "63px";
calButton.style.border = "none";
} else if(button=="mas") {
calButton.style.width = "90%";
calButton.style.height = "100%";
calButton.style.border = "none";
} else {
calButton.style.width = "22%";
calButton.style.height = "63px";
calButton.style.border = "none";
}
},
  asignKeyEvents: function () {
    document.getElementById("0").addEventListener("click", function () {calcExercise.numPad("0");});
    document.getElementById("1").addEventListener("click", function () {calcExercise.numPad("1");});
    document.getElementById("2").addEventListener("click", function () {calcExercise.numPad("2");});
    document.getElementById("3").addEventListener("click", function () {calcExercise.numPad("3");});
    document.getElementById("4").addEventListener("click", function () {calcExercise.numPad("4");});
    document.getElementById("5").addEventListener("click", function () {calcExercise.numPad("5");});
    document.getElementById("6").addEventListener("click", function () {calcExercise.numPad("6");});
    document.getElementById("7").addEventListener("click", function () {calcExercise.numPad("7");});
    document.getElementById("8").addEventListener("click", function () {calcExercise.numPad("8");});
    document.getElementById("9").addEventListener("click", function () {calcExercise.numPad("9");});
    document.getElementById("on").addEventListener("click", function () {calcExercise.clearDisplay();});
    document.getElementById("sign").addEventListener("click", function () {calcExercise.negativeSign();});
    document.getElementById("punto").addEventListener("click", function () {calcExercise.decimalDot();});
    document.getElementById("igual").addEventListener("click", function () {calcExercise.viewResult();});
    document.getElementById("raiz").addEventListener("click", function () {calcExercise.inputOperators("raiz");});
    document.getElementById("dividido").addEventListener("click", function () {calcExercise.inputOperators("/");});
    document.getElementById("por").addEventListener("click", function () {calcExercise.inputOperators("*");});
    document.getElementById("menos").addEventListener("click", function () {calcExercise.inputOperators("-");});
    document.getElementById("mas").addEventListener("click", function () {calcExercise.inputOperators("+");});
    document.getElementById("on").addEventListener("click", function () {calcExercise.deleteBorder();});},
  deleteBorder: function () {
    var elems = document.querySelectorAll(".borde");
    [].forEach.call(elems, function (el) {
      el.classList.remove("borde");
    });
  },
  clearDisplay: function () {
    this.displayValor = "0";
    this.Operación = "";
    this.resultKey = false;
    this.updateVisor();
  },

  negativeSign: function () {
    if (this.displayValor != "0") {
      var aux;
      if (this.displayValor.charAt(0) == "-") {
        aux = this.displayValor.slice(1);
      } else {
        aux = "-" + this.displayValor;
      }
      this.displayValor = "";
      this.displayValor = aux;
      this.updateVisor();
    }
  },

  decimalDot: function () {
    if (this.displayValor.indexOf(".") == -1) {
      if (this.displayValor == "") {
        this.displayValor = this.displayValor + "0.";
      } else {
        this.displayValor = this.displayValor + ".";
      }
      this.updateVisor();
    }
  },

  numPad: function (valor) {
    if (this.displayValor.length < 8) {

      if (this.displayValor == "0") {
        this.displayValor = "";
        this.displayValor = this.displayValor + valor;
      } else {
        this.displayValor = this.displayValor + valor;
      }
      this.updateVisor();
    }
  },
  inputOperators: function (oper) {
    this.firstValor = parseFloat(this.displayValor);
    this.displayValor = "";
    this.operacion = oper;
    this.resultKey = false;
    switch (oper) {
      case "+":
        document.getElementById('mas').className += ' borde'
        break;
      case "-":
        document.getElementById('menos').className += ' borde'
        break;
      case "*":
        document.getElementById('por').className += ' borde'
        break;
      case "/":
        document.getElementById('dividido').className += ' borde'
        break;
      case "raiz":
        document.getElementById('raiz').className += ' borde'
    }

  },
  viewResult: function () {
    if (!this.resultKey) {
      this.secondValor = parseFloat(this.displayValor);
      this.ultimoValor = this.secondValor;
      this.doCalc(this.firstValor, this.secondValor, this.operacion);

    } else {
      this.doCalc(this.firstValor, this.ultimoValor, this.operacion);
    }
    this.firstValor = this.resultado;
    this.displayValor = this.resultado;
    if (this.resultado.toString().length < 9) {
      this.displayValor = this.resultado.toString();
    } else {
      this.displayValor = this.resultado.toString().slice(0, 8) + "...";
    }
    this.resultKey = true;
    this.updateVisor();

  },
  doCalc: function (firstValor, secondValor, operacion) {
    switch (operacion) {
      case "+":
        this.resultado = eval(firstValor + secondValor);
        break;
      case "-":
        this.resultado = eval(firstValor - secondValor);
        break;
      case "*":
        this.resultado = eval(firstValor * secondValor);
        break;
      case "/":
        this.resultado = eval(firstValor / secondValor);
        break;
      case "raiz":
        this.resultado = eval(Math.sqrt(firstValor));
    }
  },
  updateVisor: function () {
    this.visor.innerHTML = this.displayValor;
  }
};
calcExercise.init();
