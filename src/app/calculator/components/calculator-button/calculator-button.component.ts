
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

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

  //Se utiliza el decorador @HostBinding  para vincular dinámicamente una clase CSS al host element del componente en función de una condición.
  //El getter (commandStyle) determina si la clase debe ser aplicada o no en función de la propiedad isDoubleSize().
  //Si isDoubleSize es true, el getter devuelve true, y Angular aplicará la clase  w-2/4 al host element. Si isDoubleSize es false, el getter devolverá false, y Angular no aplicará la clase.
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
}

