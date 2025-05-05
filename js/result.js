window.onload = function () {
    const resultContainer = document.querySelector(".result-container");
  
    const score = localStorage.getItem("score") || 0;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
  
    document.getElementById("score-text").innerText = `Bé đã trả lời đúng ${score} / ${questions.length} câu hỏi ❤️`;
  
    const answerList = document.getElementById("answer-list");
    answerList.style.listStyleType = "none";
    answerList.style.paddingLeft = "0";
  
    questions.forEach((q, index) => {

        let listItem = document.createElement("li");
        let questionText = `Câu ${index + 1}: ${q.question} `;
    
        if (answers[index] == q.answers[q.correct]) {
          listItem.innerHTML = `<span class="answer-correct">${questionText} - Đúng</span>`;
        } else {
          listItem.innerHTML = `
            <span class="answer-wrong">${questionText}<br><em>Bé chọn:</em> ${answers[index] || "(không có câu trả lời)"} - Sai</span>
            <span class="correct-answer">(Đáp án đúng: ${q.answers[q.correct]})</span>
          `;
        }

        answerList.appendChild(listItem);
      });
      // custom send to mail 

      let correctCount = 0;
      let resultDetails = "📌 Kết quả trắc nghiệm tình yêu 💘\n\n";

      questions.forEach((q, i) => {
        const userAnswerIndex = answers[i];
        const isCorrect = userAnswerIndex === q.answers[q.correct];

        if (isCorrect) correctCount++;

        resultDetails += `Câu ${i + 1}: ${q.question}\n`;
        resultDetails += `→ Bạn chọn: ${answers[i]} ${isCorrect ? "✅" : "❌"}\n`;

        if (!isCorrect) {
          resultDetails += `→ Đáp án đúng: ${q.answers[q.correct]}\n`;
        }

        resultDetails += `\n`;
      });

      resultDetails += `👉 Tổng điểm: ${correctCount}/${questions.length}`;
      var total = score + '/' + questions.length;
      sendResultToEmail(resultDetails);
  };


  function back(){
    localStorage.clear();
    window.location.href = "index.html";
  }
  
  function sendResultToEmail(score) {
    emailjs.send("service_nz8hd98", "template_ijf66hd", {
      score: score
    }).then(
      () => console.log("✅ Email sent!"),
      (error) => console.error("❌ Failed to send email:", error)
    );
  }
  