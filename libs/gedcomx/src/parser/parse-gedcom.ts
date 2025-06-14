/* eslint-disable no-case-declarations */
import {
  Citation,
  Family,
  GedcomFact,
  GedcomId,
  GedcomName,
  GEDCOMNode,
  Individual,
  Media,
  Note,
  ParsedGedcom,
  Place,
  Repository,
  Source,
} from '../types/gedcom/gedcom';

// Helper untuk ambil nilai dari child node
function getChildValue(node: GEDCOMNode, tagName: string): string | undefined {
  return node.children?.find((child) => child.tag === tagName)?.value;
}

// Ambil semua child nodes dengan tag tertentu
function getChildrenByTag(node: GEDCOMNode, tagName: string): GEDCOMNode[] {
  return node.children?.filter((child) => child.tag === tagName) || [];
}

// Parsing Nama (NAME)
function parseNames(node: GEDCOMNode): GedcomName[] {
  const nameNodes = getChildrenByTag(node, 'NAME');
  return nameNodes.map((n) => {
    const fullName = n.value || '';
    const given = getChildValue(n, 'GIVN');
    const surname = getChildValue(n, 'SURN');
    return {
      full: fullName,
      given,
      surname,
    };
  });
}

// Parsing Fakta Hidup (BIRT, DEAT, MARR, dll)
function parseFacts(node: GEDCOMNode, tags: string[]): GedcomFact[] {
  return tags.flatMap((tag) =>
    getChildrenByTag(node, tag).map((childNode) => ({
      type: childNode.tag,
      date: getChildValue(childNode, 'DATE'),
      place: getChildValue(childNode, 'PLAC'),
      ageAtEvent: getChildValue(childNode, 'AGE'),
    }))
  );
}

function handleIndividual(node: GEDCOMNode): Individual {
  if (!node.value) throw new Error('Individual ID is missing');

  return {
    id: node.value as GedcomId,
    names: parseNames(node),
    gender: getChildValue(node, 'SEX') as 'M' | 'F' | undefined,
    facts: parseFacts(node, ['BIRT', 'DEAT']),
    familiesAsSpouse: getChildrenByTag(node, 'FAMS').map((c) => c.value as GedcomId),
    familyAsChild: getChildValue(node, 'FAMC') as GedcomId | undefined,
    notes: getChildrenByTag(node, 'NOTE').map((c) => c.value as GedcomId),
  };
}

function handleFamily(node: GEDCOMNode): Family {
  if (!node.value) throw new Error('Family ID is missing');

  return {
    id: node.value as GedcomId,
    husbandId: getChildValue(node, 'HUSB') as GedcomId | undefined,
    wifeId: getChildValue(node, 'WIFE') as GedcomId | undefined,
    childIds: getChildrenByTag(node, 'CHIL').map((c) => c.value as GedcomId),
    facts: parseFacts(node, ['MARR', 'DIV']),
    notes: getChildrenByTag(node, 'NOTE').map((c) => c.value as GedcomId),
  };
}

function handleRepository(node: GEDCOMNode): Repository {
  if (!node.value) throw new Error('Repository ID is missing');

  return {
    id: node.value as GedcomId,
    name: node.value || '',
    address: getChildValue(node, 'ADDR'),
  };
}

function handleSource(node: GEDCOMNode): Source {
  if (!node.value) throw new Error('Source ID is missing');

  return {
    id: node.value as GedcomId,
    title: node.value || '',
    author: getChildValue(node, 'AUTH'),
    publicationInfo: getChildValue(node, 'PUBL'),
    repository: getChildValue(node, 'REPO') as GedcomId | undefined,
  };
}

function handleMedia(node: GEDCOMNode): Media {
  if (!node.value) throw new Error('Media ID is missing');

  return {
    id: node.value as GedcomId,
    file: node.value || '',
    title: getChildValue(node, 'TITL'),
    notes: [],
  };
}

