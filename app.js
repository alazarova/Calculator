$( document ).ready(function() {
  var textInput = $('#textView');

  //returns the value of the button that is clicke
  $('.calc-button').click(function() {
    var data = textInput.val();

    textInput.val(data + this.dataset.value);
  });

  textInput.keydown(function(e) {
    if ($.inArray(e.keyCode, [8, 13, 110, 190, 111, 109, 106, 107]) !== -1 ) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  textInput.keydown(function(event) {

    event.keyCode === 13 ? calc() : true
  });

  $(window).on('click', function(event) {

    textInput.focus();

  });

  //Clear button
  $('#clear').click(function() {
    textInput.val("");
  });

  //Del button
  $('#del').click(function(event) {
    var data = textInput.val();
    var dataLastRemove = data.slice(0, -1);
    textInput.val(dataLastRemove);

  });

  $('#equals').on('click', calc);


function calc(){

    return textInput.val(new Calcultor().render())

  }

  class Calcultor {

      constructor() {
          this.inputVal = textInput.val();
          this.symbols = ['/', '*', '-', '+'];
          this.floatsArr = this.inputVal.match(/\d+(\.\d+)|\d+/g).map(Number);
          this.operandsArr = this.inputVal.match(/[\+\-\*\/]/g);
          this.inputValRemade = [];
      }

      // concat array of digits with array with operands

      makeInputVal() {
          for (let i = 0; i < this.floatsArr.length; i++) {
              this.inputValRemade.push(this.floatsArr[i])
              if (this.operandsArr[i] != undefined) {
                  this.inputValRemade.push(this.operandsArr[i])
              }
          }
      }

      // take two digits and calculcate them with current operand and replace his place with the new value

      calculation(symbol) {
          for (let i = 0; i < this.inputValRemade.length; i++) {
              if (this.inputValRemade[i] == symbol) {
                  let calc = this.calculateNums(symbol, i);
                  this.inputValRemade.splice(i - 1, 3);
                  this.inputValRemade.splice(i - 1, 0, calc);
                  i -= 2;
              }
          }
          return this.inputValRemade;
      }

      // find a symbol and calculate numbers

      calculateNums(symbol, i) {
          let objSymbols = {
              '+': Number(this.inputValRemade[i - 1]) + Number(this.inputValRemade[i + 1]),
              '-': Number(this.inputValRemade[i - 1]) - Number(this.inputValRemade[i + 1]),
              '/': Number(this.inputValRemade[i - 1]) / Number(this.inputValRemade[i + 1]),
              '*': Number(this.inputValRemade[i - 1]) * Number(this.inputValRemade[i + 1])
          }
          return objSymbols[symbol];
      }

      // render a calculator

      render() {
          this.makeInputVal();
          for (let index = 0; index < this.symbols.length; index++) {
              let symbol = this.symbols[index];
              this.inputValRemade = this.calculation(symbol)
          }
          return this.inputValRemade.join('');
      }

  }

console.log(new Calcultor().render());



  });
