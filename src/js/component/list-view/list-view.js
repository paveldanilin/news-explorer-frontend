import StorableComponent from '../storable-component';

export default class ListView extends StorableComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line quotes
    return `<ul></ul>`;
  }
}
