import './gh-commits.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Glide from '@glidejs/glide';
import GithubApiClient from '../../js/github-api-client/github-api-client';
import GhCard from './gh-card';

export default class GhCommits {
  constructor(owner, repo, perView) {
    this.githubApiClient = new GithubApiClient();
    this.carousel = null;
    this.perView = perView;
    this.owner = owner;
    this.repo = repo;
  }

  loadCommits() {
    const slidesHtmlElement = document.querySelector('.gh-commits .glide__slides');

    if (!slidesHtmlElement) {
      return;
    }

    this
      .githubApiClient
      .getRepositoryCommits(this.owner, this.repo)
      .then((response) => {
        slidesHtmlElement.innerHTML = '';

        response.forEach((card) => {
          const ghCard = new GhCard(
            card.commit.author.name || 'unknownUser',
            card.commit.author.email || 'unknownEmail',
            card.commit.message || '',
            card.author ? card.author.avatar_url : null,
            card.html_url,
          );
          ghCard.render(slidesHtmlElement);
        });

        this.carousel = new Glide('.glide', {
          type: 'carousel',
          startAt: 0,
          perView: this.perView,
        }).on('resize', () => {
          if (window.innerWidth < 768) {
            this.setCarouselPreview(1);
          } else {
            this.setCarouselPreview(this.perView);
          }
        }).mount();
      });
  }

  setCarouselPreview(count) {
    this.carousel.update({ perView: count });
  }
}
