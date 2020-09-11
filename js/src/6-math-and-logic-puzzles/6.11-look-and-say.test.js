import { generateLookAndSay } from './6.11-look-and-say';

describe('generateLookAndSay', () => {

  test('returns empty sequence for 0 count', () => {
    expect(generateLookAndSay(0)).toStrictEqual([]);
  });

  test('generates the correct sequence', () => {
    const sequence = [
      '1',
      '11',
      '21',
      '1211',
      '111221',
      '312211',
      '13112221',
      '1113213211',
      '31131211131221',
      '13211311123113112211',
      '11131221133112132113212221',
    ];
    expect(generateLookAndSay(11)).toStrictEqual(sequence);
  });

});
