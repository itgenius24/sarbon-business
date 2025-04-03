 export function extractUrlInfo(url) {
    const regex = /media\/(.*?)_(.*)/;
    const match = url.match(regex);
    
    if (!match) return null;
    
    const name = match[2];
    const extension = name.split('.').pop().toLowerCase();
    const type = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp'].includes(extension) ? 'image' : 'file';
    
    return {
        type,
        link: url,
        name
    };
}
