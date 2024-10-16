import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {//describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let service: CalculatorService; //Aún no se le asigna un valor, pero esto se hará en el bloque beforeEach().

  beforeEach(()=> { //nos permite ejecutar algún tipo de código antes de cada prueba.
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });


  // Este código está verificando que el servicio CalculatorService ha sido creado correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); //verifica que se haya creado una instancia válida del servicio.
  });


  //Este código es una prueba unitaria que verifica que el servicio CalculatorService se crea con los valores predeterminados correctos
  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });



  //La prueba está verificando que, cuando se presiona la tecla "C" en la calculadora, las propiedades resultText, subResultText, y lastOperator se reinicien a sus valores predeterminados.
  it('should set resultText, subResultText to "0" when C is pressed', () => {
    //Esto simula que la calculadora tiene unos valores previos almacenados:
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  })


  //La prueba está verificando que el método constructNumber() del servicio CalculatorService actualiza correctamente el valor de resultText cuando el usuario introduce números en la calculadora
  it('should update resultText with number input', () =>{
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  //La prueba está verificando que el servicio CalculatorService maneje correctamente la entrada de operadores en la calculadora.
  it('should handle operators correctly', ()=> {
    service.constructNumber('1');
    service.constructNumber('-');

    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });


  // Verifica que la suma de dos números se calcula correctamente.
  it('should calculate result correctly for addition', ()=> {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });


  // Verifica que la resta de dos números se calcula correctamente.
  it('should calculate result correctly for subtraction', ()=> {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });


  //Verifica que la multiplicacion de dos números se calcula correctamente.
  it('should calculate result correctly for multiplication', ()=> {
    service.constructNumber('3');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('6');
  });


  // Verifica que la division de dos números se calcula correctamente.
  it('should calculate result correctly for division', ()=> {
    service.constructNumber('1'); //en el teclado, primero escribes el 1 y despues el 0 para escribir el numero 10
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });


  //Verifica que los números decimales se manejan correctamente y no se permiten múltiples puntos decimales.
  it('should handle decimal point correctly', ()=> {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });


  //Verifica que los números decimales que comienzan con 0 se manejan correctamente.
  it('should handle decimal point correctly starting with zero', ()=> {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');
  });


  //Verifica que el cambio de signo (+/-) funciona correctamente, alternando entre valores positivos y negativos.
  it('should handle sign change correctly', ()=> {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });


  //Verifica que la funcionalidad de retroceso (Backspace) elimina correctamente los dígitos uno por uno.
  it('should handle backspace correctly', () => {
    service.resultText.set('123');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });


  //Verifica que el texto del resultado no supera la longitud máxima permitida de 10 dígitos.
  it('should handle max length correctly', ()=> {
    for(let i = 0; i < 10; i++) {
      service.constructNumber('1');
    };
    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });

})