function handleNote(node: GEDCOMNode): Note {
  if (!node.value) throw new Error('Note ID is missing');

  return {
    id: node.value as GedcomId,
    text: node.value || '',
  };
}

function handlePlace(node: GEDCOMNode): Place {
  if (!node.value) throw new Error('Place ID is missing');

  return {
    id: node.value as GedcomId,
    name: node.value || '',
    formalName: getChildValue(node, 'FONE'), // jika tersedia
  };
}

function handleCitation(node: GEDCOMNode): Citation {
  if (!node.value) throw new Error('Citation ID is missing');

  return {
    id: node.value as GedcomId,
    sourceId: getChildValue(node, 'SOUR') as GedcomId,
    page: getChildValue(node, 'PAGE'),
  };
}

export function parseGedcomNodes(nodes: GEDCOMNode[]): ParsedGedcom {
  const result: ParsedGedcom = {
    individuals: {},
    families: {},
    sources: {},
    repositories: {},
    media: {},
    notes: {},
    places: {},
    citations: {},
  };

  for (const node of nodes) {
    switch (node.tag) {
      case 'INDI':
        const ind = handleIndividual(node);
        result.individuals[ind.id] = ind;
        break;

      case 'FAM':
        const fam = handleFamily(node);
        result.families[fam.id] = fam;
        break;

      case 'SOUR':
        const src = handleSource(node);
        result.sources[src.id] = src;
        break;

      case 'REPO':
        const repo = handleRepository(node);
        result.repositories[repo.id] = repo;
        break;

      case 'OBJE':
        const media = handleMedia(node);
        result.media[media.id] = media;
        break;

      case 'NOTE':
        const note = handleNote(node);
        result.notes[note.id] = note;
        break;

      case 'PLAC':
        const place = handlePlace(node);
        result.places[place.id] = place;
        break;

      case 'CITN':
        const citation = handleCitation(node);
        result.citations[citation.id] = citation;
        break;

      default:
        console.warn(`Unhandled GEDCOM tag: ${node.tag}`);
    }
  }

  return result;
}

export function parseGedcomTextToNodes(text: string): GEDCOMNode[] {
  const lines = text.split(/\r?\n/);
  const stack: GEDCOMNode[] = [];
  const root: GEDCOMNode[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim(); // Menghapus whitespace di depan dan belakang
    if (!trimmedLine) continue;

    // Memperhitungkan indentasi dan menggunakan regex yang telah diperbarui
    const match = trimmedLine.match(/^(\d+)\s+(@[^@]+@)?\s*([A-Z0-9_]+)(?:\s*(.*))?$/);

    if (!match) {
      console.warn('Unrecognized GEDCOM line format:', line);
      continue;
    }

    const [, levelStr, xref, tag, value] = match;
    const level = parseInt(levelStr, 10);

    const node: GEDCOMNode = {
      level,
      tag,
      value: xref ? xref : value?.trim(),
      children: [],
    };

    // Memastikan tag HEAD, CHAR, SOUR, TRLR dikenali meskipun tidak memiliki value
    if (['HEAD', 'CHAR', 'SOUR', 'TRLR'].includes(tag) && !value) {
      node.value = undefined;
    }

    // Pop stack sampai ketemu parent dengan level < current level
    while (stack.length > 0 && (stack[stack.length - 1]?.level ?? -1) >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }

    stack.push(node);
  }

  return root;
}

