import { SingleList } from '@dinosanjo/data-structures';
import { removeDuplicates } from './2.1-remove-dups';

describe('removeDuplicates', () => {

  test('removes duplicates from list', () => {
    const list = new SingleList();
    list.pushBack(15);
    list.pushBack(25);
    list.pushBack(15);
    list.pushBack(35);
    list.pushBack(55);
    list.pushBack(5);
    list.pushBack(15);
    list.pushBack(65);
    list.pushBack(85);
    list.pushBack(25);
    list.pushBack(5);
    debugger;
    removeDuplicates(list);
    expect(Array.from(list).map(item => item.value)).toStrictEqual([15, 25, 35, 55, 5, 65, 85]);
  });

});
