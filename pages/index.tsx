import Head from 'next/head';
import Image from 'next/image';
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
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>

      <div id="content" >

          <div id="logo-img" >
            <Image 
              src="/images/png/logo.png"
              alt="Logo"
              width={300}
              height={112} />
          </div>

          <h3>Abra seu chamado aqui para <strong>Hauktech</strong>.</h3>
          <p>Por favor preencha todas as informações solicitadas corretamente para a abertura do chamado, descrevendo com detalhes o motivo do seu contato.</p>
      </div>

      <form id="ticket-form" className="container" >

        { /** Company field */ }
        <label htmlFor="input-company" >Nome da empresa</label>
        <input
          id="input-company"
          className="form-field"
          name="company" 
          type="text" 
          placeholder="Ex: Hauktech"
          required={true} />

        { /** Contributor field */ }
        <label htmlFor="input-contributor" >Colaborador</label>
        <input 
          id="input-contributor"
          className="form-field"
          name="contributor" 
          type="text" 
          placeholder="Ex: Rafael Sousa"
          required={true}  />

        { /** Email field */ }
        <label htmlFor="input-email" >Email para contato</label>
        <input 
          id="input-email"
          className="form-field"
          name="email" 
          type="email" 
          placeholder="Ex: rafael.sousa@hauktech.com"
          required={true}  />

        { /** Phone field */ }
        <label htmlFor="input-phone" >Telefone para contato</label>
        <input 
          id="input-phone"
          className="form-field"
          name="phone" 
          type="text" 
          maxLength={15}
          placeholder="(DDD) 9XXXX-XXXXXX"
          required={true}  />

        { /** Issue field */ }
        <label htmlFor="input-issue" >Problema</label>
        <textarea 
          id="input-issue"
          className="form-field"
          name="issue" 
          rows={5} 
          placeholder='Ex: Erro no Windows, aparece a seguinte mensagem "Falha no ...'
          required={true}  />

        { /** Priority field */ }
        <label htmlFor="select-priority" >Prioridade</label>
        <select
          id="select-priority"
          className="form-field"
          name="priority"
          required={true}  >
          <option value="baixa" >Baixa</option>
          <option value="normal" >Normal</option>
          <option value="alta" >Alta</option>
        </select>

        <div className="footer-form" >
          <input 
            id="input-files"
            type="file" 
            name="files" 
            accept="image/png, image/jpeg, video/mp4"
            size={20971520} // 20 MB 
            style={{ display: "none" }}
            multiple={true}
            />

          <label 
            // onClick={() => document.getElementById("input-files")?.click()}
            htmlFor="input-files" >Adicionar arquivos<br/><span>images ou videos</span></label>

          { /** Submit button */ }
          <input
            className="form-field" 
            type="submit" 
            value="enviar chamado" />
        </div>

      </form>

      <div id="warning" >
        <div>
          <header>
            <h1></h1>
          </header>
          <div>
            <p></p>
          </div>
        </div>
      </div>

      <footer>

        { /** Team Viewer button (link) */}
        <div 
          className="floating-button" 
          style={{ backgroundColor: "var(--color-teamviewer)", right: 170 }}
          onClick={() => window.open('https://www.teamviewer.com/pt-br/')} >
            <Image 
              src={"/images/png/teamviewer.png"}
              alt="TeamViewer"
              width={24}
              height={24}/>

          <h6><strong>Team</strong>Viewer</h6>
        </div>

        { /** AnyDesk button (link) */ }
        <div 
          className="floating-button" 
          style={{ backgroundColor: "var(--color-anydesk)" }}
          onClick={() => window.open('https://anydesk.com/pt')} >
          <Image 
            src={"/images/png/anydesk.png"}
            alt="AnyDesk"
            width={24}
            height={24} />

          <h6><strong>AnyDesk</strong></h6>
        </div>

      </footer>

    </div>
  );
}

/**
 * Get img element
 * 
 * @returns {HTMLImageElement}
 */
function _getContentElement(): HTMLImageElement {
  const content = document.getElementById("content");

  if(!content) throw Error("Doesn't exists img element");

  return content as HTMLImageElement;
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
 * Get wanring element
 * 
 * @returns {HTMLFormElement}
 */
 function _getWarningElement(): HTMLDivElement {
  const warning = document.getElementById("warning");

  if(!warning) throw Error("Doesn't exists form element");

  return warning as HTMLDivElement;
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
 * Show message
 * 
 * @param {string} message 
 */
function showWarning(message: string, callback: Function, failed?: boolean): void {
  // Getting wanring element
  const warning = _getWarningElement();

  // Config content
  const title = warning.getElementsByTagName("h1")[0];
  const header = warning.getElementsByTagName("header")[0];
  const paragraph = warning.getElementsByTagName("p")[0];
  title.innerText = failed ?  "Algo deu errado" : "Tudo certo";
  paragraph.innerText = message;
  header.style.background = failed ? "#ff6562" : "#00c07f";

  // Show warning
  warning.style.display = "flex";
  setTimeout(() => {
    warning.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    // Hide wanring
    warning.style.opacity = "0";
    setTimeout(() => {
      // Block warning
      warning.style.display = "none";
      if(callback) callback();
    }, 750);
  }, 5000);
}

/**
 * To block fields
 */
function disableFormFields(): void {
  const fields = document.getElementsByClassName("form-field");

  for(let i = 0; i < fields.length; i++) (fields[i] as HTMLInputElement).disabled = true;
}

/**
 * To unlock fields
 */
function enableFormFields(): void {
  const fields = document.getElementsByClassName("form-field");

  for(let i = 0; i < fields.length; i++) (fields[i] as HTMLInputElement).disabled = false;
}

function showFloatingButton() {
  const buttons = document.getElementsByClassName("floating-button");

  for(let i = 0; i < buttons.length; i++) {
    (buttons.item(i) as HTMLElement).style.bottom = "0";
  }
}

/**
 * Configuring form
 */
function formSetup(): void {

  const form = _getFormElement();
  const logo = _getContentElement();

  // Animation to show the form
  form.style.opacity = "1";
  form.style.marginTop = "0";
  // Animation to show the logo
  logo.style.opacity = "1";
  logo.style.marginBottom = "0";

  setTimeout(showFloatingButton, 800);

  // Set input forma number to phone
  _addPhoneFormatToInput("input-phone");

  // Adding event listener on form submission
  form.addEventListener("submit", function(this: HTMLFormElement, ev: Event) {
    // MDN Web Docs provides high quality content and one of them is the form validation 
    // done by the client side.
    // See the documentation here: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

    if(!ev.defaultPrevented) ev.preventDefault();

    // const formData = new FormData(this);

    // Using EmailJS to send the form
    // Initilizing EmailJS package
    init(process.env.EMAIL_JS_USER || '');
    // Sending form
    sendForm(
      process.env.EMAIL_JS_SERVICE || '', 
      process.env.EMAIL_JS_TEMPLATE || '', 
      this
    ).then(() => {
      showWarning("Agora é só aguardar nosso retorno", () => {

      });
    }).catch((error: Error) => {
      showWarning(error.message, enableFormFields, true);
    });

    setTimeout(disableFormFields, 100);
  });
}