export function convertToGedcomX(parsed: ParsedGedcom): any {
  return {
    persons: Object.values(parsed.individuals).map((ind) => {
      return {
        id: ind.id,
        names: ind.names.map((name) => ({
          nameForms: [
            {
              fullText: name.full,
            },
          ],
        })),
        gender: ind.gender
          ? {
              type: ind.gender === 'M' ? 'http://gedcomx.org/Male' : 'http://gedcomx.org/Female',
            }
          : undefined,
        facts: ind.facts.map((f) => convertFactToGedcomX(f)).filter(Boolean),
      };
    }),
    relationships: Object.values(parsed.families).flatMap((fam) => {
      const rels: any[] = [];
      if (fam.husbandId && fam.wifeId) {
        rels.push({
          type: 'http://gedcomx.org/Couple',
          person1: { resource: `#${fam.husbandId}` },
          person2: { resource: `#${fam.wifeId}` },
          facts: fam.facts.map((f) => convertFactToGedcomX(f)).filter(Boolean),
        });
      }
      if (fam.childIds) {
        fam.childIds.forEach((childId) => {
          if (fam.husbandId) {
            rels.push({
              type: 'http://gedcomx.org/ParentChild',
              person1: { resource: `#${fam.husbandId}` },
              person2: { resource: `#${childId}` },
            });
          }
          if (fam.wifeId) {
            rels.push({
              type: 'http://gedcomx.org/ParentChild',
              person1: { resource: `#${fam.wifeId}` },
              person2: { resource: `#${childId}` },
            });
          }
        });
      }
      return rels;
    }),
  };
}

function convertFactToGedcomX(fact: GedcomFact): any | null {
  const factTypeMap: Record<string, string> = {
    BIRT: 'http://gedcomx.org/Birth',
    DEAT: 'http://gedcomx.org/Death',
    MARR: 'http://gedcomx.org/Marriage',
    DIV: 'http://gedcomx.org/Divorce',
  };

  const type = factTypeMap[fact.type];
  if (!type) return null;

  return {
    type,
    date: fact.date ? { original: fact.date } : undefined,
    place: fact.place ? { original: fact.place } : undefined,
  };
}

export function formatGedcomDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatGedcomTime(date: Date): string {
  return (
    date.getHours().toString().padStart(2, '0') +
    date.getMinutes().toString().padStart(2, '0') +
    date.getSeconds().toString().padStart(2, '0')
  );
}

// export function convertToGedcomTreeFromGedcomX(gedcomx: any, now: Date = new Date()): GEDCOMNode {
//   const formattedDate = formatGedcomDate(now); // "10 MAY 2025"
//   const formattedTime = formatGedcomTime(now); // "160446"

//   const root: GEDCOMNode = {
//     level: 0,
//     tag: 'HEAD',
//     value: undefined,
//     children: [],
//   };

//   const individualIdMap = new Map<string, string>();
//   const familyIdMap = new Map<string, string>();
//   let individualCount = 1;
//   let familyCount = 1;

//   const factTypeToGedcomTag: Record<string, string> = {
//     Birth: 'BIRT',
//     Death: 'DEAT',
//     Marriage: 'MARR',
//     Burial: 'BURI',
//     Adoption: 'ADOP',
//     Divorce: 'DIV',
//   };

//   // INDIVIDUALS
//   const individuals: GEDCOMNode[] = [];
//   if (Array.isArray(gedcomx.persons)) {
//     gedcomx.persons.forEach((person: any) => {
//       const newId = `@I${individualCount++}@`;
//       individualIdMap.set(person.id, newId);

//       const individualNode: GEDCOMNode = {
//         level: 1,
//         tag: 'INDI',
//         value: newId,
//         children: [],
//       };

//       if (Array.isArray(person.names)) {
//         person.names.forEach((name: any) => {
//           const fullText = name.nameForms?.[0]?.fullText;
//           if (fullText) {
//             individualNode.children!.push({
//               level: 2,
//               tag: 'NAME',
//               value: fullText,
//               children: [],
//             });
//           }
//         });
//       }

//       if (person.gender?.type) {
//         const gender = person.gender.type.split('/').pop();
//         individualNode.children!.push({
//           level: 2,
//           tag: 'SEX',
//           value: gender?.[0] || 'U',
//           children: [],
//         });
//       }

//       if (Array.isArray(person.facts)) {
//         person.facts.forEach((fact: any) => {
//           const factType = fact.type?.split('/').pop();
//           const tag = factTypeToGedcomTag[factType!] || factType;

