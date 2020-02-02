# news-explorer-frontend
YP диплом. 
[Нажмите тут чтобы открыть проект на GH pages](https://paveldanilin.github.io/news-explorer-frontend/)
[Нажмите тут чтобы открыть проект на news-explorer-front.ml](http://news-explorer-front.ml)


### Внешние API
- интеграция с newsapi
- интеграция с github api

### Установка и запуск
- Клонировать репозиторий ```git clone https://github.com/paveldanilin/news-explorer-frontend.git```
- Установить зависимости ```nmp install```
- Запустить девелоперскую сборку```npm run dev``` 

### Конфигурация клиента "/js/config.js"
- BACKEND_API_HOST - host backend API (news explorer API) [server](https://breakingnews-explorer.ml)
- NEWS_API_TOKEN - токен для доступа к NewsAPI
- GH_COMMITS_REPO - имя репозитория для чтения коммитов
- GH_COMMITS_OWNER - владелец реаозитория для чтения коммитов

### Сборка
- Прод ```nmp run prod```
- Девелоперская ```npm run build```

### Линтер
- Запуск лиентера ```npm run lint```
- Запуск автоисправлений ```npm run fix```
