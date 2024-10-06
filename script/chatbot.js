const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API Key

async function fetchFromOpenAI(query) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // or another model
            prompt: query,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

// Event listeners for sample questions or search input
document.querySelectorAll('.sample-question').forEach(question => {
    question.addEventListener('click', async () => {
        const query = question.innerText;
        const answer = await fetchFromOpenAI(query);
        document.getElementById('answer').innerText = answer;
    });
});

document.getElementById('search-input').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value;
        const answer = await fetchFromOpenAI(query);
        document.getElementById('answer').innerText = answer;
    }
});
