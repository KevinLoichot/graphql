function renderXPByProject(transactions) {
  const width = 600;
  const height = 300;
  const padding = 40;

  const byProject = {};
  transactions.forEach((t) => {
    const name = t.object ? t.object.name : 'unknown';
    byProject[name] = (byProject[name] || 0) + t.amount;
  });

  const entries = Object.entries(byProject).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxXP = Math.max(...entries.map((e) => e[1]));
  const barWidth = (width - padding * 2) / entries.length;

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
  xLabel.textContent = 'Projects';

  const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yLabel.setAttribute('x', -(height / 2));
  yLabel.setAttribute('y', 12);
  yLabel.setAttribute('text-anchor', 'middle');
  yLabel.setAttribute('font-size', '11');
  yLabel.setAttribute('fill', '#818cf8');
  yLabel.setAttribute('transform', 'rotate(-90)');
  yLabel.textContent = 'XP';

  svg.appendChild(xAxis);
  svg.appendChild(yAxis);
  svg.appendChild(xLabel);
  svg.appendChild(yLabel);

  entries.forEach(([name, xp], i) => {
    const barHeight = (xp / maxXP) * (height - padding * 2);
    const x = padding + i * barWidth;
    const y = height - padding - barHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + 4);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth - 8);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#7c6ff7');

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + barWidth / 2);
    label.setAttribute('y', height - padding + 14);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '9');
    label.setAttribute('fill', '#aaa');
    label.textContent = name.slice(0, 8);

    svg.appendChild(rect);
    svg.appendChild(label);
  });

  document.getElementById('graphs').appendChild(svg);
}
