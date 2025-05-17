import { GEDCOMNode } from '../types/gedcom/gedcom';

function serializeNode(_: GEDCOMNode) {
  // const parts = [String(node.level)];
  // if (node.pointer) parts.push(node.pointer);
  // parts.push(node.tag);
  // if (node.value) parts.push(node.value);
  // const line = parts.join(' ');
  // const childLines = node.children.map(serializeNode);
  // return [line, ...childLines].join('\n');
}

export function serializeGedcom(nodes: GEDCOMNode[]): string {
  return nodes.map(serializeNode).join('\n');
}
