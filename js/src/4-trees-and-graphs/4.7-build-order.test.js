import { getBuildOrder } from './4.7-build-order';

describe('getBuildOrder', () => {

  test('throws if dependency list is only circular', () => {
    expect(() => getBuildOrder(['a', 'b', 'c'], [['a', 'b'], ['b', 'c'], ['c', 'a']]))
        .toThrow('Circular depdency found');
  });

  test('throws if dependency list contains some circular reference', () => {
    const projects = ['x', 'y', 'c', 'r', 'a', 'e', 'f', 'd', 'b'];
    const dependencies = [
      ['b', 'd'],
      ['b', 'x'],
      ['f', 'd'],
      ['f', 'a'],
      ['f', 'c'],
      ['c', 'r'],
      ['c', 'y'],
      ['e', 'a'],
      ['d', 'a'],
      ['a', 'r'],
      ['r', 'x'],
      ['x', 'd'],
    ];
    expect(() => getBuildOrder(projects, dependencies))
        .toThrow('Circular depdency found');
  });

  test('returns a valid build order given dependencies', () => {
    const projects = ['x', 'y', 'c', 'r', 'a', 'e', 'f', 'd', 'b'];
    const expected = ['b', 'f', 'c', 'e', 'd', 'a', 'r', 'x', 'y'];
    const buildOrder = getBuildOrder(
          projects,
          [
            ['b', 'd'],
            ['b', 'x'],
            ['f', 'd'],
            ['f', 'a'],
            ['f', 'c'],
            ['c', 'r'],
            ['c', 'y'],
            ['e', 'a'],
            ['d', 'a'],
            ['a', 'r'],
            ['r', 'x'],
          ]);
    expect(buildOrder).toStrictEqual(expected);
  });

});
