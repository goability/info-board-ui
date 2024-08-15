
function createPieChart(elementId, slices, labels, size) {
    const chart = document.getElementById(elementId);
    chart.style.width = size + 'px';
    chart.style.height = size + 'px';

    const gradients = slices.map((slice, index) => {
        const prevPercent = slices.slice(0, index).reduce((acc, curr) => acc + curr.percent, 0);
        return `${slice.color} ${prevPercent}% ${prevPercent + slice.percent}%`;
    }).join(', ');

    chart.style.background = `conic-gradient(${gradients})`;

    const centerX = size / 2;
    const centerY = size / 2;

    slices.forEach((slice, index) => {
        const label = document.getElementById(`label${index + 1}`);
        const midPercent = (slice.percent / 2) + slices.slice(0, index).reduce((acc, curr) => acc + curr.percent, 0);
        const angle = midPercent * 3.6; // Convert percentage to degrees
        const x = centerX + (centerX * 0.6) * Math.cos((angle - 90) * (Math.PI / 180));
        const y = centerY + (centerY * 0.6) * Math.sin((angle - 90) * (Math.PI / 180));
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.textContent = labels[index];
    });
}
function createBarChart(elementId, data, chartHeight) {
    const chart = document.getElementById(elementId);
    chart.style.height = chartHeight + 'px';

    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (item.value / 100) * chartHeight + 'px'; // Adjust height based on value
        bar.style.backgroundColor = item.color || '#4caf50'; // Optional: set a specific color
        bar.textContent = item.value;

        chart.appendChild(bar);
    });
}