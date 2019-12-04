import HttpClient from "../http-client/http-client";

export default class TemplateLoader {
  static load(dataAttribute, onTemplateInjected) {
    const httpClient = HttpClient.create({
      responseFormat: HttpClient.RESPONSE_TEXT
    });

    setTimeout(() => {
      const containers = document.querySelectorAll(`[${dataAttribute}]`);
      containers.forEach((containerEl) => {
        httpClient.fetch(containerEl.getAttribute(dataAttribute)).then((templateHTML) => {
          containerEl.innerHTML = templateHTML;
          if (typeof onTemplateInjected === 'function') {
            onTemplateInjected(containerEl);
          }
        });
      });
    }, 0);
  }
}
