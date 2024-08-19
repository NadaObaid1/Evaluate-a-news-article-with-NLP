function displayRes(Polarity, agreement, subjectivity, confidence, irony) {
    const resultElement = document.getElementById('sentimentResult');
    resultElement.innerHTML = '';

    const polarityMap = {
        'P+': 'Strong Positive',
        'P': 'Positive',
        'NEU': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong Negative',
        'NONE': 'Without'
    };

    const results = [
        { name: 'Polarity', value: polarityMap[Polarity] || 'Unknown' },
        { name: 'Agreement', value: agreement || 'N/A' },
        { name: 'Subjectivity', value: subjectivity || 'N/A' },
        { name: 'Confidence', value: confidence ? confidence + '%' : 'N/A' },
        { name: 'Irony', value: irony || 'N/A' }
    ];

    results.forEach(result => {
        const box = document.createElement('div');
        box.className = 'result-box';

        const title = document.createElement('h3');
        title.textContent = result.name;
        title.style.fontWeight = 'bold';
        title.style.fontSize = '18px';
        title.style.marginBottom = '5px';
        title.style.color = '#333';

        const value = document.createElement('p');
        value.textContent = result.value || 'N/A';
        value.style.fontSize = '16px';
        value.style.margin = '0';
        value.style.color = '#666';

        box.appendChild(title);
        box.appendChild(value);

        box.style.border = '1px solid #ddd';
        box.style.borderRadius = '8px';
        box.style.padding = '15px';
        box.style.marginBottom = '10px';
        box.style.backgroundColor = '#f9f9f9';
        box.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

        resultElement.appendChild(box);
    });
}

export { displayRes };
