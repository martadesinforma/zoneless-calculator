import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

//Este componente que hemos creado solo se utiliza en la ultima prueba de testing. Este código crea un componente anfitrión (TestHostComponent) para probar si el contenido "proyectado" se muestra correctamente dentro de otro componente (CalculatorButtonComponent).
@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],//Importa el componente CalculatorButtonComponent para usarlo dentro de la plantilla del TestHostComponent. Esto es necesario para probar cómo se comporta CalculatorButtonComponent cuando recibe contenido proyectado.
  template: `
  <calculator-button>
    <span class="projected-content underline">Test Content</span>
  </calculator-button>
  `,
})
class TestHostComponent{}


describe('CalculatorButton', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;


  beforeEach(async () => { //nos permite ejecutar algún tipo de código antes de cada prueba. Va a inicializar nuestro "TestBed".
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    console.log(compiled)
    expect(component).toBeTruthy();
  });


  //Esta prueba Verifica que cuando la propiedad isDoubleSize es false, el componente tiene la clase w-1/4,
  it('should apply w-1/4 doubleSize is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' '); //Se obtiene una lista de todas las clases CSS aplicadas al componente

    expect(hostCssClasses).toContain('w-1/4'); //Se comprueba que la clase w-1/4 está presente,
    expect(component.isDoubleSize()).toBeFalse(); //Se asegura que la propiedad isDoubleSize del componente es false.
  });


  //Esta prueba Verifica que cuando la propiedad isDoubleSize es true, el componente tiene la clase w-2/4
  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true); //Aquí se cambia el valor de la propiedad isDoubleSize a true, ya que por defecto esta propiedad tiene valor false.
    fixture.detectChanges(); //Esto fuerza a Angular a detectar cambios en el componente, para que la nueva configuración de isDoubleSize se refleje en la vista.

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });


  //Esta prueba verifica que el evento onClick sea emitido correctamente cuando se llama al método handleClick del componente
  it('should emit onClick when handleClick is called', () => {
    spyOn(component.onClick, 'emit'); //Queremos asegurarnos de que cuando se llame al método handleClick, el método emit de onClick sea invocado. Al espiar el método emit, podemos monitorear si fue llamado sin ejecutar su implementación real.

    component.handleClick(); // Esta es la acción que estamos probando. Queremos verificar que al llamar a handleClick, se emita correctamente el evento onClick.

    expect(component.onClick.emit).toHaveBeenCalled(); //Nos aseguramos de que, como resultado de haber llamado a handleClick, el evento onClick haya sido emitido correctamente. Si emit no fue llamado, la prueba fallará.
  });



  //Esta prueba está verificando el comportamiento del método keyboardPressedStyle cuando se le pasa una tecla que coincide con el valor del contenido de un elemento (en este caso '1'). Específicamente, la prueba se asegura de que la propiedad isPressed del componente se establezca en true temporalmente y luego vuelva a false después de un breve período de tiempo.
  it('should set isPressed to true and then false when keyboardPressStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1'; //Aquí se accede al valor de un elemento HTML y se le establece su texto interno como '1'.
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => { //done() se utiliza para indicar que la prueba asincrónica ha terminado. Dado que la prueba contiene una operación asíncrona (el setTimeout), se necesita esta función para que el framework de pruebas (Jasmine) sepa que debe esperar a que la operación asíncrona termine antes de finalizar la prueba.
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });


  //Esta prueba verifica que la propiedad isPressed no se establezca en true si la tecla presionada no coincide con el valor contenido en el componente.
  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1'; //Aquí se accede al valor de un elemento HTML y se le establece su texto interno como '1'.
    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();
  });


  //Esta prueba verifica que el contenido proyectado en <calculator-button> desde TestHostComponent se muestra correctamente. El objetivo es probar cómo funciona CalculatorButtonComponent dentro de este componente anfitrión.
  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);

    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');

    expect(projectedContent).not.toBeNull();
  })

});
