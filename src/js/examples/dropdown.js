import DropDown from '../component/form/drop-down/drop-down';

DropDown.create({
  id: 'testDropDown',
  container: '#myToolbar',
  store: {
    recordDefinition: [{ name: 'id' }, { name: 'text' }],
  },
  valueField: 'id',
  descriptionField: 'text',
  listeners: {
    mount: (event) => {
      event.component.Store.setRecords([
        { id: 1, text: 'test' },
        { id: 2, text: 'boom' },
      ]);
      event.component.refresh();
    },
  },
});
