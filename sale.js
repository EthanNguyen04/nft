document.getElementById('nftSaleForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const idNft = document.getElementById('idNft').value;
    const naturalAmount = document.getElementById('naturalAmount').value;

    try {
        const response = await fetch('http://localhost:3000/api/list-nft-for-sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idNft, naturalAmount })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.consentUrl) {
                // Hiển thị consentUrl trên giao diện
                const messageElement = document.getElementById('message');
                messageElement.innerHTML = `NFT listed for sale! Please visit this URL for further actions: <a href="${data.consentUrl}" target="_blank">${data.consentUrl}</a>`;
                messageElement.style.color = 'green';
            } else {
                // Xử lý trường hợp không có consentUrl
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'Failed to list NFT for sale. No consent URL provided.';
                messageElement.style.color = 'red';
            }
        } else {
            const responseBody = await response.text();
            const messageElement = document.getElementById('message');
            messageElement.textContent = `Failed to list NFT for sale: ${responseBody}`;
            messageElement.style.color = 'red';
        }
    } catch (err) {
        console.error('Error:', err);
        const messageElement = document.getElementById('message');
        messageElement.textContent = `Failed to list NFT for sale: ${err.message}`;
        messageElement.style.color = 'red';
    }
});
