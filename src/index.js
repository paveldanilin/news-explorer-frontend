import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import Dialog from './components/dialog/dialog';
import { search } from './components/search/search';
import { searchResult } from './components/search-result/search-result';

function signinHandler() {
  return 1;
}

const apiLoadNews = (searchText) => searchText;

search.registerCallback((searchText) => {
  searchResult.beginLoading();

  apiLoadNews(searchText);

  setTimeout(() => {
    const data = [
      {
        imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjrHyXxWOTj8I-IpnDMSfliiMKI80o4i3-wkD7TSUjEygVuQggw&s',
        createdAt: new Date(),
        title: 'Национальное достояние – парки',
        contentText: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        sourceLink: 'http://source.com/1',
        sourceLabel: 'Лента.ру',
        cardId: 10001,
      },
      {
        imageLink: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        createdAt: new Date(),
        title: 'Лесные огоньки: история одной фотографии',
        contentText: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        sourceLink: 'http://source.com/1',
        sourceLabel: 'Медуза',
        cardId: 10002,
      },
      {
        imageLink: 'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
        createdAt: new Date(),
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        contentText: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        sourceLink: 'http://source.com/1',
        sourceLabel: 'РИА',
        cardId: 10003,
      },
      {
        imageLink: 'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
        createdAt: new Date(),
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        contentText: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        sourceLink: 'http://source.com/1',
        sourceLabel: 'РИА',
        cardId: 10003,
      },
    ];

    searchResult.update(data);
  }, 5000);
});

function onClickShowMoreNews() {
  searchResult.append({
    imageLink: 'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
    createdAt: new Date(),
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    contentText: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
    sourceLink: 'http://source.com/1',
    sourceLabel: 'РИА',
    cardId: Math.floor(Date.now() / 1000),
  });
}

export { Dialog, signinHandler, onClickShowMoreNews };
