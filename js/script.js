
// SMARTLIBRARY - DEFAULT STUDENT ACCOUNT

if (!localStorage.getItem("students")) {
    const students = [
        {
            name: "Demo Student",
            studentId: "2026123456",
            email: "student@example.com",
            password: "123456"
        }
    ];

    localStorage.setItem("students", JSON.stringify(students));
}

// SHOW AND HIDE PASSWORD

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
    togglePassword.addEventListener("click", function () {
        const isHidden = password.type === "password";

        password.type = isHidden ? "text" : "password";

        this.innerHTML = isHidden
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';
    });
}

// LOGIN FUNCTION

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const studentId = document.getElementById("studentId").value.trim();
        const password = document.getElementById("password").value;
        const loginError = document.getElementById("loginError");

        const students = JSON.parse(localStorage.getItem("students")) || [];

        const student = students.find(s =>
            s.studentId === studentId && s.password === password
        );

        if (student) {
            const { password, ...currentStudent } = student;

            localStorage.setItem("currentStudent", JSON.stringify(currentStudent));

            window.location.href = "dashboard.html";
        } else {
            loginError.textContent = "Invalid Student ID or password.";
            loginError.classList.remove("d-none");
        }
    });
}



// REGISTRATION FUNCTION

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const faculty = document.getElementById("faculty").value.trim();
        const programme = document.getElementById("programme").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const error = document.getElementById("registerError");
        const success = document.getElementById("registerSuccess");

        error.classList.add("d-none");
        success.classList.add("d-none");

        const students = JSON.parse(localStorage.getItem("students")) || [];

        if (!name || !faculty || !programme) {
            error.textContent = "Please complete all student details.";
        } else if (!/^\d{10}$/.test(studentId)) {
            error.textContent = "Student ID must contain 10 digits.";
        } else if (password.length < 6) {
            error.textContent = "Password must contain at least 6 characters.";
        } else if (password !== confirmPassword) {
            error.textContent = "Passwords do not match.";
        } else if (students.some(s => s.studentId === studentId)) {
            error.textContent = "Student ID is already registered.";
        } else if (students.some(s => s.email.toLowerCase() === email)) {
            error.textContent = "Email is already registered.";
        } else {
            students.push({
                name,
                studentId,
                email,
                faculty,
                programme,
                password
            });

            localStorage.setItem("students", JSON.stringify(students));

            success.textContent = "Registration successful! Redirecting to login...";
            success.classList.remove("d-none");

            registerForm.reset();
            registerForm.querySelector("button[type='submit']").disabled = true;

            setTimeout(function () {
                window.location.href = "index.html";
            }, 2000);

            return;
        }

        error.classList.remove("d-none");
    });
}



// LOGIN SESSION AND LOGOUT

const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));

if (document.body.classList.contains("dashboard-page")) {

    if (!currentStudent) {
        window.location.replace("index.html");
    } else {
        const studentName = document.getElementById("studentName");
        const headerName = document.getElementById("headerName");

        if (studentName) studentName.textContent = currentStudent.name;
        if (headerName) headerName.textContent = currentStudent.name;
    }
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("currentStudent");
            window.location.replace("index.html");
        }
    });
}



// LIBRARY DATA STORAGE

if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify([]));
}

if (!localStorage.getItem("transactions")) {
    localStorage.setItem("transactions", JSON.stringify([]));
}

if (!localStorage.getItem("payments")) {
    localStorage.setItem("payments", JSON.stringify([]));
}


// SAMPLE BOOK DATA

if (!localStorage.getItem("sampleBooksLoaded")) {

    const sampleBooks = [
        {
            id: "B001",
            title: "Management Information Systems",
            author: "Kenneth C. Laudon & Jane P. Laudon",
            isbn: "DEMO-001",
            category: "Information Systems",
            location: "A-01",
            quantity: 5,
            available: 5,
            cover: "images/assets/BT1.jpg"
        },
        {
            id: "B002",
            title: "Database System Concepts",
            author: "Abraham Silberschatz, Henry Korth & S. Sudarshan",
            isbn: "DEMO-002",
            category: "Database",
            location: "A-02",
            quantity: 4,
            available: 4,
            cover: "images/books/database.jpg"
        },
        {
            id: "B003",
            title: "Information Technology Project Management",
            author: "Kathy Schwalbe",
            isbn: "DEMO-003",
            category: "Project Management",
            location: "B-01",
            quantity: 6,
            available: 6,
            cover: "images/books/project.jpg"
        },
        {
            id: "B004",
            title: "Research Methods for Business",
            author: "Uma Sekaran & Roger Bougie",
            isbn: "DEMO-004",
            category: "Research",
            location: "B-02",
            quantity: 5,
            available: 5,
            cover: "images/books/research.jpg"
        },
        {
            id: "B005",
            title: "Introduction to Information Science",
            author: "David Bawden & Lyn Robinson",
            isbn: "DEMO-005",
            category: "Information Science",
            location: "C-01",
            quantity: 4,
            available: 4,
            cover: "images/books/information.jpg"
        },
        {
            id: "B006",
            title: "Data Science for Business",
            author: "Foster Provost & Tom Fawcett",
            isbn: "DEMO-006",
            category: "Data Analytics",
            location: "C-02",
            quantity: 6,
            available: 6,
            cover: "images/books/datascience.jpg"
        }
    ];

    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

    if (existingBooks.length === 0) {
        localStorage.setItem("books", JSON.stringify(sampleBooks));
    }

    localStorage.setItem("sampleBooksLoaded", "true");
}



