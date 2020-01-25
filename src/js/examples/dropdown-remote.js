import DropDown from '../component/form/drop-down/drop-down';

DropDown.create({
  id: 'myDropDown',
  container: '#myToolbar',
  store: {
    recordDefinition: [
      { name: 'albumId' },
      { name: 'id' },
      { name: 'title' },
      { name: 'url' },
      { name: 'thumb', mapping: 'thumbnailUrl' },
    ],
    dataProxy: {
      url: 'https://jsonplaceholder.typicode.com/photos',
    },
    autoload: true,
  },
  valueField: 'id',
  descriptionField: 'url',
  listeners: {
    change: (event) => {
      console.log('change', event.component.getSelected());
    },
  },
});
