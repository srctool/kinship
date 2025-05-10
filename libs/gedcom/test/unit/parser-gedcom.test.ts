import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from '@jest/globals';
import {
  convertToGedcomTreeFromGedcomX,
  formatGedcomDate,
  formatGedcomTime,
  nodeToGedcom,
  parseGedcomNodes,
  parseGedcomTextToNodes,
} from '../../src/parser/parse-gedcom';
import { GEDCOMNode } from '../../src/types/gedcom/gedcom';

describe('parseGedcomTextToNodes', () => {
  it('should correctly parse a sample .ged text into nested GEDCOMNode structure', () => {
    const gedcomText = fs.readFileSync(
      path.join(__dirname, '../fixtures/with-children.ged'),
      'utf8'
    );
    const result = parseGedcomTextToNodes(gedcomText);

    const parsed = parseGedcomNodes(result);

    const convertToX = convertToGedcomTreeFromGedcomX(parsed);

    // console.log(convertToX)
  });
});

describe('parseGedcomTextToNodes', () => {
  it('should correctly parse a sample .ged text into nested GEDCOMNode structure', () => {
    const gedcomText = `
0 @I1@ INDI
1 NAME John /Doe/
1 SEX M
1 BIRT
2 DATE 1 JAN 1990
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 MARR
2 DATE 1 JAN 2010
        `.trim();

    const result = parseGedcomTextToNodes(gedcomText);

    // Expected Output
    const expectedOutput: GEDCOMNode[] = [
      {
        level: 0,
        tag: 'INDI',
        value: '@I1@',
        children: [
          {
            level: 1,
            tag: 'NAME',
            value: 'John /Doe/',
            children: [],
          },
          {
            level: 1,
            tag: 'SEX',
            value: 'M',
            children: [],
          },
          {
            level: 1,
            tag: 'BIRT',
            value: undefined,
            children: [
              {
                level: 2,
                tag: 'DATE',
                value: '1 JAN 1990',
                children: [],
              },
            ],
          },
          {
            level: 1,
            tag: 'FAMS',
            value: '@F1@',
            children: [],
          },
        ],
      },
      {
        level: 0,
        tag: 'FAM',
        value: '@F1@',
        children: [
          {
            level: 1,
            tag: 'HUSB',
            value: '@I1@',
            children: [],
          },
          {
            level: 1,
            tag: 'WIFE',
            value: '@I2@',
            children: [],
          },
          {
            level: 1,
            tag: 'MARR',
            value: undefined,
            children: [
              {
                level: 2,
                tag: 'DATE',
                value: '1 JAN 2010',
                children: [],
              },
            ],
          },
        ],
      },
    ];

    expect(result).toEqual(expectedOutput);
  });

  it('should handle lines with no value after tag', () => {
    const gedcomText = `
0 HEAD
1 SOUR MyGenealogyApp
1 DEST GedcomParserTest
        `.trim();

    const result = parseGedcomTextToNodes(gedcomText);

    const expectedOutput: GEDCOMNode[] = [
      {
        level: 0,
        tag: 'HEAD',
        value: undefined,
        children: [
          {
            level: 1,
            tag: 'SOUR',
            value: 'MyGenealogyApp',
            children: [],
          },
          {
            level: 1,
            tag: 'DEST',
            value: 'GedcomParserTest',
            children: [],
          },
        ],
      },
    ];

    expect(result).toEqual(expectedOutput);
  });

  it('should warn on invalid line format', () => {
    const invalidLine = 'This is not a valid GEDCOM line';
    // const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    // parseGedcomTextToNodes(invalidLine);

    // expect(consoleWarnSpy).toHaveBeenCalledWith('Unrecognized GEDCOM line format:', invalidLine);

    // consoleWarnSpy.mockRestore();
  });
});

