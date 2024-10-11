
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [

  ],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: { //se aplican la clases al selector <calculator-button></calculator-button>
    class: "w-1/4 border-r border-b border-indigo-400",
    '[class.w-2/4]': 'isDoubleSize()',
  }
})
export class CalculatorButtonComponent {

  // input() permite que el componente hijo (CalculatorButtonComponent) reciba un valor desde el componente padre (calculator.component.html).
  //El primer argumento (false) es el valor por defecto para isCommand. Esto significa que, si el componente no recibe ningún valor para isCommand desde su padre, se usará false como valor por defecto.
  //La clave transform se utiliza para transformar o convertir el valor de entrada antes de asignarlo a la propiedad.
  //Si el valor que se recibe es de tipo string, se verifica si la cadena está vacía (value === ''). En este caso: Si la cadena es vacía (''), entonces el valor de isCommand será true. Si el valor es una cadena no vacía (por ejemplo, 'true', 'false'), Angular la trata como false para cualquier valor distinto a una cadena vacía. Si el valor no es un string (por lo tanto, es un boolean), entonces se devuelve directamente el valor booleano sin ningún cambio.
  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });




  //Para poder emitirle un evento al padre utilizamos output(). Este evento siempre se va a estar emitiendo pero puede no estar escuchandolo el padre (el padre puede estar suscrito o no). Si el padre se sucribe al evento del 'calculator-button', siempre lo hace en su html
  public onClick = output<string>();

  //viewChild() se usa para obtener una referencia a un elemento HTML  dentro de la plantilla del componente.
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button'); // En el argumento  hago referencia a un elemento del html que en este caso va a ser el button pero en vez de escribir button como selector, voy a hacerle referencia mediante el id #button. Quiere acceder al elemento con el id #button

  public isPressed = signal(false);

  handleClick(){ //Queremos que la funcion handleClick() que habiamos llamado cuando hacemos click en el boton del  calculator-button.component.html, desencadene un evento que emita el texto que está dentro del boton para que pueda ser escuchado por el componente calculator.component  que es el padre, si este esta suscrito al evento.

    if(!this.contentValue()?.nativeElement) {
      return
    }

    const value = this.contentValue()!.nativeElement.innerText; //Cuando usas ElementRef en Angular, este te da acceso a la propiedad nativeElement. innerText devuelve el texto que está dentro de un elemento HTML, en este caso, te devuelve la  proyección de contenido que viene del componente padre ya que en el boton estamos usando <ng-content></ng-content>.

    this.onClick.emit(value.trim()); //El método trim()  se utiliza para eliminar los espacios en blanco  del inicio y el final de una cadena de texto.
  }

  public keyboardPressedStyle(key: string) { //queremos llamar esta funcion dentro de handleKeyboardEvent() del componente padre calculator.component.html
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key) return;

    this.isPressed.set(true) //si value === key (si la tecla que tu pulsas en tu tecldo fisico es un boton de la calculadora), entonces cambio el valor de la señal isPressed para que en el calculator-button.component.html se establezca esta condicion:  [class.is-pressed]="isPressed()" y se muestre el boton mas oscuro en la calculadora cuando se pulsa con el teclado fisico cualquier boton que aparece en la calculadora

    setTimeout(()=> { //para que el boton que pulsamos de la calculadora solo se pinte más oscuro durante 100 ms
      this.isPressed.set(false)
    }, 100);

  }


}

