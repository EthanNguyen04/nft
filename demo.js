document.getElementById('nftForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const publickey = document.getElementById('publickey').value;
    const from = parseInt(document.getElementById('from').value, 10);
    const to = parseInt(document.getElementById('to').value, 10);

    const response = await fetch('http://localhost:3000/api/create-nft', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, imageUrl, publickey, from, to })
    });

    const messageElement = document.getElementById('message');
    if (response.ok) {
        messageElement.textContent = 'NFT created successfully!';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Failed to create NFT.';
        messageElement.style.color = 'red';
    }
});
