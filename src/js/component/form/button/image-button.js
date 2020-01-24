import Button from './button';

export default class ImageButton extends Button {
  constructor(props) {
    super(props);
    this.setImage(props.image);
    this.setHoverImage(props.hoverImage || null);

    if (this.getHoverImage() !== null) {
      this.on('mouseover', () => this.toggleImage());
      this.on('mouseout', () => this.toggleImage());
    }
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    if (image === null || image === undefined || typeof image !== 'string' || image.trim().length === 0) {
      throw new Error('Path to image must be non empty string');
    }
    this.image = image;
  }

  getHoverImage() {
    return this.hoverImage;
  }

  setHoverImage(hoverImage) {
    this.hoverImage = hoverImage;
  }

  render() {
    return `<input type="image" src="${this.getImage()}">`;
  }

  toggleImage() {
    if (!this.HtmlElement) {
      return;
    }
    if (this.HtmlElement.getAttribute('src') === this.getImage()) {
      this.HtmlElement.setAttribute('src', this.getHoverImage());
    } else {
      this.HtmlElement.setAttribute('src', this.getImage());
    }
  }
}
