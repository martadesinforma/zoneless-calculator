
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren,  } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator.component.css',
  host: { //para escuchar un evento de teclado (en este caso, el evento keyup) que ocurre en todo el documento.
    '(document: keyup)' : 'handleKeyboardEvent($event)'
  },

})
export class CalculatorComponent {

  private calculatorServive = inject(CalculatorService);
  // Se usa `computed` para crear propiedades reactivas basadas en las señales definidas en el servicio CalculatorService. Esto significa que las propiedades reactivas (`resultText`, `subResultText`, y `lastOperator`) se actualizarán automáticamente cada vez que cambien las señales en el servicio.
  public resultText = computed(() => this.calculatorServive.resultText());
  public subResultText = computed(() => this.calculatorServive.subResultText());
  public lastOperator = computed(() => this.calculatorServive.lastOperator());



  public calculatorButtons = viewChildren(CalculatorButtonComponent) //quiero que busque todos los CalculatorButtonComponent, ya que en nuestro calculator.component.html tengo un CalculatorButtonComponent para cada tecla de la calculadora.

  handleClick(key:string) { //Este es un método que recibe un parámetro key, que será el valor de la tecla presionada en el teclado.
    this.calculatorServive.constructNumber(key);
  }


  handleKeyboardEvent(event: KeyboardEvent){ //le estamos diciendo a Angular que pase el objeto del evento KeyboardEvent al método handleKeyboardEvent. Este objeto incluye información sobre la tecla presionada.  El parámetro event es un objeto de tipo KeyboardEvent, que es un objeto estándar del DOM que contiene información sobre el evento de teclado.

    const keyEquivalents: Record<string, string> = { //Es un Record<string, string>, lo que significa que es un objeto cuya clave y valor son ambos de tipo string. En este caso, las claves son nombres de teclas de un teclado físico, y los valores son las teclas equivalentes en la calculadora.
      Escape: 'C', //si resiono Scape en el teclado fisico, quiero que mande a mi calculadora (a mi componente) la C, para que el Scape del teclado fisico equivalga al boton C de la calculadora.
      Clear: 'C',
      'x': '*',
      '/': '÷',
      "Enter": '=',
    }

    const key = event.key; // se está capturando la tecla presionada por el usuario. event.key contiene el valor de la tecla física que se presionó.
    console.log(key)

    this.handleClick(keyEquivalents[key] ?? key); //El operador de coalescencia nula (??) devuelve el valor de la derecha si el valor de la izquierda es null o undefined. En este caso, si keyEquivalents[key] no tiene un valor mapeado (no hay una equivalencia para la tecla presionada), se devuelve la tecla original (key).

    this.calculatorButtons().forEach((button)=> { //se muestre el boton mas oscuro en la calculadora cuando se pulsa con el teclado fisico cualquier boton que aparece en la calculadora
      button.keyboardPressedStyle(keyEquivalents[key] ?? key); //La funcion keyboardPressedStyle() esta definida en el componente calculator-button. El operador de coalescencia nula (??) devuelve el valor de la derecha si el valor de la izquierda es null o undefined. En este caso, si keyEquivalents[key] no tiene un valor mapeado (no hay una equivalencia para la tecla presionada), se devuelve la tecla original (key).
    })
  }
}
