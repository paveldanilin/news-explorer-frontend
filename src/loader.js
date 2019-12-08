import HttpClient from "./http-client/http-client";

const httpClient = HttpClient.create({
  responseFormat: HttpClient.RESPONSE_TEXT
});

const loadHTML = (url, container, onLoad, onInject)  => {
  let loadedTemplate = '';
  let containers = !container ? [] : [container];

  if (typeof container === 'string') {
    containers = document.querySelectorAll(selector);
  }

  httpClient.fetch(url).then((templateHTML) => {
    if (typeof onLoad === 'function') {
      loadedTemplate = onLoad(templateHTML);
    } else {
      loadedTemplate = templateHTML;
    }

    containers.forEach((containerEl) => {
      containerEl.innerHTML = loadedTemplate;
      if (typeof onInject === 'function') {
        onInject(containerEl, loadedTemplate);
      }
    });
  });

};

const loadJS = (url, onLoad) => {
  const ref = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.src = url;
  ref.parentNode.insertBefore( script, ref );
};

export { loadHTML, loadJS };
