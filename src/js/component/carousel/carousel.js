import '../../../components/gh-commits/gh-commits.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Glide from '@glidejs/glide';
import StorableComponent from '../storable-component';

export default class Carousel extends StorableComponent {
  constructor(props) {
    super(props);

    this._title = props.title || '';
    this._renderer = props.renderer || null;
    this._carousel = new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: props.perView || 3,
    }).on('resize', () => {
      this.fireEvent('resize');
    });

    if (this._renderer && typeof this._renderer !== 'function') {
      throw new Error('Renderer must be a function');
    }

    this._ready = false;
  }

  setPerView(perView) {
    this._carousel.update({ perView });
  }

  refresh() {
    if (!this.HtmlElement) {
      return this;
    }
    this.$('.glide__slides', true)
      .forEach((glideNode) => {
        glideNode.html(this.renderItems());
      });
    if (this._ready === false) {
      this._ready = true;
      this._carousel.mount();
    }
    return this;
  }

  render() {
    return `<div>
                <h2 name="carousel-title">${this._title}</h2>
                <div name="carousel-container" class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            ${this.renderItems()}
                        </ul>
                    </div>
                    <div name="carousel-nav" class="glide__bullets" data-glide-el="controls[nav]">
                        <button class="glide__bullet" data-glide-dir="=0"></button>
                        <button class="glide__bullet" data-glide-dir="=1"></button>
                        <button class="glide__bullet" data-glide-dir="=2"></button>
                    </div>
                </div>
            </div>`;
  }

  renderItem(record) {
    if (this._renderer) {
      return `<li class="glide__slide">${this._renderer(record)}</li>`;
    }
    return `<li class="glide__slide">${record.get('label')}</li>`;
  }

  renderItems() {
    return this.Store.Records.map((record) => this.renderItem(record)).join('');
  }
}