//           const factNode: GEDCOMNode = {
//             level: 2,
//             tag: tag!,
//             value: undefined,
//             children: [],
//           };

//           if (fact.date?.original) {
//             factNode.children!.push({
//               level: 3,
//               tag: 'DATE',
//               value: fact.date.original,
//               children: [],
//             });
//           }

//           if (fact.place?.original) {
//             factNode.children!.push({
//               level: 3,
//               tag: 'PLAC',
//               value: fact.place.original,
//               children: [],
//             });
//           }

//           individualNode.children!.push(factNode);
//         });
//       }

//       individuals.push(individualNode);
//     });
//   }

//   // RELATIONSHIPS
//   const families: GEDCOMNode[] = [];
//   if (Array.isArray(gedcomx.relationships)) {
//     gedcomx.relationships.forEach((rel: any) => {
//       const relType = rel.type?.split('/').pop();
//       if (relType === 'Couple') {
//         const familyId = `@F${familyCount++}@`;
//         familyIdMap.set(rel.id, familyId);

//         const familyNode: GEDCOMNode = {
//           level: 1,
//           tag: 'FAM',
//           value: familyId,
//           children: [],
//         };

//         const person1Id = rel.person1?.resource?.replace(/^#/, '');
//         const person2Id = rel.person2?.resource?.replace(/^#/, '');

//         const husb = individualIdMap.get(person1Id!);
//         const wife = individualIdMap.get(person2Id!);

//         if (husb) {
//           familyNode.children!.push({ level: 2, tag: 'HUSB', value: husb, children: [] });
//         }

//         if (wife) {
//           familyNode.children!.push({ level: 2, tag: 'WIFE', value: wife, children: [] });
//         }

//         if (Array.isArray(rel.facts)) {
//           rel.facts.forEach((fact: any) => {
//             const factType = fact.type?.split('/').pop();
//             const tag = factTypeToGedcomTag[factType!] || factType;

//             const factNode: GEDCOMNode = {
//               level: 2,
//               tag: tag!,
//               value: undefined,
//               children: [],
//             };

//             if (fact.date?.original) {
//               factNode.children!.push({
//                 level: 3,
//                 tag: 'DATE',
//                 value: fact.date.original,
//                 children: [],
//               });
//             }

//             if (fact.place?.original) {
//               factNode.children!.push({
//                 level: 3,
//                 tag: 'PLAC',
//                 value: fact.place.original,
//                 children: [],
//               });
//             }

//             familyNode.children!.push(factNode);
//           });
//         }

//         families.push(familyNode);
//       } else if (relType === 'ParentChild') {
//         const parentId = rel.person1?.resource?.replace(/^#/, '');
//         const childId = rel.person2?.resource?.replace(/^#/, '');

//         const parentGedcomId = individualIdMap.get(parentId!);
//         let childGedcomId = individualIdMap.get(childId!);

//         if (!childGedcomId) {
//           childGedcomId = `@I${individualCount++}@`;
//           individualIdMap.set(childId, childGedcomId);

//           individuals.push({
//             level: 1,
//             tag: 'INDI',
//             value: childGedcomId,
//             children: [
//               { level: 2, tag: 'NAME', value: 'Unknown', children: [] },
//               { level: 2, tag: 'SEX', value: 'U', children: [] },
//               {
//                 level: 2,
//                 tag: 'BIRT',
//                 value: undefined,
//                 children: [
//                   { level: 3, tag: 'DATE', value: 'Unknown', children: [] },
//                   { level: 3, tag: 'PLAC', value: 'Unknown', children: [] },
//                 ],
//               },
//             ],
//           });
//         }

//         const familyId = `@F${familyCount++}@`;

//         const famNode: GEDCOMNode = {
//           level: 1,
//           tag: 'FAM',
//           value: familyId,
//           children: [],
//         };

//         if (parentGedcomId) {
//           famNode.children!.push({ level: 2, tag: 'HUSB', value: parentGedcomId, children: [] });
//         }

