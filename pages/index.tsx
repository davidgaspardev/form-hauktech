import Head from 'next/head'
import { useEffect } from 'react';
import { init, sendForm } from 'emailjs-com';

/**
 * Home Page
 * 
 * @returns {JSX.Element}
 */
export default function HomePage(): JSX.Element {

  // Component did mount
  useEffect(formSetup, []);

  // Return home page component
  return (
    <div id="home-page" >
      <Head>
        <title>Hauktech</title>
      </Head>

      <form id="ticket-form" className="container" >

        { /** Company field */ }
        <label htmlFor="input-company" >Nome da empresa</label>
        <input
          id="input-company"
          name="company" 
          type="text" 
          placeholder="Hauktech" />

        { /** Contributor field */ }
        <label htmlFor="input-contributor" >Colaborador</label>
        <input 
          id="input-contributor"
          name="contributor" 
          type="text" 
          placeholder="Rafael Sousa" />

        { /** Email field */ }
        <label htmlFor="input-email" >Email para contato</label>
        <input 
          id="input-email"
          name="email" 
          type="text" 
          placeholder="contato@hauktech.com" />

        { /** Phone field */ }
        <label htmlFor="input-phone" >Telefone para contato</label>
        <input 
          id="input-phone"
          name="phone" 
          type="text" 
          maxLength={15}
          placeholder="(DDD) 9XXXX-XXXXXX" />

        { /** Issue field */ }
        <label htmlFor="input-issue" >Problema</label>
        <textarea 
          id="input-issue"
          name="issue" 
          rows={5} 
          placeholder="Erro no windows, message de erro: Falha no ..." />

        { /** Priority field */ }
        <label htmlFor="select-priority" >Prioridade</label>
        <select
          id="select-priority" 
          name="priority" >
          <option value="low" >baixa</option>
          <option value="regular" >média</option>
          <option value="high" >alta</option>
        </select>

        { /** Submit button */ }  
        <input type="submit" value="enviar chamado" />

      </form>
    </div>
  );
}

/**
 * Get form element
 * 
 * @returns {HTMLFormElement}
 */
function _getFormElement(): HTMLFormElement {
  const form = document.getElementById("ticket-form");

  if(!form) throw Error("Doesn't exists form element");

  return form as HTMLFormElement;
}

/**
 * Formating input data to the phone number
 * 
 * @param {string} id 
 */
function _addPhoneFormatToInput(id: string): void {
  const input = document.getElementById(id) as HTMLInputElement;

  input.addEventListener("input", function(ev: Event) {
    let value = this.value.replace(/\D/g, "");

    if(value.length > 7) {
      this.value = `(${value.substr(0, 2)}) ${value.substr(2, 5)}-${value.substr(7)}`;
    } else if(value.length > 2) {
      this.value = `(${value.substr(0, 2)}) ${value.substr(2)}`;
    } else {
      this.value = value;
    }
  });
}

/**
 * Configuring form
 */
function formSetup(): void {

  const form = _getFormElement();

  // Animation to show the form
  form.style.opacity = "1";
  form.style.marginTop = "0";

  // Set input forma number to phone
  _addPhoneFormatToInput("input-phone");

  // Adding event listener on form submission
  form.addEventListener("submit", function(this: HTMLFormElement, ev: Event) {
    if(!ev.defaultPrevented) ev.preventDefault();

    const formData = new FormData(this);

    console.log(formData);
    console.log("company:", formData.get("company"));
    console.log("contributor:", formData.get("contributor"));
    console.log("email:", formData.get("email"));
    console.log("phone:", formData.get("phone"));
    console.log("issue:", formData.get("issue"));
    console.log("priority:", formData.get("priority"));

    // Using EmailJS to send the form
    // Initilizing EmailJS package
    init(process.env.EMAIL_JS_USER || '');
    // Sending form
    sendForm(
      process.env.EMAIL_JS_SERVICE || '', 
      process.env.EMAIL_JS_TEMPLATE || '', 
      this
    );
  });
}
