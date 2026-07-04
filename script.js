const video = document.getElementById('video');
const listContainer = document.getElementById('channelList');
const searchInput = document.getElementById('searchInput');
let allChannels = [];

// جلب القنوات من ملف go.m3u
async function loadChannels() {
    try {
        const response = await fetch('go.m3u');
        const data = await response.text();
        const lines = data.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                let name = lines[i].split(',')[1];
                let url = lines[i + 1] ? lines[i + 1].trim() : "";
                if (name && url) allChannels.push({ name, url });
            }
        }
        renderList(allChannels);
    } catch (err) {
        listContainer.innerHTML = "<p style='padding:20px'>خطأ: تأكد من وجود ملف go.m3u في نفس المجلد</p>";
    }
}

function renderList(channels) {
    listContainer.innerHTML = "";
    channels.forEach(ch => {
        let div = document.createElement('div');
        div.className = "channel-item";
        div.innerText = ch.name;
        div.onclick = () => playChannel(ch.url);
        listContainer.appendChild(div);
    });
}

function playChannel(url) {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.play();
    } else {
        video.src = url;
    }
}

// تفعيل البحث المباشر
searchInput.addEventListener('input', (e) => {
    const filtered = allChannels.filter(ch => 
        ch.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderList(filtered);
});

loadChannels();