//         famNode.children!.push({ level: 2, tag: 'CHIL', value: childGedcomId, children: [] });

//         families.push(famNode);
//       } else if (relType === 'Divorce') {
//         const familyId = `@F${familyCount++}@`;
//         const famNode: GEDCOMNode = {
//           level: 0,
//           tag: 'FAM',
//           value: familyId,
//           children: [],
//         };

//         const husb = individualIdMap.get(rel.person1!.resource.replace(/^#/, '')!);
//         const wife = individualIdMap.get(rel.person2!.resource.replace(/^#/, '')!);

//         if (husb) {
//           famNode.children!.push({ level: 1, tag: 'HUSB', value: husb, children: [] });
//         }
//         if (wife) {
//           famNode.children!.push({ level: 1, tag: 'WIFE', value: wife, children: [] });
//         }

//         famNode.children!.push({
//           level: 1,
//           tag: 'DIV',
//           value: undefined,
//           children: [
//             { level: 2, tag: 'DATE', value: '1 JAN 2025', children: [] },
//             { level: 2, tag: 'PLAC', value: 'California', children: [] },
//           ],
//         });

//         families.push(famNode);
//       }
//     });
//   }

//   // Tambahkan metadata HEAD
//   const metaNodes: GEDCOMNode[] = [];

//   metaNodes.push({
//     level: 1,
//     tag: 'SOUR',
//     value: 'Kinship',
//     children: [
//       {
//         level: 2,
//         tag: 'VERS',
//         value: '1.0',
//         children: [],
//       },
//     ],
//   });

//   metaNodes.push({
//     level: 1,
//     tag: 'DATE',
//     value: formattedDate,
//     children: [
//       {
//         level: 2,
//         tag: 'TIME',
//         value: formattedTime,
//         children: [],
//       },
//     ],
//   });

//   root.children = [...metaNodes, ...individuals, ...families];

//   if (!root.children) {
//     root.children = [];
//   }

//   const trailerNode = {
//     level: 0,
//     tag: 'TRLR',
//     value: undefined,
//     children: [],
//   };

//   root.children.push(trailerNode);

//   return root;
// }

