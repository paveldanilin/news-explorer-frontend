import './gh-commits.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Glide from '@glidejs/glide';
import GithubApiClient from '../../github-api-client/github-api-client';
import Config from '../../config';

export default class GhCommits {
  constructor() {
    this.githubApiClient = new GithubApiClient();
    this.carousel = null;
  }

  loadCommits() {
    const slidesHtmlElement = document.querySelector('.gh-commits .glide__slides');

    if (!slidesHtmlElement) {
      return;
    }

    slidesHtmlElement.innerHTML = '';

    this
      .githubApiClient
      .getRepositoryCommits(Config.GH_COMMITS_OWNER, Config.GH_COMMITS_REPO)
      .then((response) => {
        response.forEach((card) => {
          this.renderCard(card, slidesHtmlElement);
        });

        this.carousel = new Glide('.glide', {
          type: 'carousel',
          startAt: 0,
          perView: Config.GH_COMMITS_PREVIEW_COUNT,
        }).on('resize', () => {
          if (window.innerWidth < 768) {
            this.setCarouselPreview(1);
          } else {
            this.setCarouselPreview(Config.GH_COMMITS_PREVIEW_COUNT);
          }
        }).mount();

      });
  }

  renderCard(card, renderTo) {
    const container = document.createElement('li');
    container.classList.add('glide__slide');

    const cardEl = document.createElement('div');
    cardEl.classList.add('ycard');

    // Header

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('flex-container');

    let authorImg = document.createElement('img');
    // TODO PLCAEHOLDER
    if (card.author) {
      authorImg = document.createElement('img');
      authorImg.src = card.author.avatar_url;
    } else {
      authorImg = document.createElement('div');
      authorImg.classList.add('icon');
      authorImg.classList.add('icon_user');
      authorImg.classList.add('icon_size_24');
    }
    authorImg.alt = 'Иконка пользователя GitHub';
    authorImg.classList.add('ycard__icon');

    const header = document.createElement('span');
    header.classList.add('flex-container');
    header.classList.add('flex-container_direction_col');

    const title = document.createElement('span');
    title.classList.add('ycard__title');
    title.textContent = card.commit.author.name || 'unknown';

    const subtitle = document.createElement('span');
    subtitle.classList.add('ycard__subtitle');
    subtitle.textContent = card.commit.author.email || 'unknown@gmail.com';

    header.appendChild(title);
    header.appendChild(subtitle);

    headerContainer.appendChild(authorImg);
    headerContainer.appendChild(header);

    cardEl.appendChild(headerContainer);

    // Body

    const body = document.createElement('div');
    body.classList.add('ycard__body');

    body.textContent = card.commit.message || '';

    cardEl.appendChild(body);

    container.appendChild(cardEl);

    renderTo.appendChild(container);
  }

  setCarouselPreview(count) {
    this.carousel.update({ perView: count });
  }
}
