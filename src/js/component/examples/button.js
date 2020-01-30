import Button from '../form/button/button';
import Component from '../component';
import IconButton from '../form/button/icon-button';
import ImageButton from '../form/button/image-button';

Button.create({
  container: '#myToolbar',
  text: 'Secret toggle',
  listeners: {
    click: () => {
      if (Component.get('myMenu').findById('articlesMenuItem').isHidden()) {
        Component.get('myMenu').findById('articlesMenuItem').show();
      } else {
        Component.get('myMenu').findById('articlesMenuItem').hide();
      }

      if (Component.get('loginMenuItem').isHidden()) {
        Component.get('loginMenuItem').show();
      } else {
        Component.get('loginMenuItem').hide();
      }

      if (Component.get('logoutMenuItem').isHidden()) {
        Component.get('logoutMenuItem').show();
      } else {
        Component.get('logoutMenuItem').hide();
      }
    },
  },
});

IconButton.create({
  container: '#myToolbar',
  text: 'Ba!',
  classList: ['btn', 'btn_brd_none', 'btn_transparent', 'btn_size_xxs'],
  iconClassList: ['icon', 'icon_size_24', 'icon_menu_black'],
});

IconButton.create({
  container: '#myToolbar',
  text: 'Bo!',
  textAlign: 'left',
  classList: ['btn', 'btn_brd_none', 'btn_transparent', 'btn_size_xxs'],
  iconClassList: ['icon', 'icon_size_24', 'icon_menu_black'],
});

ImageButton.create({
  id: 'imageButton',
  container: '#myToolbar',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPP_8oD-jbBJVuXuv4eUVOvy7gMqP67uTWrF3wPRKk1fZyFFftUw&s',
  hoverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUa-kL6Q5Vfw7cOlg6tsA_tP2ZY8MX5Y37cbjjI7vXuSgzraGXw&s',
});
