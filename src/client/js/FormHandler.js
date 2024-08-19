const serverURL = 'http://localhost:8000/api';

document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
});

function setupEventListeners() {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form element with id "urlForm" not found');
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500); 
        }, 3000);
    } else {
        console.error('Toast container element not found');
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    try {
        const url = document.getElementById('text').value;
        if (!Client.checkForArticle(url)) {
            showToast('Sorry, the URL you entered is not valid.', 'warning');
            document.getElementById('text').value = '';
            return;
        }

        const result = await Client.submitArticle(url, serverURL);
        Client.displayRes(result.score_tag, result.agreement, result.subjectivity, result.confidence, result.irony);
        showToast('Results have been successfully evaluated.', 'success');

    } catch (error) {
        showToast('An error occurred while submitting the article.', 'error');
    } finally {
        document.getElementById('text').value = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
});

export { handleSubmit, showToast };
