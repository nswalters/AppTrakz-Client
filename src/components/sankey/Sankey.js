import React from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLeft, sankeyLinkHorizontal } from 'd3-sankey';
import chroma from 'chroma-js';

const SankeyNode = ({
  name, x0, x1, y0, y1, color, width, height, value,
}) => (
  <>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={color}>
      <title>{name}</title>
    </rect>
    <text
      x={x0 < width / 2 ? x1 + 6 : x0 - 6}
      y={(y1 + y0) / 2}
      style={{
        alignmentBaseline: 'middle',
        fontSize: 9,
        textAnchor: x0 < width / 2 ? 'start' : 'end',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {name}
      <tspan fillOpacity="0.7"> {value}</tspan>
    </text>
  </>
);

const SankeyLink = ({ link, color }) => (
  <path
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: 'none',
      strokeOpacity: '.3',
      stroke: color,
      strokeWidth: Math.max(1, link.width),
    }}
  />
);

const Sankey = ({ data, width, height }) => {
  const { nodes, links } = sankey()
    .nodeAlign(sankeyLeft)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 5]])(data);
  const color = chroma.scale('Set3').classes(nodes.length);
  const colorScale = d3
    .scaleLinear()
    .domain([0, nodes.length])
    .range([0, 1]);

  return (
    <g style={{ mixBlendMode: 'multiply' }}>
      {nodes.map((node, i) => (
        <SankeyNode
          {...node}
          color={color(colorScale(i)).hex()}
          key={node.name}
          width={width}
          height={height}
        />
      ))}
      {links.map((link, i) => (
        <SankeyLink
          link={link}
          color={color(colorScale(link.source.index)).hex()}
          key={link.index}
        />
      ))}
    </g>
  );
};

export default Sankey;