describe('convertGedcomXToGedcom', () => {
  it('should correctly convert GEDCOM X data to GEDCOM format', () => {
    const gedcomXData = {
      persons: [
        {
          id: '@I1@',
          names: [{ nameForms: [{ fullText: 'John Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '1 JAN 1990' },
              place: { original: 'New York' },
            },
          ],
        },
        {
          id: '@I2@',
          names: [{ nameForms: [{ fullText: 'Jane Doe' }] }],
          gender: { type: 'http://gedcomx.org/Female' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '1 JAN 1992' },
              place: { original: 'Los Angeles' },
            },
          ],
        },
      ],
      relationships: [
        {
          type: 'http://gedcomx.org/Couple',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I2@' },
          facts: [
            {
              type: 'http://gedcomx.org/Marriage',
              date: { original: '1 JAN 2010' },
              place: { original: 'New York' },
            },
          ],
        },
      ],
    };

    const fakeNow = new Date('2025-01-01T12:34:56Z');

    const gedcomOutput = convertToGedcomTreeFromGedcomX(gedcomXData, fakeNow);

    const expectedGedcomOutput = `
0 HEAD
1 SOUR Kinship
2 VERS 1.0
1 DATE ${formatGedcomDate(fakeNow)}
2 TIME ${formatGedcomTime(fakeNow)}
0 @I1@ INDI
1 NAME John Doe
1 SEX M
1 BIRT
2 DATE 1 JAN 1990
2 PLAC New York
0 @I2@ INDI
1 NAME Jane Doe
1 SEX F
1 BIRT
2 DATE 1 JAN 1992
2 PLAC Los Angeles
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 MARR
2 DATE 1 JAN 2010
2 PLAC New York
0 TRLR
        `.trim(); // Hapus spasi tambahan pada output

    // console.log(expectedGedcomOutput)

    expect(nodeToGedcom(gedcomOutput)).toBe(expectedGedcomOutput);
  });

  it('should handle cases with missing facts or relationships gracefully', () => {
    const gedcomXData = {
      persons: [
        {
          id: '@I1@',
          names: [{ nameForms: [{ fullText: 'John Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
        },
      ],
      relationships: [],
    };

    const fakeNow = new Date('2025-01-01T12:34:56Z');

    const gedcomOutput = convertToGedcomTreeFromGedcomX(gedcomXData, fakeNow);

    const expectedGedcomOutput = `
0 HEAD
1 SOUR Kinship
2 VERS 1.0
1 DATE ${formatGedcomDate(fakeNow)}
2 TIME ${formatGedcomTime(fakeNow)}
0 @I1@ INDI
1 NAME John Doe
1 SEX M
0 TRLR
        `.trim();

    expect(nodeToGedcom(gedcomOutput)).toBe(expectedGedcomOutput);
  });

  it('should handle empty GEDCOM X input', () => {
    const gedcomXData = { persons: [], relationships: [] };

    const fakeNow = new Date('2025-01-01T12:34:56Z');

    const gedcomOutput = convertToGedcomTreeFromGedcomX(gedcomXData, fakeNow);

    const expectedGedcomOutput = '';

    expect(nodeToGedcom(gedcomOutput)).toBe(expectedGedcomOutput);
  });

  it('should correctly convert multiple individuals and relationships', () => {
    const gedcomXData = {
      persons: [
        {
          id: '@I1@',
          names: [{ nameForms: [{ fullText: 'John Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '1 JAN 1990' },
              place: { original: 'New York' },
            },
          ],
        },
        {
          id: '@I2@',
          names: [{ nameForms: [{ fullText: 'Jane Doe' }] }],
          gender: { type: 'http://gedcomx.org/Female' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '1 JAN 1992' },
              place: { original: 'Los Angeles' },
            },
          ],
        },
      ],
      relationships: [
        {
          type: 'http://gedcomx.org/Couple',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I2@' },
          facts: [
            {
              type: 'http://gedcomx.org/Marriage',
              date: { original: '1 JAN 2010' },
              place: { original: 'New York' },
            },
          ],
        },
        {
          type: 'http://gedcomx.org/ParentChild',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I3@' },
        },
      ],
    };

    const fakeNow = new Date('2025-01-01T12:34:56Z');

    const gedcomOutput = convertToGedcomTreeFromGedcomX(gedcomXData, fakeNow);

    const expectedGedcomOutput = `
0 HEAD
1 SOUR Kinship
2 VERS 1.0
1 DATE ${formatGedcomDate(fakeNow)}
2 TIME ${formatGedcomTime(fakeNow)}
0 @I1@ INDI
1 NAME John Doe
1 SEX M
1 BIRT
2 DATE 1 JAN 1990
2 PLAC New York
0 @I2@ INDI
1 NAME Jane Doe
1 SEX F
1 BIRT
2 DATE 1 JAN 1992
2 PLAC Los Angeles
0 @I3@ INDI
1 NAME Unknown
1 SEX U
1 BIRT
2 DATE Unknown
2 PLAC Unknown
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 MARR
2 DATE 1 JAN 2010
2 PLAC New York
0 @F2@ FAM
1 HUSB @I1@
1 CHIL @I3@
0 TRLR
        `.trim();

    const ged = nodeToGedcom(gedcomOutput);

    expect(ged).toBe(expectedGedcomOutput);
  });
});

describe('Gedcom Conversion Tests', () => {
  it('should convert GEDCOM X data to GEDCOM format with new family events (marriage, children, divorce)', () => {
    const gedcomXData = {
      persons: [
        {
          id: '@I1@',
          names: [{ nameForms: [{ fullText: 'John Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '15 MAR 1985' },
              place: { original: 'California' },
            },
          ],
        },
        {
          id: '@I2@',
          names: [{ nameForms: [{ fullText: 'Jane Doe' }] }],
          gender: { type: 'http://gedcomx.org/Female' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '10 OCT 1990' },
              place: { original: 'Los Angeles' },
            },
          ],
        },
        {
          id: '@I3@',
          names: [{ nameForms: [{ fullText: 'Sam Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '5 MAY 2015' },
              place: { original: 'California' },
            },
          ],
        },
        {
          id: '@I4@',
          names: [{ nameForms: [{ fullText: 'Sara Doe' }] }],
          gender: { type: 'http://gedcomx.org/Female' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '12 DEC 2018' },
              place: { original: 'Los Angeles' },
            },
          ],
        },
        {
          id: '@I5@',
          names: [{ nameForms: [{ fullText: 'Mike Doe' }] }],
          gender: { type: 'http://gedcomx.org/Male' },
          facts: [
            {
              type: 'http://gedcomx.org/Birth',
              date: { original: '1 JAN 2020' },
              place: { original: 'New York' },
            },
          ],
        },
      ],
      relationships: [
        {
          type: 'http://gedcomx.org/Couple',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I2@' },
          facts: [
            {
              type: 'http://gedcomx.org/Marriage',
              date: { original: '1 JAN 2015' },
              place: { original: 'California' },
            },
          ],
        },
        {
          type: 'http://gedcomx.org/ParentChild',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I3@' },
        },
        {
          type: 'http://gedcomx.org/ParentChild',
          person1: { resource: '#@I2@' },
          person2: { resource: '#@I3@' },
        },
        {
          type: 'http://gedcomx.org/Couple',
          person1: { resource: '#@I3@' },
          person2: { resource: '#@I4@' },
          facts: [
            {
              type: 'http://gedcomx.org/Marriage',
              date: { original: '15 JUL 2035' },
              place: { original: 'Los Angeles' },
            },
          ],
        },
        {
          type: 'http://gedcomx.org/ParentChild',
          person1: { resource: '#@I3@' },
          person2: { resource: '#@I5@' },
        },
        {
          type: 'http://gedcomx.org/Divorce',
          person1: { resource: '#@I1@' },
          person2: { resource: '#@I2@' },
          facts: [
            {
              type: 'http://gedcomx.org/Divorce',
              date: { original: '1 JAN 2025' },
              place: { original: 'California' },
            },
          ],
        },
      ],
    };

    const expectedGedcomOutput = `
  0 HEAD
  1 @I1@ INDI
  2 NAME John Doe
  2 SEX M
  2 BIRT
  3 DATE 15 MAR 1985
  3 PLAC California
  1 @I2@ INDI
  2 NAME Jane Doe
  2 SEX F
  2 BIRT
  3 DATE 10 OCT 1990
  3 PLAC Los Angeles
  1 @F1@ FAM
  2 HUSB @I1@
  2 WIFE @I2@
  2 MARR
  3 DATE 1 JAN 2015
  3 PLAC California
  1 @I3@ INDI
  2 NAME Sam Doe
  2 SEX M
  2 BIRT
  3 DATE 5 MAY 2015
  3 PLAC California
  1 @F2@ FAM
  2 HUSB @I3@
  2 WIFE @I4@
  2 MARR
  3 DATE 15 JUL 2035
  3 PLAC Los Angeles
  1 @I4@ INDI
  2 NAME Sara Doe
  2 SEX F
  2 BIRT
  3 DATE 12 DEC 2018
  3 PLAC Los Angeles
  1 @F3@ FAM
  2 HUSB @I3@
  2 CHIL @I5@
  1 @I5@ INDI
  2 NAME Mike Doe
  2 SEX M
  2 BIRT
  3 DATE 1 JAN 2020
  3 PLAC New York
  0 DIV
  1 HUSB @I1@
  1 WIFE @I2@
  1 DIV
  3 DATE 1 JAN 2025
  3 PLAC California
  0 TRLR
  `;

    // Konversi GEDCOM X ke GEDCOM menggunakan fungsi yang sudah ada
    const gedcomTree = convertToGedcomTreeFromGedcomX(gedcomXData);
    const gedcomString = nodeToGedcom(gedcomTree);

    console.log(gedcomString);

    // Bandingkan hasil konversi dengan output yang diharapkan
    // expect(gedcomString.trim()).toBe(expectedGedcomOutput.trim());
  });
});
