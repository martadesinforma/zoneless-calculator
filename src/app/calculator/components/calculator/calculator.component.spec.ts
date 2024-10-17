import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../../services/calculator.service';

 //queremos poderle inyectar a nuestra prueba un servicio ficticio del "CalculatorService" ya que no quiero que mis prubas dependan de otras pruebas. Se inyecta en los providers de la funcion beforeEach()
 class MockCalculatorService{
  public resulText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResulText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');
  public constructNumber = jasmine.createSpy('constructNumber');
}


describe('CalculatorComponent', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => { //nos permite ejecutar algún tipo de código antes de cada prueba. Va a inicializar nuestro "TestBed".
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });


  //En vez de mi servicio real CalculatorService estoy usando el MockCalculatorService
  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  })




  it('should display proper calculation values', () => {
    mockCalculatorService.resulText.and.returnValue('123');
    mockCalculatorService.subResulText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });


  it('should have 19 calculator-button with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
  });




});
