console.log("This is just testing");
// Load saved data
let totals = JSON.parse(localStorage.getItem('totals')) || {
    complete: 0,
    food: 0,
    entertainment: 0,
    essentials: 0,
    transport: 0,
};
document.getElementById('listedExpenses').innerHTML = localStorage.getItem('expensesHTML') || "";

// Update UI initially
updateTotalsUI();

document.getElementById('addExpense').addEventListener('click', (event) => {
    event.preventDefault();

    const amount = parseInt(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    if (!amount || !date || !category) {
        alert("Invalid data");
        return;
    }

    totals.complete += amount;
    if (totals[category] != null) {
        totals[category] += amount;
    }

    document.getElementById('listedExpenses').innerHTML += `
        <ul>
            <li data-amount="${amount}" data-category="${category}">
                <span class="amount">${amount}</span>
                <span class="date">${date}</span>
                <span class="category">${category.toUpperCase()}</span>
                <button class="deletebtn">Delete</button>
            </li>
        </ul>
    `;

    saveData();
    updateTotalsUI();
});

document.getElementById('listedExpenses').addEventListener('click', (event) => {
    if (event.target.classList.contains('deletebtn')) {
        const li = event.target.closest('li');
        const amount = parseInt(li.dataset.amount);
        const category = li.dataset.category;

        totals.complete -= amount;
        if (totals[category] != null) {
            totals[category] -= amount;
        }

        li.remove();
        saveData();
        updateTotalsUI();
    }
});

function updateTotalsUI() {
    document.getElementById('completeTotal').innerText = totals.complete;
    document.getElementById('transportTotal').innerText = totals.transport;
    document.getElementById('essentialsTotal').innerText = totals.essentials;
    document.getElementById('entertainmentTotal').innerText = totals.entertainment;
    document.getElementById('foodTotal').innerText = totals.food;
}

function saveData() {
    localStorage.setItem('totals', JSON.stringify(totals));
    localStorage.setItem('expensesHTML', document.getElementById('listedExpenses').innerHTML);
}