export function convertToGedcomTreeFromGedcomX(gedcomx: any, now: Date = new Date()): GEDCOMNode {
  const formattedDate = formatGedcomDate(now); // Format tanggal "10 MAY 2025"
  const formattedTime = formatGedcomTime(now); // Format waktu "160446"

  const root: GEDCOMNode = {
    level: 0,
    tag: 'HEAD',
    value: undefined,
    children: [],
  };

  const individualIdMap = new Map<string, string>(); // Mapping ID individu
  const familyIdMap = new Map<string, string>();    // Mapping ID keluarga
  let individualCount = 1; // Penghitung individu
  let familyCount = 1; // Penghitung keluarga

  const factTypeToGedcomTag: Record<string, string> = {
    Birth: 'BIRT',
    Death: 'DEAT',
    Marriage: 'MARR',
    Burial: 'BURI',
    Adoption: 'ADOP',
    Divorce: 'DIV',
  };

  const individuals: GEDCOMNode[] = [];
  if (Array.isArray(gedcomx.persons)) {
    gedcomx.persons.forEach((person: any) => {
      const newId = `@I${individualCount++}@`; // Membuat ID unik untuk individu
      individualIdMap.set(person.id, newId);

      const individualNode: GEDCOMNode = {
        level: 1,
        tag: 'INDI',
        value: newId,
        children: [],
      };

      if (Array.isArray(person.names)) {
        person.names.forEach((name: any) => {
          const fullText = name.nameForms?.[0]?.fullText;
          if (fullText) {
            individualNode.children!.push({
              level: 2,
              tag: 'NAME',
              value: fullText,
              children: [],
            });
          }
        });
      }

      if (person.gender?.type) {
        const gender = person.gender.type.split('/').pop();
        individualNode.children!.push({
          level: 2,
          tag: 'SEX',
          value: gender?.[0] || 'U',
          children: [],
        });
      }

      if (Array.isArray(person.facts)) {
        person.facts.forEach((fact: any) => {
          const factType = fact.type?.split('/').pop();
          const tag = factTypeToGedcomTag[factType!] || factType;

          const factNode: GEDCOMNode = {
            level: 2,
            tag: tag!,
            value: undefined,
            children: [],
          };

          if (fact.date?.original) {
            factNode.children!.push({
              level: 3,
              tag: 'DATE',
              value: fact.date.original,
              children: [],
            });
          }

          if (fact.place?.original) {
            factNode.children!.push({
              level: 3,
              tag: 'PLAC',
              value: fact.place.original,
              children: [],
            });
          }

          individualNode.children!.push(factNode);
        });
      }

      individuals.push(individualNode);
    });
  }

  const families: GEDCOMNode[] = [];
  if (Array.isArray(gedcomx.relationships)) {
    gedcomx.relationships.forEach((rel: any) => {
      const relType = rel.type?.split('/').pop();
      if (relType === 'Couple') {
        const familyId = `@F${familyCount++}@`; // Membuat ID keluarga
        familyIdMap.set(rel.id, familyId);

        const familyNode: GEDCOMNode = {
          level: 1,
          tag: 'FAM',
          value: familyId,
          children: [],
        };

        const person1Id = rel.person1?.resource?.replace(/^#/, '');
        const person2Id = rel.person2?.resource?.replace(/^#/, '');

        const husb = individualIdMap.get(person1Id!);
        const wife = individualIdMap.get(person2Id!);

        if (husb) {
          familyNode.children!.push({ level: 2, tag: 'HUSB', value: husb, children: [] });
        }

        if (wife) {
          familyNode.children!.push({ level: 2, tag: 'WIFE', value: wife, children: [] });
        }

        if (Array.isArray(rel.facts)) {
          rel.facts.forEach((fact: any) => {
            const factType = fact.type?.split('/').pop();
            const tag = factTypeToGedcomTag[factType!] || factType;

            const factNode: GEDCOMNode = {
              level: 2,
              tag: tag!,
              value: undefined,
              children: [],
            };

            if (fact.date?.original) {
              factNode.children!.push({
                level: 3,
                tag: 'DATE',
                value: fact.date.original,
                children: [],
              });
            }

            if (fact.place?.original) {
              factNode.children!.push({
                level: 3,
                tag: 'PLAC',
                value: fact.place.original,
                children: [],
              });
            }

            familyNode.children!.push(factNode);
          });
        }

        families.push(familyNode);
      } else if (relType === 'ParentChild') {
        const parentId = rel.person1?.resource?.replace(/^#/, '');
        const childId = rel.person2?.resource?.replace(/^#/, '');

        const parentGedcomId = individualIdMap.get(parentId!);
        let childGedcomId = individualIdMap.get(childId!);

        if (!childGedcomId) {
          childGedcomId = `@I${individualCount++}@`;
          individualIdMap.set(childId, childGedcomId);

          individuals.push({
            level: 1,
            tag: 'INDI',
            value: childGedcomId,
            children: [
              { level: 2, tag: 'NAME', value: 'Unknown', children: [] },
              { level: 2, tag: 'SEX', value: 'U', children: [] },
              {
                level: 2,
                tag: 'BIRT',
                value: undefined,
                children: [
                  { level: 3, tag: 'DATE', value: 'Unknown', children: [] },
                  { level: 3, tag: 'PLAC', value: 'Unknown', children: [] },
                ],
              },
            ],
          });
        }

        const familyId = `@F${familyCount++}@`;

        const famNode: GEDCOMNode = {
          level: 1,
          tag: 'FAM',
          value: familyId,
          children: [],
        };

        if (parentGedcomId) {
          famNode.children!.push({ level: 2, tag: 'HUSB', value: parentGedcomId, children: [] });
        }

        famNode.children!.push({ level: 2, tag: 'CHIL', value: childGedcomId, children: [] });

        families.push(famNode);
      } else if (relType === 'Divorce') {
        const familyId = `@F${familyCount++}@`;
        const famNode: GEDCOMNode = {
          level: 0,
          tag: 'FAM',
          value: familyId,
          children: [],
        };

        const husb = individualIdMap.get(rel.person1!.resource.replace(/^#/, '')!);
        const wife = individualIdMap.get(rel.person2!.resource.replace(/^#/, '')!);

        if (husb) {
          famNode.children!.push({ level: 1, tag: 'HUSB', value: husb, children: [] });
        }
        if (wife) {
          famNode.children!.push({ level: 1, tag: 'WIFE', value: wife, children: [] });
        }

        famNode.children!.push({
          level: 1,
          tag: 'DIV',
          value: undefined,
          children: [
            { level: 2, tag: 'DATE', value: '1 JAN 2025', children: [] },
            { level: 2, tag: 'PLAC', value: 'California', children: [] },
          ],
        });

        families.push(famNode);
      }
    });
  }

  // Tambahkan metadata HEAD
  const metaNodes: GEDCOMNode[] = [];

  metaNodes.push({
    level: 1,
    tag: 'SOUR',
    value: 'Kinship',
    children: [
      {
        level: 2,
        tag: 'VERS',
        value: '1.0',
        children: [],
      },
    ],
  });

  metaNodes.push({
    level: 1,
    tag: 'DATE',
    value: formattedDate,
    children: [
      {
        level: 2,
        tag: 'TIME',
        value: formattedTime,
        children: [],
      },
    ],
  });

  root.children = [...metaNodes, ...individuals, ...families];

  if (!root.children) {
    root.children = [];
  }

  const trailerNode = {
    level: 0,
    tag: 'TRLR',
    value: undefined,
    children: [],
  };

  root.children.push(trailerNode);

  return root;
}


// function gedcomNodesToText(nodes: GEDCOMNode[]): string {
//     return nodes.map(node => nodeToGedcom(node)).join('\n');
// }

export function nodeToGedcom(node: GEDCOMNode): string {
  const { level, tag, value, children } = node;

  // Handle line format
  let line = '';
  if (value?.startsWith('@')) {
    line = `${level} ${value} ${tag}`;
  } else if (value) {
    line = `${level} ${tag} ${value}`;
  } else {
    line = `${level} ${tag}`;
  }

  // Normalize FAM roles like "1 @I1@ HUSB" → "1 HUSB @I1@"
  const famRoleMatch = line.match(/^(\d+)\s+(@(?:I|F)\d+@)\s+(HUSB|WIFE|CHIL)$/);
  if (famRoleMatch) {
    const [_, lvl, personId, role] = famRoleMatch;
    line = `${lvl} ${role} ${personId}`;
  }

  const childrenLines = children?.map(nodeToGedcom).join('\n') || '';
  const result = childrenLines ? `${line}\n${childrenLines}` : line;

  // Append TRLR if HEAD node

  // Pola untuk memeriksa apakah string tidak ada isinya
  const pattern =
    /^0 HEAD\n1 SOUR Kinship\n2 VERS 1.0\n1 DATE \d{2} [A-Z]{3} \d{4}\n2 TIME \d{6}\n0 TRLR$/;

  // Jika string sesuai dengan pola, kembalikan string kosong
  if (pattern.test(result)) {
    return '';
  }

  return result;
}

export function stringifyGedcomTree(tree: GEDCOMNode): string {
  const lines: string[] = [];

  function traverse(node: GEDCOMNode) {
    const line = `${node.level} ${node.value ? node.value + ' ' : ''}${node.tag}${
      node.value && !node.tag.startsWith('@') ? ' ' + node.value : ''
    }`.trim();
    lines.push(line);
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child));
    }
  }

  traverse(tree);
  return lines.join('\n');
}
