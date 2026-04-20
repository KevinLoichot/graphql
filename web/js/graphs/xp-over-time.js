function renderXPOverTime(transactions) {
  const width = 600;
  const height = 300;
  const padding = 40;

  const sorted = [...transactions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  let cumulative = 0;
  const points = sorted.map((t) => {
    cumulative += t.amount;
    return { date: new Date(t.createdAt), xp: cumulative };
  });

  const minDate = points[0].date.getTime();
  const maxDate = points[points.length - 1].date.getTime();
  const maxXP = points[points.length - 1].xp;

  const scaleX = (date) => padding + ((date.getTime() - minDate) / (maxDate - minDate)) * (width - padding * 2);
  const scaleY = (xp) => height - padding - (xp / maxXP) * (height - padding * 2);

  const svg = createSVG(width, height);

  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', padding);
  xAxis.setAttribute('y1', height - padding);
  xAxis.setAttribute('x2', width - padding);
  xAxis.setAttribute('y2', height - padding);
  xAxis.setAttribute('stroke', '#666');
  xAxis.setAttribute('stroke-width', '1');

  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', padding);
  yAxis.setAttribute('y1', padding);
  yAxis.setAttribute('x2', padding);
  yAxis.setAttribute('y2', height - padding);
  yAxis.setAttribute('stroke', '#666');
  yAxis.setAttribute('stroke-width', '1');

  const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xLabel.setAttribute('x', width / 2);
  xLabel.setAttribute('y', height - 4);
  xLabel.setAttribute('text-anchor', 'middle');
  xLabel.setAttribute('font-size', '11');
  xLabel.setAttribute('fill', '#818cf8');
  xLabel.textContent = 'Date';

  const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yLabel.setAttribute('x', -(height / 2));
  yLabel.setAttribute('y', 12);
  yLabel.setAttribute('text-anchor', 'middle');
  yLabel.setAttribute('font-size', '11');
  yLabel.setAttribute('fill', '#818cf8');
  yLabel.setAttribute('transform', 'rotate(-90)');
  yLabel.textContent = 'XP';

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points.map((p) => `${scaleX(p.date)},${scaleY(p.xp)}`).join(' '));
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#7c6ff7');
  polyline.setAttribute('stroke-width', '2');

  svg.appendChild(xAxis);
  svg.appendChild(yAxis);
  svg.appendChild(xLabel);
  svg.appendChild(yLabel);
  svg.appendChild(polyline);

  document.getElementById('graphs').appendChild(svg);
}
