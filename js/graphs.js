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

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points.map((p) => `${scaleX(p.date)},${scaleY(p.xp)}`).join(' '));
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#f0f0f0');
  polyline.setAttribute('stroke-width', '2');

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

  entries.forEach(([name, xp], i) => {
    const barHeight = ((xp / maxXP) * (height - padding * 2));
    const x = padding + i * barWidth;
    const y = height - padding - barHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + 4);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth - 8);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#f0f0f0');

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
