// Create and return a base SVG element with the given dimensions
function createSVG(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  return svg;
}

/*
  Render a cumulative XP over time line chart.
  Sorts transactions by date, accumulates XP, then draws a polyline.
*/
function renderXPOverTime(transactions) {
  const width = 600;
  const height = 300;
  const padding = 40;

  const sorted = [...transactions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Build cumulative XP points
  let cumulative = 0;
  const points = sorted.map((t) => {
    cumulative += t.amount;
    return { date: new Date(t.createdAt), xp: cumulative };
  });

  const minDate = points[0].date.getTime();
  const maxDate = points[points.length - 1].date.getTime();
  const maxXP = points[points.length - 1].xp;

  // Scale functions to map data values to SVG coordinates
  const scaleX = (date) => padding + ((date.getTime() - minDate) / (maxDate - minDate)) * (width - padding * 2);
  const scaleY = (xp) => height - padding - (xp / maxXP) * (height - padding * 2);

  const svg = createSVG(width, height);

  // X axis
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', padding);
  xAxis.setAttribute('y1', height - padding);
  xAxis.setAttribute('x2', width - padding);
  xAxis.setAttribute('y2', height - padding);
  xAxis.setAttribute('stroke', '#666');
  xAxis.setAttribute('stroke-width', '1');

  // Y axis
  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', padding);
  yAxis.setAttribute('y1', padding);
  yAxis.setAttribute('x2', padding);
  yAxis.setAttribute('y2', height - padding);
  yAxis.setAttribute('stroke', '#666');
  yAxis.setAttribute('stroke-width', '1');

  // X axis label
  const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xLabel.setAttribute('x', width / 2);
  xLabel.setAttribute('y', height - 4);
  xLabel.setAttribute('text-anchor', 'middle');
  xLabel.setAttribute('font-size', '11');
  xLabel.setAttribute('fill', '#818cf8');
  xLabel.textContent = 'Date';

  // Y axis label
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

  const section = document.getElementById('graphs');
  section.appendChild(svg);
}

/*
  Render a bar chart of XP earned per project.
  Groups transactions by project name, sorts by XP descending, shows top 10.
*/
function renderXPByProject(transactions) {
  const width = 600;
  const height = 300;
  const padding = 40;

  // Group XP by project name
  const byProject = {};
  transactions.forEach((t) => {
    const name = t.object ? t.object.name : 'unknown';
    byProject[name] = (byProject[name] || 0) + t.amount;
  });

  const entries = Object.entries(byProject).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxXP = Math.max(...entries.map((e) => e[1]));
  const barWidth = (width - padding * 2) / entries.length;

  const svg = createSVG(width, height);

  // X axis
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', padding);
  xAxis.setAttribute('y1', height - padding);
  xAxis.setAttribute('x2', width - padding);
  xAxis.setAttribute('y2', height - padding);
  xAxis.setAttribute('stroke', '#666');
  xAxis.setAttribute('stroke-width', '1');

  // Y axis
  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', padding);
  yAxis.setAttribute('y1', padding);
  yAxis.setAttribute('x2', padding);
  yAxis.setAttribute('y2', height - padding);
  yAxis.setAttribute('stroke', '#666');
  yAxis.setAttribute('stroke-width', '1');

  // X axis label
  const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xLabel.setAttribute('x', width / 2);
  xLabel.setAttribute('y', height - 4);
  xLabel.setAttribute('text-anchor', 'middle');
  xLabel.setAttribute('font-size', '11');
  xLabel.setAttribute('fill', '#818cf8');
  xLabel.textContent = 'Projects';

  // Y axis label
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
    const barHeight = ((xp / maxXP) * (height - padding * 2));
    const x = padding + i * barWidth;
    const y = height - padding - barHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + 4);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth - 8);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#7c6ff7');

    // Project name label below the bar
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

  const section = document.getElementById('graphs');
  section.appendChild(svg);
}
