const elementsDataBase = ["equipos", "unidades", "componentes", "partes"];

export { elementsDataBase as elementTypes };

export default class ElementDefinition {
  constructor(elementName) {
    this.elementName = elementName;
  }

  getName() {
    return this.elementName;
  }

  exists() {
    return elementsDataBase.includes(this.elementName);
  }

  capitalized() {
    return this.elementName.charAt(0).toUpperCase() + this.elementName.slice(1);
  }

  singular() {
    return this.elementName.slice(0, -1);
  }

  singularCapitalized() {
    return (
      this.elementName.charAt(0).toUpperCase() +
      this.elementName.slice(1).slice(0, -1)
    );
  }
}