// DASHBOARD STATISTICS

function loadDashboard() {

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const total = books.reduce((sum, book) => sum + Number(book.quantity), 0);

    const available = books.reduce((sum, book) => sum + Number(book.available), 0);

    const borrowed = total - available;

    const fines = transactions.reduce((sum, transaction) => {

    const fine = transaction.status === "Borrowed"
        ? calculateFine(transaction.dueDate)
        : Number(transaction.fine || 0);

    return sum + Math.max(
        0, fine - Number(transaction.paidAmount || 0)
    );

}, 0);

    document.getElementById("totalBooks").textContent = total;
    document.getElementById("availableBooks").textContent = available;
    document.getElementById("borrowedBooks").textContent = borrowed;
    document.getElementById("totalFines").textContent = "RM " + fines.toFixed(2);

    loadCharts(available, borrowed, transactions);
}

if (document.getElementById("totalBooks") && currentStudent) {
    loadDashboard();
}



// DASHBOARD CHARTS

function loadCharts(available, borrowed, transactions) {

    if (typeof Chart === "undefined") return;

    const monthlyData = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    transactions.forEach(transaction => {

        const date = new Date(transaction.borrowDate);

        if (date.getFullYear() === currentYear) {
            monthlyData[date.getMonth()]++;
        }
    });

    // BAR CHART

    new Chart(document.getElementById("borrowingChart"), {
        type: "bar",

        data: {
            labels: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],

            datasets: [{
                label: "Books Borrowed",
                data: monthlyData,
                backgroundColor: "#8b6db7",
                borderRadius: 5
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 5,
                    ticks: { precision: 0 }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });


    // DOUGHNUT CHART

    const empty = available + borrowed === 0;

    new Chart(document.getElementById("availabilityChart"), {
        type: "doughnut",

        data: {
            labels: empty
                ? ["No Books Yet"]
                : ["Available", "Borrowed"],

            datasets: [{
                data: empty ? [1] : [available, borrowed],
                backgroundColor: empty
                    ? ["#e4e0ea"]
                    : ["#35205c", "#c9b9e3"],
                borderWidth: 0
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",

            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    enabled: !empty
                }
            }
        }
    });
}



// DISPLAY BOOK CATALOGUE

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function displayBooks() {

    const bookList = document.getElementById("bookList");

    if (!bookList) return;

    const books = JSON.parse(localStorage.getItem("books")) || [];

    const search = document.getElementById("searchBook").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;

    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search) ||
            book.isbn.toLowerCase().includes(search);

        const matchesCategory =
            category === "" || book.category === category;

        return matchesSearch && matchesCategory;
    });

    if (filteredBooks.length === 0) {
        bookList.innerHTML = `
            <div class="col-12 text-center text-muted py-5">
                <i class="bi bi-book fs-1"></i>
                <p class="mt-3">No books found.</p>
            </div>
        `;
        return;
    }

    bookList.innerHTML = filteredBooks.map(book => `

        <div class="col-sm-6 col-lg-4 col-xl-3">

            <div class="card book-card h-100">

                ${book.cover ? `
                    <img src="${escapeHTML(book.cover)}"
                        class="book-cover"
                        alt="${escapeHTML(book.title)}"
                        onerror="this.hidden=true; this.nextElementSibling.hidden=false">
                    <div class="book-placeholder" hidden>
                        <i class="bi bi-book"></i>
                    </div>
                ` : `
                    <div class="book-placeholder">
                        <i class="bi bi-book"></i>
                    </div>
                `}

                <div class="card-body d-flex flex-column">

                    <span class="book-category">
                        ${escapeHTML(book.category)}
                    </span>

                    <h6 class="fw-semibold mt-2">
                        ${escapeHTML(book.title)}
                    </h6>

                    <p class="text-muted small mb-2">
                        ${escapeHTML(book.author)}
                    </p>

                    <p class="small mb-1">
                        ISBN: ${escapeHTML(book.isbn)}
                    </p>

                    <p class="small text-muted">
                        Shelf: ${escapeHTML(book.location)}
                    </p>

                    <div class="mb-3">

                        <span class="badge ${book.available > 0
                            ? "text-bg-success"
                            : "text-bg-danger"}">

                            ${Number(book.available)} / ${Number(book.quantity)} Available

                        </span>

                    </div>
                    
                    <div class="d-flex gap-2 mt-auto">
                <button class="btn btn-outline-secondary btn-sm w-50"
                        onclick="editBook('${escapeHTML(book.id)}')">
                    <i class="bi bi-pencil"></i> Edit
                    </button>
                    
                    <button class="btn btn-outline-danger btn-sm w-50"
                    onclick="deleteBook('${escapeHTML(book.id)}')">
                    <i class="bi bi-trash"></i> Delete
                    </button>
                    
                    </div>

                </div>

            </div>

        </div>

    `).join("");
}


