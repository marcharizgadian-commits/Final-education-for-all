/* --------------------------
   ACTION BUTTONS OUTPUT
---------------------------*/
function showAction(type) {
    const output = document.getElementById("action-output");

    let text = "";

    if (type === 1) {
        text = `
            <h3>Actions for Individuals</h3>
            <ul>
                <li>Support local schools with volunteer work.</li>
                <li>Donate books or educational materials.</li>
                <li>Encourage lifelong learning.</li>
            </ul>
        `;
    }
    else if (type === 2) {
        text = `
            <h3>Actions for Schools</h3>
            <ul>
                <li>Promote inclusive learning spaces.</li>
                <li>Train teachers effectively.</li>
                <li>Use digital tools for learning.</li>
            </ul>
        `;
    }
    else if (type === 3) {
        text = `
            <h3>Actions for Communities</h3>
            <ul>
                <li>Organize reading programs.</li>
                <li>Build safe learning centers.</li>
                <li>Support marginalized learners.</li>
            </ul>
        `;
    }

    output.innerHTML = text;
}


/* --------------------------
     IMAGE ZOOM MODAL
---------------------------*/
const modal = document.getElementById("zoomModal");
const modalImg = document.getElementById("zoomImage");
const images = document.querySelectorAll(".zoomable");
const closeBtn = document.querySelector(".close");

if (images) {
    images.forEach(img => {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        };
    });
}

if (closeBtn) {
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
}

if (modal) {
    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };
}


/* --------------------------
         DARK MODE
---------------------------*/
const toggle = document.getElementById("theme-toggle");
const body = document.body;

if (toggle) {
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save theme
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}


/* --------------------------
        QUIZ SYSTEM
---------------------------*/
const quizData = [
    {
        question: "What does Quality Education aim to provide?",
        options: [
            "Only books and classrooms",
            "Skills, knowledge, and equal learning opportunities",
            "Free gadgets for all students",
            "Only online learning"
        ],
        answer: 1
    },
    {
        question: "Which group often struggles to access quality education?",
        options: [
            "Children with disabilities",
            "Celebrities",
            "Professional athletes",
            "Office workers"
        ],
        answer: 0
    },
    {
        question: "What is one way to help improve education?",
        options: [
            "Ignore school problems",
            "Donate books or volunteer",
            "Discourage students",
            "Close schools"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("quiz-score");

loadQuiz();

function loadQuiz() {
    let q = quizData[currentQuestion];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "btn quiz-btn";
        btn.onclick = () => selectAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selected) {
    let correct = quizData[currentQuestion].answer;

    if (selected === correct) {
        score++;
    }

    document.querySelectorAll(".quiz-btn").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
    });

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        nextBtn.style.display = "none";
        loadQuiz();
    } else {
        showScore();
    }
};

function showScore() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}
