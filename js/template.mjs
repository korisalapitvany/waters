export default function LoadTemplate(name) {
  const script = document.createElement("script");
  script.src = `../templates/${name}.js`;
  script.async = true;
  document.body.appendChild(script);

  return new Promise((resolve) => {
    const check = () => {
      if (Handlebars.hasOwnProperty("templates") &&
          Handlebars.templates.hasOwnProperty(`${name}.html`)) {
        resolve(Handlebars.templates[`${name}.html`]);
      } else {
        setTimeout(check, 1);
      }
    };
    check();
  });
}