// SEARCH AND CATEGORY FILTER

const searchBook = document.getElementById("searchBook");
const categoryFilter = document.getElementById("categoryFilter");

if (searchBook && categoryFilter && currentStudent) {

    displayBooks();

    searchBook.addEventListener("input", displayBooks);

    categoryFilter.addEventListener("change", displayBooks);
}



// ADD BOOK FORM

const addBookBtn = document.getElementById("addBookBtn");
const bookForm = document.getElementById("bookForm");
const bookCover = document.getElementById("bookCover");
const coverPreview = document.getElementById("coverPreview");

let selectedCover = "";

if (addBookBtn) {

    addBookBtn.addEventListener("click", function () {

        bookForm.reset();

        document.getElementById("bookId").value = "";
        document.getElementById("modalTitle").textContent = "Add New Book";

        selectedCover = "";

        coverPreview.removeAttribute("src");
        coverPreview.classList.add("d-none");

    });
}



// BOOK COVER UPLOAD

if (bookCover) {

    bookCover.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please select a JPG, PNG or WEBP image.");
            this.value = "";
            return;
        }

        if (file.size > 500 * 1024) {
            alert("Book cover must be smaller than 500 KB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            selectedCover = event.target.result;

            coverPreview.src = selectedCover;
            coverPreview.classList.remove("d-none");

        };

        reader.readAsDataURL(file);

    });
}




// SAVE AND UPDATE BOOK

if (bookForm) {

    bookForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const books = JSON.parse(localStorage.getItem("books")) || [];

        const id = document.getElementById("bookId").value;
        const title = document.getElementById("bookTitle").value.trim();
        const author = document.getElementById("bookAuthor").value.trim();
        const isbn = document.getElementById("bookISBN").value.trim();
        const category = document.getElementById("bookCategory").value;
        const location = document.getElementById("bookLocation").value.trim();
        const quantity = Number(document.getElementById("bookQuantity").value);

        if (!title || !author || !isbn || !category || !location) {
            alert("Please complete all book information.");
            return;
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

        if (books.some(book =>
            book.isbn.toLowerCase() === isbn.toLowerCase() &&
            book.id !== id)) {

            alert("This ISBN is already registered.");
            return;
        }

        const existingBook = books.find(book => book.id === id);

        const borrowed = existingBook
            ? existingBook.quantity - existingBook.available
            : 0;

        if (quantity < borrowed) {
            alert("Quantity cannot be less than borrowed copies.");
            return;
        }

        const bookData = {
            id: id || "B" + Date.now(),
            title: title,
            author: author,
            isbn: isbn,
            category: category,
            location: location,
            quantity: quantity,
            available: quantity - borrowed,
            cover: selectedCover
        };

        if (id) {

            const index = books.findIndex(book => book.id === id);

            if (index === -1) {
                alert("Book not found.");
                return;
            }

            books[index] = bookData;

        } else {

            books.push(bookData);

        }

        try {
            localStorage.setItem("books", JSON.stringify(books));
        } catch (error) {
            alert("Unable to save. Browser storage may be full.");
            return;
        }

        displayBooks();

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("bookModal")
        ).hide();

        bookForm.reset();
        selectedCover = "";

        coverPreview.removeAttribute("src");
        coverPreview.classList.add("d-none");

        alert(id
            ? "Book updated successfully!"
            : "Book added successfully!");

    });
}



// EDIT BOOK

function editBook(id) {

    const books = JSON.parse(localStorage.getItem("books")) || [];

    const book = books.find(book => book.id === id);

    if (!book) return;

    bookForm.reset();

    document.getElementById("modalTitle").textContent = "Edit Book";

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookAuthor").value = book.author;
    document.getElementById("bookISBN").value = book.isbn;
    document.getElementById("bookCategory").value = book.category;
    document.getElementById("bookLocation").value = book.location;
    document.getElementById("bookQuantity").value = book.quantity;

    selectedCover = book.cover || "";

    if (selectedCover) {

        coverPreview.src = selectedCover;
        coverPreview.classList.remove("d-none");

    } else {

        coverPreview.removeAttribute("src");
        coverPreview.classList.add("d-none");

    }

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("bookModal")
    ).show();
}


// DELETE BOOK

function deleteBook(id) {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const book = books.find(book => book.id === id);

    if (!book) return;

    if (book.quantity !== book.available) {

        alert("Cannot delete this book because some copies are currently borrowed.");
        return;

    }

    const confirmed = confirm(
        'Are you sure you want to delete "' + book.title + '"?'
    );

    if (confirmed) {

        books = books.filter(book => book.id !== id);

        localStorage.setItem("books", JSON.stringify(books));

        displayBooks();

        alert("Book deleted successfully!");

    }
}



// BORROWING STUDENT DETAILS AND DATES

const borrowForm = document.getElementById("borrowForm");

