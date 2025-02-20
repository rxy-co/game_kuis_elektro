document.addEventListener("DOMContentLoaded", () => {
    const questionBox = document.querySelector(".question-box");
    const optionsBox = document.querySelector(".options-box");
    const imageBox = document.querySelector(".question-image"); // Tambahan untuk gambar pertanyaan

    // Tambahkan elemen audio
    const bgMusic = new Audio("backsound.mp3");
    const correctSound = new Audio("correct.mp3");
    const wrongSound = new Audio("wrong.mp3");

    // Looping backsound agar terus bermain
    bgMusic.loop = true;
    bgMusic.volume = 0.5; // Volume 50%

    // Play backsound saat halaman kuis dimulai
    document.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
        }
    }, { once: true });

    // Daftar pertanyaan dengan tambahan gambar
    const questions = [
        { 
            question: "Apa warna gelang pertama pada resistor 220Ω?", 
            options: ["Merah", "Coklat", "Hijau"], 
            answer: "Merah" 
        },
        { 
            question: "Toleransi sebesar 5% pada gelang resistor berwarna apa?", 
            options: ["Hitam", "Emas", "Perak"], 
            answer: "Emas" 
        },
        { 
            question: "'merah ; merah ; hitam ; emas, adalah resistor dengan nilai resistansi...", 
            options: ["220 ohm 5%", "2300 ohm 5%", "220 ohm 10%"], 
            answer: "220 ohm 5%" 
        },
        { 
            question: "Transistor terbagi 2 jenis, yaitu...", 
            options: ["PNN & NPP", "NPN & PNP", "NPN & PPN"], 
            answer: "NPN & PNP" 
        },
        { 
            question: "NPN adalah singkatan dari...", 
            options: ["Netral-Positif-Negatif", "Negatif-Positif-Negatif", "Neutral-Polyester-Neutral"], 
            answer: "Negatif-Positif-Negatif" 
        },
        { 
            question: "Transistor memiliki 3 pin, yaitu...", 
            options: ["Kolektor, Emitor dan Basis", "Koruptor, Emisi, dan Bansos", "Kolektor, Editor dan Basi"], 
            answer: "Kolektor, Emitor dan Basis" 
        },
        { 
            question: "Satuan dari Induktansi adalah?", 
            options: ["Henry(H)", "Farad(F)", "Ohm (Ω)"], 
            answer: "Henry(H)" 
        },
        { 
            question: "Apa fungsi utama induktor dalam rangkaian elektronik?", 
            options: ["Menyimpan energi dalam medan magnet", "Mengurangi tegangan", "Menyaring frekuensi tinggi"], 
            answer: "Menyimpan energi dalam medan magnet" 
        },
        { 
            question: "Induktor bekerja dengan konsep medan?", 
            options: ["Elektrostatis", "Magnetik", "Termal"], 
            answer: "Magnetik" 
        },
        { 
            question: "Apa fungsi utama Kapasitor dalam rangkaian Elektronika?", 
            options: ["Menghambat arus", "Menyimpan muatan listrik", "Meningkatkan tegangan"], 
            answer: "Menyimpan muatan listrik" 
        },
        { 
            question: "Satuan dari kapasitor adalah?", 
            options: ["Henry (H)", "Farad (F)", "Ohm (Ω)"], 
            answer: "Farad (F)" 
        },
        { 
            question: "Kapasitor menyimpan energi dalam bentuk?", 
            options: ["Magnetik", "Listrik", "Termal"], 
            answer: "Listrik" 
        },
        { 
            question: "IoT adalah singkatan dari?", 
            options: ["Internet on Time", "Interconection of Terminal", "Internet of Things"], 
            answer: "Internet of Things" 
        },
        { 
            question: "Apa nama komponen ini?", 
            options: ["Transistor", "Dioda", "IC"], 
            answer: "Dioda",
            image: "dioda.png"
        },
        { 
            question: "Apa nama komponen ini?",
            options: ["IC", "PCB", "Induktor"], 
            answer: "IC",
            image: "IC.png"
        }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionBox.textContent = currentQuestion.question;
        optionsBox.innerHTML = ""; // Reset opsi jawaban

        // Tampilkan gambar jika ada
        if (currentQuestion.image) {
            imageBox.src = currentQuestion.image;
            imageBox.style.display = "block";
        } else {
            imageBox.style.display = "none";
        }

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option-btn");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            optionsBox.appendChild(button);
        });
    }

    function showAlert(message, isCorrect) {
        let alertBox = document.getElementById("alertBox");
        let alertText = document.getElementById("alertText");

        alertText.innerHTML = message;

        if (isCorrect) {
            alertBox.classList.remove("alert-fail");
            alertBox.classList.add("alert-success");
        } else {
            alertBox.classList.remove("alert-success");
            alertBox.classList.add("alert-fail");
        }

        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.style.display = "none";
        }, 1500);
    }

    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.answer) {
            correctSound.play(); // Mainkan suara benar
            showAlert("Jawaban benar! 🎉", true);
            setTimeout(() => {
                nextQuestion();
            }, 1500);
        } else {
            wrongSound.play(); // Mainkan suara salah
            showAlert("Jawaban salah! ❌ GAME OVER!", false);
            setTimeout(() => {
                window.location.href = "index.html"; // Balik ke menu awal
            }, 2000);
        }
    }

    



    function showCompletionBox() {
        let completionBox = document.getElementById("completionBox");
        let completionText = document.getElementById("completionText");
    
        completionText.innerHTML = "🎉 Selamat! Kamu telah menyelesaikan kuis! 🔥 Tunggu update kuis selanjutnya!!!";
        completionBox.style.display = "flex"; // Tampilkan box
    
        setTimeout(() => {
            window.location.href = "index.html"; // Kembali ke menu setelah 3 detik
        }, 3000);
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showCompletionBox(); // Tampilkan box khusus jika kuis selesai
        }
    }
    

    loadQuestion();
});
