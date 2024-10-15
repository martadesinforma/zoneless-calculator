import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.


  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;


  beforeEach(async () => { //nos permite ejecutar algún tipo de código antes de cada prueba. Va a inicializar nuestro "TestBed".
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });


  //Este código está verificando si el componente AppComponent tiene un elemento <router-outlet> en su plantilla (template).
  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });


  //Esta prueba está verificando que el componente renderiza un elemento <div> que tiene un conjunto específico de clases CSS aplicadas
  it('should render div with css classes', ()=> {
    const divElement = compiled.querySelector('div');
    const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' '); //Aquí se define un array con las clases CSS que se espera que el <div> tenga. split(' '): Convierte la cadena de texto con las clases separadas por espacios en un array.
    const divClasses = divElement?.classList.value.split(' '); //si el <div> existe, se accede a su lista de clases a través de classList.value. .split(' '): Convierte esa cadena en un array, donde cada elemento es una clase CSS aplicada al <div>.

    expect(divElement).not.toBeNull(); //evaluación

    cssClasses.forEach(className => {
      expect(divClasses).toContain(className); //verifica que divClasses contiene cada una de las clases esperadas de cssClasses.
    })
  })


  //Esta prueba está diseñada para verificar que el componente HTML contiene un enlace (<a>) con los atributos title y href correctos
  it("should contain the 'buy me a beer' link", ()=> {
    const anchoElement = compiled.querySelector('a');
    const title = 'Buy me a beer';
    const href = "https://www.buymeacoffee.com/scottwindon";

    expect(anchoElement).not.toBeNull(); //Verifica que el elemento <a> existe

    expect(anchoElement?.getAttribute('title')).toBe(title); //Verifica que el atributo 'title' es el esperado
    expect(anchoElement?.getAttribute('href')).toBe(href); // Verifica que el atributo 'href' es el esperado
  })
});
