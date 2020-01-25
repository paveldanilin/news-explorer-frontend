import '../../../images/placeholder.png';
import Component from '../component';
import Picture from '../picture/picture';

export default class NewsCard extends Component {
  constructor(props) {
    super(props);

    const {
      imageLink, createdAt, title, contentText, sourceLabel, sourceLink,
    } = props;

    this.imageLink = imageLink;
    this.createdAt = createdAt;
    this.title = title;
    this.contentText = contentText;
    this.sourceLabel = sourceLabel;
    this.sourceLink = sourceLink;

    this.on('click', () => {
      window.open(this.sourceLink, '_blank');
    });
  }

  render() {
    Picture.create({
      src: this.imageLink,
      placeholder: '/images/placeholder.png',
      classList: ['search-result__card-image'],
      alt: this.title,
    }).mount(this, 'first');

    return `<div class="card card_grow card_dir_ver">
                <!-- Picture -->
                <div class="card__body search-result__card-body">
                    <div class="search-result__card-created">
                        ${NewsCard.formatDate(this.createdAt)}
                    </div>
                    <h4 class="search-result__card-title">${this.title}</h4>
                    <p class="search-result__card-text">${this.contentText}</p>
                </div>
                <div class="card__footer search-result__card-footer">
                    <a href="${this.sourceLink}" target="_blank" class="search-result__card-source">
                        ${this.sourceLabel}
                    </a>
                </div>
            </div>`;
  }

  static recordDefinition() {
    return [
      { name: 'imageLink', mapping: 'urlToImage' },
      { name: 'createdAt', mapping: 'publishedAt' },
      { name: 'title' },
      { name: 'contentText', mapping: 'description' },
      { name: 'sourceLabel', mapping: 'source.name' },
      { name: 'sourceLink', mapping: 'url' },
    ];
  }

  static decodeMonth(month, language) {
    // TODO: move
    const monthDic = {
      ru: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'июля',
        'июня',
        'августа',
        'сентября',
        'октебря',
        'ноября',
        'декабря',
      ],
    };
    const dic = monthDic[language] || monthDic.ru;
    return dic[month];
  }

  static formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()} ${NewsCard.decodeMonth(date.getMonth())}, ${date.getFullYear()}`;
  }
}