function localDate(date = new Date()) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function loadBorrowingDetails() {

    if (!borrowForm || !currentStudent) return;

    document.getElementById("borrowStudentName").value =
        currentStudent.name;

    document.getElementById("borrowStudentId").value =
        currentStudent.studentId;

    const today = new Date();
    const dueDate = new Date(today);

    dueDate.setDate(dueDate.getDate() + 14);

    document.getElementById("borrowDate").value =
        localDate(today);

    document.getElementById("dueDate").value =
        localDate(dueDate);
}



// LOAD AVAILABLE BOOKS

function loadAvailableBooks() {

    const borrowBook = document.getElementById("borrowBook");

    if (!borrowBook) return;

    const books = JSON.parse(localStorage.getItem("books")) || [];

    const availableBooks = books.filter(book => book.available > 0);

    borrowBook.innerHTML =
        '<option value="">Choose a book...</option>';

    availableBooks.forEach(book => {

        const option = document.createElement("option");

        option.value = book.id;
        option.textContent =
            `${book.title} (${book.available} available)`;

        borrowBook.appendChild(option);

    });

}



// SELECTED BOOK PREVIEW

const borrowBookSelect = document.getElementById("borrowBook");

if (borrowBookSelect) {

    borrowBookSelect.addEventListener("change", function () {

        const books = JSON.parse(localStorage.getItem("books")) || [];

        const book = books.find(book => book.id === this.value);

        const preview = document.getElementById("borrowBookPreview");
        const cover = document.getElementById("borrowCover");

        if (!book) {

            preview.classList.add("d-none");
            return;

        }

        cover.onerror = function () {
            cover.classList.add("d-none");
        };

        if (book.cover) {
            cover.classList.remove("d-none");
            cover.src = book.cover;
        } else {
            cover.classList.add("d-none");
        }

        document.getElementById("selectedBookTitle").textContent =
            book.title;

        document.getElementById("selectedBookAuthor").textContent =
            book.author;

        document.getElementById("selectedBookStock").textContent =
            book.available + " copies available";

        preview.classList.remove("d-none");

    });
}



// CONFIRM BOOK BORROWING

if (borrowForm && currentStudent) {

    borrowForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        const bookId = document.getElementById("borrowBook").value;

        const book = books.find(book => book.id === bookId);

        if (!book) {
            alert("Please select a book.");
            return;
        }

        if (book.available <= 0) {
            alert("This book is currently unavailable.");
            loadAvailableBooks();
            return;
        }

        const alreadyBorrowed = transactions.some(transaction =>

            transaction.studentId === currentStudent.studentId &&
            transaction.bookId === bookId &&
            transaction.status === "Borrowed"

        );

        if (alreadyBorrowed) {
            alert("You have already borrowed this book.");
            return;
        }

        const confirmed = confirm(
            'Do you want to borrow "' + book.title + '"?'
        );

        if (!confirmed) return;

        loadBorrowingDetails();

        const transaction = {

            id: "T" + Date.now(),

            studentId: currentStudent.studentId,
            studentName: currentStudent.name,

            bookId: book.id,
            bookTitle: book.title,

            borrowDate: document.getElementById("borrowDate").value,
            dueDate: document.getElementById("dueDate").value,

            returnDate: "",
            status: "Borrowed",

            fine: 0,
            paidAmount: 0

        };

        const oldBooks = JSON.stringify(books);
        const oldTransactions = JSON.stringify(transactions);

        book.available--;
        transactions.push(transaction);

        try {

            localStorage.setItem("books", JSON.stringify(books));
            localStorage.setItem(
                "transactions", JSON.stringify(transactions)
            );

        } catch (error) {

            localStorage.setItem("books", oldBooks);
            localStorage.setItem("transactions", oldTransactions);

            alert("Unable to save the borrowing transaction.");
            return;

        }

        borrowForm.reset();

        document.getElementById("borrowBookPreview")
            .classList.add("d-none");

        loadBorrowingDetails();
        loadAvailableBooks();
        loadBorrowingStatistics();
        displayBorrowedBooks();
        
        alert("Book borrowed successfully!");
    });

    loadBorrowingDetails();
    loadAvailableBooks();
}



// BORROWING STATISTICS

