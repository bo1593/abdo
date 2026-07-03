const channels = [
    { name: "BEIN SPORTS 1 MAX HEVC", url: "http://96820894386333777.ofdp1112.xyz:80/live/FKRFM93YEF/CdvnqxyHNH/333777.ts" },
    { name: "BEIN SPORTS 1 MAX HD", url: "http://96820894386333779.ofdp1112.xyz:80/live/FKRFM93YEF/CdvnqxyHNH/333779.ts" }
    // أكمل القائمة بنفس الطريقة
];

const container = document.getElementById('channels-container');

channels.forEach(channel => {
    const card = document.createElement('div');
    card.className = 'channel-card';
    card.innerHTML = `<h3>${channel.name}</h3><a href="${channel.url}" target="_blank">مشاهدة</a>`;
    container.appendChild(card);
});
