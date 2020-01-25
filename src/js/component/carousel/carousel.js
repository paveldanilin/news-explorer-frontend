import '../../../components/gh-commits/gh-commits.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Glide from '@glidejs/glide';
import StorableComponent from '../storable-component';


export default class Carousel extends StorableComponent {
  constructor(props) {
    super(props);

    this.title = props.title || '';
    this.renderer = props.renderer || null;
    this.carousel = new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: props.perView || 3,
    });

    if (this.renderer && typeof this.renderer !== 'function') {
      throw new Error('Renderer must be a function');
    }

    this.ready = false;
  }

  get Engine() {
    return this.carousel;
  }

  setPerView(perView) {
    this.carousel.update({ perView });
  }

  refresh() {
    if (!this.HtmlElement) {
      return this;
    }
    this.HtmlElement.querySelector('.glide__slides').innerHTML = this.renderItems();
    if (this.ready === false) {
      this.ready = true;
      this.carousel.mount();
    }
    return this;
  }

  render() {
    return `<div>
                <h2 name="carousel-title">${this.title}</h2>
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
    if (this.renderer) {
      return `<li class="glide__slide">${this.renderer(record)}</li>`;
    }
    return `<li class="glide__slide">${record.get('label')}</li>`;
  }

  renderItems() {
    return this.Store.Records.map((record) => this.renderItem(record)).join('');
  }
}
