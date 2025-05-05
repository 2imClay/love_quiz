let questions = [
  {//x
    question: "Tụi mình gặp nhau lần đầu ở đâu?",
    answers: ["Trường học", "Quán trà sữa", "Công viên", "Trên mạng"],
    correct: 1
  },
  {
    question: "Ai là người nhắn tin trước?",
    answers: ["Anh", "Em", "Cùng lúc", "Không nhớ"],
    correct: 1
  },
  {//x
    question: "Kỷ niệm nào vui nhất với tụi mình?",
    answers: ["Đi chơi Đà Lạt", "Xem phim lần đầu", "Lễ Valentine", "Sinh nhật bạn"],
    correct: 2
  },
  {//v
    question: "Món ăn tụi mình hay ăn chung nhất là gì?",
    answers: ["Lẩu", "Gà rán", "Bún bò", "Bánh tráng trộn"],
    correct: 1
  },
  {//v
    question: "Lần đầu nắm tay là ở đâu?",
    answers: ["Công viên", "Rạp chiếu phim", "Trường học", "Trên xe buýt"],
    correct: 0
  },
  {//v
    question: "Bộ phim đầu tiên tụi mình xem cùng nhau là gì?",
    answers: ["Your Name", "Avengers", "Titanic", "Em và Trịnh"],
    correct: 3
  },
  {
    question: "Ai hay giận dỗi hơn?",
    answers: ["Anh", "Em", "Cả hai", "Không ai cả"],
    correct: 1
  },
  {//v
    question: "Ngày đặc biệt của tụi mình là ngày nào?",
    answers: ["14/2", "1/6", "20/10", "Ngày yêu nhau"],
    correct: 3
  },
  {
    question: "Lần đầu anh tặng quà cho em là dịp nào?",
    answers: ["Noel", "Valentine", "Sinh nhật", "Lễ 8/3"],
    correct: 2
  },
  {//x
    question: "Bài hát tụi mình hay nghe chung là gì?",
    answers: ["3107", "Một nhà", "Yêu lại từ đầu", "Tháng tư là lời nói dối của em"],
    correct: 0
  },
  {//x
    question: "Điều bạn thích nhất ở mình là gì?",
    answers: ["Nụ cười", "Giọng nói", "Chiều cao", "Tính cách"],
    correct: 3
  },
  {
    question: "Ai là người thường trễ hẹn hơn?",
    answers: ["Anh", "Em", "Cả hai", "Không ai cả"],
    correct: 0
  },
  {
    question: "Chuyến đi xa đầu tiên của tụi mình là ở đâu?",
    answers: ["Đà Lạt", "Nha Trang", "Phan Thiết", "Vũng Tàu"],
    correct: 1
  },
  {
    question: "Tụi mình yêu nhau bao lâu rồi?",
    answers: ["Dưới 1 năm", "1-2 năm", "2-3 năm", "Hơn 3 năm"],
    correct: 3
  },
  {
    question: "Thú cưng anh yêu thích nhất là gì?",
    answers: ["Chó", "Mèo", "Hamster", "Thỏ"],
    correct: 0
  },
  {
    question: "Điều anh hay làm khi giận là gì?",
    answers: ["Im lặng", "Khóc", "Bỏ đi", "Làm mặt lạnh"],
    correct: 0
  },
  {
    question: "Ai hay pha trò để dỗ người kia?",
    answers: ["Anh", "Em", "Không ai", "Tùy lúc"],
    correct: 0
  },
  {
    question: "Tụi mình thường đi chơi vào thời gian nào?",
    answers: ["Cuối tuần", "Ngày lễ", "Ngày thường", "Lúc rảnh"],
    correct: 3
  },
  {
    question: "Mình từng lỡ quên ngày gì quan trọng?",
    answers: ["Sinh nhật bạn", "Ngày yêu nhau", "Valentine", "Không bao giờ quên"],
    correct: 3
  },
  {
    question: "Tụi mình thường gọi nhau bằng gì?",
    answers: ["Tên thật", "Biệt danh", "Anh/Em", "Ông/Bà"],
    correct: 1
  }
];


let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

window.onload = () => {
  showQuestion();
};

function showQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionElement.innerText = q.question;
  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, index));
    answerButtons.appendChild(button);
    // Hiệu ứng xuất hiện
    button.style.opacity = 0;
    setTimeout(() => {
      button.style.transition = "opacity 0.4s ease";
      button.style.opacity = 1;
    }, 50 * index);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(selectedButton, selectedIndex) {
  const correctIndex = questions[currentQuestion].correct;
  const allButtons = answerButtons.querySelectorAll("button");

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.style.backgroundColor = "#d4edda";
      btn.style.borderColor = "#28a745";
    }
    if (btn === selectedButton) {
      btn.style.borderWidth = "3px";
      btn.style.borderColor = "#ff66a3";
      if (selectedIndex === correctIndex) {
        score++;
      } else {
        btn.style.backgroundColor = "#f8d7da";
        btn.style.borderColor = "#dc3545";
      }
    }
  });

  userAnswers[currentQuestion] = selectedButton.innerText;
  nextButton.style.display = "block";
  nextButton.classList.add("pulse");
  setTimeout(() => nextButton.classList.remove("pulse"), 800);
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("answers", JSON.stringify(userAnswers));
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
});
