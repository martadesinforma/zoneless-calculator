# Este es un breve listado del contenido del proyecto:
1. Uso de Standalone components

2. Tailwind: Para instalarlo, hemos escrito en la terminal ` npm install -D tailwindcss postcss autoprefixer` y `npx tailwindcss init`. En el archivo tailwind.config.js que se ha creado tenemos que copiar este codigo `"./src/**/*.{html,ts}"`. En el archivo styles.css tenemos que copiar este codigo `@tailwind base; @tailwind components; @tailwind utilities`. Ahora en la terminal cancelamos el ng serve-o que habíamos lanzado al principio cuando comienzas el proyecto y lo vuelves a lanzar.

3. Zoneless: En el archivo app.config.ts he borrado este codigo `provideZoneChangeDetection({ eventCoalescing: true }),` y he escrito este otro  `provideExperimentalZonelessChangeDetection(),`.Cuando pasas a Zoneless Change Detection, como indica esta configuración experimental, estás eliminando la dependencia de Zone.js para gestionar la detección de cambios. Esto significa que Angular ya no intercepta eventos automáticamente y no disparará la detección de cambios a menos que tú lo manejes explícitamente. Este enfoque tiene varias ventajas, como un mejor rendimiento y mayor control, pero requiere que el desarrollador gestione manualmente cuándo y cómo Angular debe actualizar el DOM. En el archivo angular.json borramos `"zone.js"` de todos los lugares donde aparezca.

4. Content Projection:  En el archivo calculator.component.html vamos a tener insertado el componente calculator-button. En el archivo calculator-button.component.html vamos a tener escrito ` <ng-content></ng-content>`. El texto entre las etiquetas <calculator-button></calculator-button> es proyectado dentro del botón en calculator-button.component.html gracias a <ng-content>.

5. Host bindings: Se utiliza el decorador @HostBinding  para vincular dinámicamente una clase CSS al host element del componente en función de una condición. En este caso, se va a utiliza en el componente CalculatorButtonComponent (en su ts) para que se aplique la clase w-2/4 en el selector <calculator-button></calculator-button> si isDoubleSize es true.

6. input Signals: input() permite que el componente hijo (CalculatorButtonComponent) reciba un valor desde el componente padre (calculator.component.html). En este caso, el componente hijo CalculatorButtonComponent va a recibir del componente padre CalculatorComponent  las propiedades isCommand y isDoubleSize.


7. output Signals: output() permite que el componente adre (calculator.component.html) reciba un valor desde el componente hijo (calculator-button.component.ts). En este caso, el componente padre CalculatorComponent va a recibir del componente hijo CalculatorButtonComponent la funcion  handleClick() que muestra el texto que está dentro de cada boton de la calculadora.

8. Signals ViewChild: viewChild() se usa para obtener una referencia a un elemento HTML  dentro de la plantilla del componente. En este caso se va a usar en el calculator-button.component.ts para acceder al elemento con el id #button del calculator-button.component.html

9. Signal ViewChildren: viewChildren() se usa para obtener muchas referencias a un elemento HTML  dentro de la plantilla del componente. En este caso se va a usar en el calculator.component.ts para acceder a todos los CalculatorButtonComponent, ya que en nuestro calculator.component.html tengo un CalculatorButtonComponent para cada tecla de la calculadora.


10. Servicios con señales. Se usa en el método constructNumber() del servicio calculator.service.ts

11. Computed Signals: Se van a utilizar en el calculator.component.ts. Se usa `computed` para crear propiedades reactivas basadas en las señales definidas en el servicio CalculatorService. Esto significa que las propiedades reactivas (`resultText`, `subResultText`, y `lastOperator`) se actualizarán automáticamente cada vez que cambien las señales en el servicio.




# Estructura de esta aplicación:
1. Carpeta calculator:
1. 1. Carpeta components:
- calculator component
- calculator-button component

1. 2. Carpeta services:
- calculator service : lo vamos a injectar en el componente calculator y lo vamos a usar en la función  handleClick(key) del componente calculator

1. 3. Carpeta views:
- calculator-view component

