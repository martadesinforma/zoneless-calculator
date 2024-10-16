import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';



describe('CalculatorViewComponent', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.


  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;


  beforeEach(async () => { //nos permite ejecutar algún tipo de código antes de cada prueba. Va a inicializar nuestro "TestBed".
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  // La prueba verifica que el componente <calculator> está presente en el DOM de la aplicación.
  it('should contain calculator component', ()=> {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });



  //La prueba asegura que el elemento <div> contiene todas las clases CSS esperadas
  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');
    const classesShouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    classesShouldHave.forEach(className => {
      expect(divClasses).toContain(className);
    });
  })

});
