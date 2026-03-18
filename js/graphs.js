function createSVG(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  return svg;
}

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

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points.map((p) => `${scaleX(p.date)},${scaleY(p.xp)}`).join(' '));
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#f0f0f0');
  polyline.setAttribute('stroke-width', '2');

  svg.appendChild(polyline);

  const section = document.getElementById('graphs');
  section.appendChild(svg);
}
