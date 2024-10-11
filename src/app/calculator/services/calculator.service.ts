import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '=', '.', 'C', 'Backspace']; //Backspace es el boton de borrar en el teclado fisico y la C es el boton esc del teclado fisico

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  //numero final que he construido que aparece en la pantalla de la calculadora
  public resultText = signal('10');
  //resultado anterior que aparece en la pantalla de la calculadora
  public subResultText = signal('20');
  //operador que aparece en la pantalla de la calculadora
  public lastOperator = signal('+');


  public constructNumber(value: string): void { //value es el valor del teclado fisico que estoy pulsando

    //validar los input (lo que el usuario teclea)
    if (![...numbers, ...operators, ...specialOperators].includes(value)) { //Usando ...numbers, ...operators y ...specialOperators dentro de un nuevo array, estás creando un único array que contiene todos los elementos de los tres arrays. Si hubieras pasado los tres arrays individualmente sin el spread operator (por ejemplo, [numbers, operators, specialOperators]), estarías creando un array de arrays (anidado), lo que no es lo que se necesita aquí. Ejemplo sin el spread operator: [['0','1',...], ['+', '-',...], ['+/-', '%', ...]]
      console.log('invalid input', value);
      return;
    }

    //validar =
    if (value === '=') {
      //TODO
      return;
    }

    //validar C
    if (value === 'C') { //todo se resetea al valor inicial, se limpian los resultados
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //Validar Backspace
    //TODO: revisar cuando tengamos numeros negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return; //si el resultado es 0, aunque teclé el boton de borrar, no se puede eliminar nada
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((valor) => valor.slice(0, -1)); //si el resultado tiene mas de un digito, entonces cuando se cliquea el boton de borrar, solo quiero que borre el ultimo digito del numero
      return;
    }

    //Aplicar operadores
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //limitar numero de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    //validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) { //si el valor clicado es un punto y el numero no incluye ningun punto en su valor
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update(valor => valor + '.'); //si el numero no empieza por 0, aplicamos el .
      return;
    }


    //condiciones especiales para el 0 cuando es el valor inicial
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) { //si el resultado es 0 o -0 y estoy clicando el valor 0 en le teclado, no quiero que haga nada
      return;
    }


    //cmabiar el signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {//si el resultado si incluye el caracter '-' y estoy tecleando la tecla '+/-' en el teclado, se lo quiero eliminar
        this.resultText.update(valor => valor.slice(1)); //Esto elimina el primer carácter del string original
        return;
      }

      this.resultText.update(valor => '-' + valor); //si el resultado no incluye el caracter '-' y estoy tecleando la tecla '+/-' en el teclado, se lo quiero incluir
      return;
    }

    //numeros
    if (numbers.includes(value)) {

      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }


      this.resultText.update(valor => valor + value);
      return;
    }


  }

}