function loadBorrowingStatistics() {

    if (!borrowForm || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const studentTransactions = transactions.filter(transaction =>
        transaction.studentId === currentStudent.studentId
    );

    const active = studentTransactions.filter(transaction =>
        transaction.status === "Borrowed"
    );

    const returned = studentTransactions.filter(transaction =>
        transaction.status === "Returned"
    );

    const overdue = active.filter(transaction =>
        transaction.dueDate < localDate()
    );

    document.getElementById("activeLoans").textContent =
        active.length;

    document.getElementById("returnedCount").textContent =
        returned.length;

    document.getElementById("overdueCount").textContent =
        overdue.length;
}

if (borrowForm && currentStudent) {
    loadBorrowingStatistics();
}



// CALCULATE OVERDUE FINE

function calculateFine(dueDate, returnDate = localDate()) {

    const due = new Date(dueDate);
    const returned = new Date(returnDate);

    const daysLate = Math.max(0,
        Math.floor((returned - due) / 86400000)
    );

    return daysLate * 0.50;
}



// DISPLAY BORROWED BOOKS

function displayBorrowedBooks() {

    const borrowedBookList =
        document.getElementById("borrowedBookList");

    if (!borrowedBookList || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const books =
        JSON.parse(localStorage.getItem("books")) || [];

    const borrowedBooks = transactions.filter(transaction =>

        transaction.studentId === currentStudent.studentId &&
        transaction.status === "Borrowed"

    );

    if (borrowedBooks.length === 0) {

        borrowedBookList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    No borrowed books yet.
                </td>
            </tr>
        `;

        return;
    }

    borrowedBookList.innerHTML = borrowedBooks.map(transaction => {

        const book = books.find(book =>
            book.id === transaction.bookId
        );

        const fine = calculateFine(transaction.dueDate);
        const overdue = fine > 0;

        return `

            <tr>

                <td>

                    <div class="d-flex align-items-center gap-2">

                        ${book && book.cover ? `
                            <img src="${escapeHTML(book.cover)}"
                                width="40"
                                class="rounded"
                                alt="Book cover"
                                onerror="this.hidden=true">
                        ` : `
                            <i class="bi bi-book fs-3 text-purple"></i>
                        `}

                        <span class="fw-medium small">
                            ${escapeHTML(transaction.bookTitle)}
                        </span>

                    </div>

                </td>

                <td>${escapeHTML(transaction.borrowDate)}</td>

                <td>${escapeHTML(transaction.dueDate)}</td>

                <td>

                    <span class="badge ${overdue
                        ? "text-bg-danger"
                        : "text-bg-success"}">

                        ${overdue ? "Overdue" : "Borrowed"}

                    </span>

                </td>

                <td class="${overdue ? "text-danger" : ""}">

                    RM ${fine.toFixed(2)}

                </td>

                <td>

                    <button class="btn btn-outline-secondary btn-sm"
                        onclick="returnBook('${escapeHTML(transaction.id)}')">

                        <i class="bi bi-arrow-return-left"></i>
                        Return

                    </button>

                </td>

            </tr>

        `;

    }).join("");
}

if (borrowForm && currentStudent) {
    displayBorrowedBooks();
}



// RETURN BOOK

function returnBook(id) {

    if (!currentStudent) return;

    const books =
        JSON.parse(localStorage.getItem("books")) || [];

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const transaction = transactions.find(transaction =>

        transaction.id === id &&
        transaction.studentId === currentStudent.studentId &&
        transaction.status === "Borrowed"

    );

    if (!transaction) return;

    const book = books.find(book =>
        book.id === transaction.bookId
    );

    if (!book || book.available >= book.quantity) {
        alert("Unable to return this book. Please check the book record.");
        return;
    }

    const confirmed = confirm(
        'Do you want to return "' + transaction.bookTitle + '"?'
    );

    if (!confirmed) return;

    const oldBooks = JSON.stringify(books);
    const oldTransactions = JSON.stringify(transactions);

    const returnDate = localDate();
    const fine = calculateFine(transaction.dueDate, returnDate);

    transaction.returnDate = returnDate;
    transaction.status = "Returned";
    transaction.fine = fine;

    book.available++;

    try {

        localStorage.setItem("books", JSON.stringify(books));

        localStorage.setItem(
            "transactions", JSON.stringify(transactions)
        );

    } catch (error) {

        localStorage.setItem("books", oldBooks);
        localStorage.setItem("transactions", oldTransactions);

        alert("Unable to save the return transaction.");
        return;
    }

    loadAvailableBooks();
    loadBorrowingStatistics();
    displayBorrowedBooks();

    document.getElementById("borrowBookPreview")
        .classList.add("d-none");

    if (fine > 0) {

        alert(
            "Book returned successfully!\n" +
            "Outstanding fine: RM " + fine.toFixed(2)
        );

    } else {

        alert("Book returned successfully! No overdue fine.");

    }
}



// TRANSACTION HISTORY STATISTICS

function loadHistoryStatistics() {

    if (!document.getElementById("historyTotal") || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const studentTransactions = transactions.filter(transaction =>
        transaction.studentId === currentStudent.studentId
    );

    const returned = studentTransactions.filter(transaction =>
        transaction.status === "Returned"
    );

    const active = studentTransactions.filter(transaction =>
        transaction.status === "Borrowed"
    );

    document.getElementById("historyTotal").textContent =
        studentTransactions.length;

    document.getElementById("historyReturned").textContent =
        returned.length;

    document.getElementById("historyActive").textContent =
        active.length;
}


// GET TRANSACTION STATUS

function getTransactionStatus(transaction) {

    if (transaction.status === "Returned") {
        return "Returned";
    }

    if (transaction.dueDate < localDate()) {
        return "Overdue";
    }

    return "Borrowed";
}


// DISPLAY TRANSACTION HISTORY

function displayHistory() {

    const historyList = document.getElementById("historyList");

    if (!historyList || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const search = document.getElementById("searchHistory")
        .value.trim().toLowerCase();

    const filter = document.getElementById("historyFilter").value;

    const studentTransactions = transactions.filter(transaction =>
        transaction.studentId === currentStudent.studentId
    );

    const filteredTransactions = studentTransactions.filter(transaction => {

        const status = getTransactionStatus(transaction);

        const matchesSearch =
            transaction.bookTitle.toLowerCase().includes(search) ||
            transaction.id.toLowerCase().includes(search);

        const matchesStatus =
            filter === "" || status === filter;

        return matchesSearch && matchesStatus;

    });

    document.getElementById("historyRecordCount").textContent =
        `Showing ${filteredTransactions.length} of ${studentTransactions.length} transactions`;

    if (filteredTransactions.length === 0) {

        historyList.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-5">

                    <i class="bi bi-clock-history fs-2"></i>

                    <p class="mt-2 mb-0">
                        No transactions found.
                    </p>

                </td>
            </tr>
        `;

        return;
    }

    historyList.innerHTML = filteredTransactions.reverse()
        .map(transaction => {

            const status = getTransactionStatus(transaction);

            const fine = transaction.status === "Returned"
                ? Number(transaction.fine || 0)
                : calculateFine(transaction.dueDate);

            const outstandingFine = Math.max(
                0, fine - Number(transaction.paidAmount || 0)
            );

            const badgeColor = status === "Returned"
                ? "success"
                : status === "Overdue"
                ? "danger"
                : "primary";

            return `

                <tr>

                    <td class="small text-muted">
                        ${escapeHTML(transaction.id)}
                    </td>

                    <td class="fw-medium small">
                        ${escapeHTML(transaction.bookTitle)}
                    </td>

                    <td>
                        ${escapeHTML(transaction.borrowDate)}
                    </td>

                    <td>
                        ${escapeHTML(transaction.dueDate)}
                    </td>

                    <td>
                        ${escapeHTML(transaction.returnDate || "-")}
                    </td>

                    <td>
                        <span class="badge text-bg-${badgeColor}">
                            ${status}
                        </span>
                    </td>

                    <td class="${outstandingFine > 0 ? "text-danger" : ""}">
                        ${outstandingFine.toFixed(2)}
                    </td>

                </tr>

            `;

        }).join("");
}


// TRANSACTION HISTORY SEARCH AND FILTER

const searchHistory = document.getElementById("searchHistory");
const historyFilter = document.getElementById("historyFilter");

if (searchHistory && historyFilter && currentStudent) {

    loadHistoryStatistics();
    displayHistory();

    searchHistory.addEventListener("input", displayHistory);

    historyFilter.addEventListener("change", displayHistory);

}


// PAYMENT STATISTICS

function getFineAmount(transaction) {

    return transaction.status === "Returned"
        ? Number(transaction.fine || 0)
        : calculateFine(transaction.dueDate);
}

function getOutstandingFine(transaction) {

    return Math.max(
        0,
        getFineAmount(transaction) -
        Number(transaction.paidAmount || 0)
    );
}

function loadPaymentStatistics() {

    if (!document.getElementById("paymentTotalFines") ||
        !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const studentTransactions = transactions.filter(transaction =>
        transaction.studentId === currentStudent.studentId
    );

    const totalFines = studentTransactions.reduce(
        (sum, transaction) => sum + getFineAmount(transaction), 0
    );

    const totalPaid = studentTransactions.reduce(
        (sum, transaction) =>
            sum + Number(transaction.paidAmount || 0), 0
    );

    const outstanding = studentTransactions.reduce(
        (sum, transaction) => sum + getOutstandingFine(transaction), 0
    );

    document.getElementById("paymentTotalFines").textContent =
        "RM " + totalFines.toFixed(2);

    document.getElementById("paymentTotalPaid").textContent =
        "RM " + totalPaid.toFixed(2);

    document.getElementById("paymentOutstanding").textContent =
        "RM " + outstanding.toFixed(2);
}


// DISPLAY OUTSTANDING FINES

function displayFines() {

    const fineList = document.getElementById("fineList");

    if (!fineList || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const fines = transactions.filter(transaction =>

        transaction.studentId === currentStudent.studentId &&
        getOutstandingFine(transaction) > 0

    );

    if (fines.length === 0) {

        fineList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-5">

                    <i class="bi bi-check-circle fs-2 text-success"></i>

                    <p class="mt-2 mb-0">
                        No outstanding fines.
                    </p>

                </td>
            </tr>
        `;

        return;
    }

    fineList.innerHTML = fines.map(transaction => {

        const fine = getOutstandingFine(transaction);
        const daysLate = getFineAmount(transaction) / 0.50;

        const returned = transaction.status === "Returned";

        return `

            <tr>

                <td class="fw-medium small">
                    ${escapeHTML(transaction.bookTitle)}
                </td>

                <td>
                    ${escapeHTML(transaction.dueDate)}
                </td>

                <td>
                    ${daysLate} days
                </td>

                <td class="text-danger fw-semibold">
                    RM ${fine.toFixed(2)}
                </td>

                <td>
                    <span class="badge text-bg-danger">
                        ${returned ? "Unpaid" : "Overdue"}
                    </span>
                </td>

                <td>

                    ${returned ? `

                        <button class="btn btn-primary btn-sm"
                            onclick="openPayment('${escapeHTML(transaction.id)}')">

                            <i class="bi bi-wallet2"></i>
                            Pay Now

                        </button>

                    ` : `

                        <a href="borrowing.html"
                            class="btn btn-outline-secondary btn-sm">

                            Return First

                        </a>

                    `}

                </td>

            </tr>

        `;

    }).join("");
}


// OPEN PAYMENT MODAL

const paymentForm = document.getElementById("paymentForm");

function openPayment(id) {

    if (!paymentForm || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const transaction = transactions.find(transaction =>

        transaction.id === id &&
        transaction.studentId === currentStudent.studentId &&
        transaction.status === "Returned"

    );

    if (!transaction) return;

    const amount = getOutstandingFine(transaction);

    if (amount <= 0) {
        alert("This fine has already been paid.");
        return;
    }

    paymentForm.reset();

    document.getElementById("paymentTransactionId").value =
        transaction.id;

    document.getElementById("paymentBookTitle").value =
        transaction.bookTitle;

    document.getElementById("paymentAmount").textContent =
        "RM " + amount.toFixed(2);

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("paymentModal")
    ).show();
}


// CONFIRM PAYMENT

if (paymentForm && currentStudent) {

    paymentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        const payments =
            JSON.parse(localStorage.getItem("payments")) || [];

        const id =
            document.getElementById("paymentTransactionId").value;

        const method = document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        const transaction = transactions.find(transaction =>

            transaction.id === id &&
            transaction.studentId === currentStudent.studentId &&
            transaction.status === "Returned"

        );

        if (!transaction) return;

        const amount = getOutstandingFine(transaction);

        if (amount <= 0) {
            alert("This fine has already been paid.");
            return;
        }

        const confirmed = confirm(
            "Confirm simulated payment of RM " + amount.toFixed(2) + "?"
        );

        if (!confirmed) return;

        const oldTransactions = JSON.stringify(transactions);
        const oldPayments = JSON.stringify(payments);

        const payment = {

            id: "P" + Date.now(),

            transactionId: transaction.id,

            studentId: currentStudent.studentId,

            bookTitle: transaction.bookTitle,

            paymentDate: localDate(),

            paymentMethod: method.value,

            amount: amount,

            status: "Paid"

        };

        transaction.paidAmount =
            Number(transaction.paidAmount || 0) + amount;

        payments.push(payment);

        try {

            localStorage.setItem(
                "transactions", JSON.stringify(transactions)
            );

            localStorage.setItem(
                "payments", JSON.stringify(payments)
            );

        } catch (error) {

            localStorage.setItem("transactions", oldTransactions);
            localStorage.setItem("payments", oldPayments);

            alert("Unable to save payment.");
            return;
        }

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("paymentModal")
        ).hide();

        paymentForm.reset();

        loadPaymentStatistics();
        displayFines();
        displayPaymentHistory();

        alert(
            "Payment successful!\n" +
            "Payment ID: " + payment.id + "\n" +
            "Amount Paid: RM " + amount.toFixed(2)
        );

    });
}


// DISPLAY PAYMENT HISTORY

function displayPaymentHistory() {

    const paymentHistoryList =
        document.getElementById("paymentHistoryList");

    if (!paymentHistoryList || !currentStudent) return;

    const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

    const studentPayments = payments.filter(payment =>
        payment.studentId === currentStudent.studentId
    );

    if (studentPayments.length === 0) {

        paymentHistoryList.innerHTML = `

            <tr>
                <td colspan="6"
                    class="text-center text-muted py-5">

                    <i class="bi bi-receipt fs-2"></i>

                    <p class="mt-2 mb-0">
                        No payment records yet.
                    </p>

                </td>
            </tr>

        `;

        return;
    }

    paymentHistoryList.innerHTML = studentPayments.reverse()
        .map(payment => `

            <tr>

                <td class="text-muted small">
                    ${escapeHTML(payment.id)}
                </td>

                <td class="fw-medium small">
                    ${escapeHTML(payment.bookTitle)}
                </td>

                <td>
                    ${escapeHTML(payment.paymentDate)}
                </td>

                <td>
                    ${escapeHTML(payment.paymentMethod)}
                </td>

                <td class="text-success fw-semibold">
                    RM ${Number(payment.amount).toFixed(2)}
                </td>

                <td>
                    <span class="badge text-bg-success">
                        Paid
                    </span>
                </td>

            </tr>

        `).join("");
}


// DISPLAY PAYMENT HISTORY

function displayPaymentHistory() {

    const paymentHistoryList =
        document.getElementById("paymentHistoryList");

    if (!paymentHistoryList || !currentStudent) return;

    const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

    const studentPayments = payments.filter(payment =>
        payment.studentId === currentStudent.studentId
    );

    if (studentPayments.length === 0) {

        paymentHistoryList.innerHTML = `

            <tr>
                <td colspan="6"
                    class="text-center text-muted py-5">

                    <i class="bi bi-receipt fs-2"></i>

                    <p class="mt-2 mb-0">
                        No payment records yet.
                    </p>

                </td>
            </tr>

        `;

        return;
    }

    paymentHistoryList.innerHTML = studentPayments.reverse()
        .map(payment => `

            <tr>

                <td class="text-muted small">
                    ${escapeHTML(payment.id)}
                </td>

                <td class="fw-medium small">
                    ${escapeHTML(payment.bookTitle)}
                </td>

                <td>
                    ${escapeHTML(payment.paymentDate)}
                </td>

                <td>
                    ${escapeHTML(payment.paymentMethod)}
                </td>

                <td class="text-success fw-semibold">
                    RM ${Number(payment.amount).toFixed(2)}
                </td>

                <td>
                    <span class="badge text-bg-success">
                        Paid
                    </span>
                </td>

            </tr>

        `).join("");
}


// LOAD STUDENT PROFILE

const profileForm = document.getElementById("profileForm");

function loadProfile() {

    if (!profileForm || !currentStudent) return;

    const students =
        JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(student =>
        student.studentId === currentStudent.studentId
    );

    if (!student) return;

    document.getElementById("profileName").value =
        student.name;

    document.getElementById("profileStudentId").value =
        student.studentId;

    document.getElementById("profileEmail").value =
        student.email;

    document.getElementById("profileFaculty").value =
        student.faculty || "";

    document.getElementById("profileProgramme").value =
        student.programme || "";

    document.getElementById("profileDisplayName").textContent =
        student.name;

    document.getElementById("profileDisplayId").textContent =
        student.studentId;

    const initials = student.name.trim().split(/\s+/)
        .slice(0, 2)
        .map(name => name.charAt(0))
        .join("")
        .toUpperCase();

    document.getElementById("profileAvatar").textContent =
        initials;

    document.getElementById("headerName").textContent =
        student.name;
}


// PROFILE STATISTICS

function loadProfileStatistics() {

    if (!profileForm || !currentStudent) return;

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const studentTransactions = transactions.filter(transaction =>
        transaction.studentId === currentStudent.studentId
    );

    const returned = studentTransactions.filter(transaction =>
        transaction.status === "Returned"
    );

    const outstanding = studentTransactions.reduce(
        (sum, transaction) =>
            sum + getOutstandingFine(transaction), 0
    );

    document.getElementById("profileBorrowed").textContent =
        studentTransactions.length;

    document.getElementById("profileReturned").textContent =
        returned.length;

    document.getElementById("profileFines").textContent =
        "RM " + outstanding.toFixed(2);
}


// UPDATE STUDENT PROFILE

if (profileForm && currentStudent) {

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const students =
            JSON.parse(localStorage.getItem("students")) || [];

        const student = students.find(student =>
            student.studentId === currentStudent.studentId
        );

        if (!student) return;

        const name = document.getElementById("profileName")
            .value.trim();

        const email = document.getElementById("profileEmail")
            .value.trim().toLowerCase();

        const faculty = document.getElementById("profileFaculty")
            .value.trim();

        const programme = document.getElementById("profileProgramme")
            .value.trim();

        const success = document.getElementById("profileSuccess");
        const error = document.getElementById("profileError");

        success.classList.add("d-none");
        error.classList.add("d-none");

        if (!name || !email || !faculty || !programme) {

            error.textContent = "Please complete all fields.";
            error.classList.remove("d-none");
            return;

        }

        const duplicateEmail = students.some(student =>

            student.email.toLowerCase() === email &&
            student.studentId !== currentStudent.studentId

        );

        if (duplicateEmail) {

            error.textContent = "This email is already registered.";
            error.classList.remove("d-none");
            return;

        }

        student.name = name;
        student.email = email;
        student.faculty = faculty;
        student.programme = programme;

        localStorage.setItem(
            "students", JSON.stringify(students)
        );

        const { password, ...updatedStudent } = student;

        localStorage.setItem(
            "currentStudent", JSON.stringify(updatedStudent)
        );

        Object.assign(currentStudent, updatedStudent);

        loadProfile();

        success.textContent = "Profile updated successfully!";
        success.classList.remove("d-none");

    });
}


// CHANGE STUDENT PASSWORD

const changePasswordForm =
    document.getElementById("changePasswordForm");

if (changePasswordForm && currentStudent) {

    changePasswordForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const students =
            JSON.parse(localStorage.getItem("students")) || [];

        const student = students.find(student =>
            student.studentId === currentStudent.studentId
        );

        if (!student) return;

        const oldPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmNewPassword").value;

        const success =
            document.getElementById("passwordSuccess");

        const error =
            document.getElementById("passwordError");

        success.classList.add("d-none");
        error.classList.add("d-none");

        if (student.password !== oldPassword) {

            error.textContent = "Current password is incorrect.";

        } else if (newPassword.length < 6) {

            error.textContent =
                "New password must contain at least 6 characters.";

        } else if (newPassword !== confirmPassword) {

            error.textContent = "New passwords do not match.";

        } else if (newPassword === oldPassword) {

            error.textContent =
                "New password must be different from current password.";

        } else {

            student.password = newPassword;

            localStorage.setItem(
                "students", JSON.stringify(students)
            );

            changePasswordForm.reset();

            success.textContent = "Password updated successfully!";
            success.classList.remove("d-none");

            return;

        }

        error.classList.remove("d-none");

    });
}


// INITIALIZE PROFILE PAGE

if (profileForm && currentStudent) {

    loadProfile();
    loadProfileStatistics();

}
