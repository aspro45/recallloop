import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function ProductVisual({ evidence, reviews, disputes, confidence }: { evidence: number; reviews: number; disputes: number; confidence: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    const nodes = [
      { id: 'notice', x: 72, y: 165, label: 'AUTHORITY', value: 1, state: 'source' },
      { id: 'lot', x: 252, y: 82, label: 'AFFECTED LOT', value: Math.max(1, evidence), state: 'risk' },
      { id: 'north', x: 446, y: 62, label: 'NORTH HUB', value: 2, state: 'route' },
      { id: 'retail', x: 446, y: 172, label: 'RETAIL', value: 3, state: 'route' },
      { id: 'export', x: 446, y: 282, label: 'EXPORT', value: 1, state: 'route' },
      { id: 'closure', x: 650, y: 172, label: 'CLOSURE', value: Math.max(1, reviews), state: disputes ? 'hold' : 'closed' },
    ];
    const links = [['notice','lot'],['lot','north'],['lot','retail'],['lot','export'],['north','closure'],['retail','closure'],['export','closure']];
    const nodeById = new Map(nodes.map(node => [node.id, node]));
    svg.attr('viewBox', '0 0 720 350');
    svg.append('g').selectAll('line').data(links).join('line')
      .attr('x1', d => nodeById.get(d[0])!.x).attr('y1', d => nodeById.get(d[0])!.y)
      .attr('x2', d => nodeById.get(d[1])!.x).attr('y2', d => nodeById.get(d[1])!.y)
      .attr('class', 'route-line');
    const group = svg.append('g').selectAll('g').data(nodes).join('g').attr('transform', d => 'translate(' + d.x + ',' + d.y + ')').attr('class', d => 'route-node ' + d.state);
    group.append('circle').attr('r', 26);
    group.append('text').attr('class', 'node-value').attr('text-anchor', 'middle').attr('dy', '5').text(d => d.value);
    group.append('text').attr('class', 'node-label').attr('text-anchor', 'middle').attr('y', 47).text(d => d.label);
    svg.append('text').attr('x', 650).attr('y', 330).attr('text-anchor', 'end').attr('class', 'map-score').text(confidence + '% CONTAINED');
  }, [evidence, reviews, disputes, confidence]);
  return <div className="recall-map"><svg ref={ref} aria-label="Live recall distribution containment map" /><div className="map-legend"><span><i className="risk" /> affected</span><span><i className="route" /> traced</span><span><i className="closed" /> closed</span></div></div>;
}
