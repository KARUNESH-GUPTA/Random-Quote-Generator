// Flash Card Quiz App JavaScript

class FlashCardQuiz {
    constructor() {
        this.currentLanguage = 'hi';
        this.currentTheme = 'light';
        this.userName = '';
        this.selectedTopic = '';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isFlipped = false;
        this.timerEnabled = false;
        this.startTime = 0;
        this.questionStartTime = 0;
        this.timerInterval = null;
        this.soundEnabled = true;
        
        this.quizData = {
            "general": {
                "name": {"hi": "सामान्य ज्ञान", "en": "General Knowledge"},
                "questions": [
                    {
                        "type": "multiple",
                        "question": {"hi": "फ्रांस की राजधानी क्या है?", "en": "What is the capital of France?"},
                        "options": {"hi": ["लंदन", "बर्लिन", "पेरिस", "मैड्रिड"], "en": ["London", "Berlin", "Paris", "Madrid"]},
                        "correct": 2,
                        "explanation": {"hi": "पेरिस 12वीं सदी से फ्रांस की राजधानी है।", "en": "Paris has been the capital of France since the 12th century."}
                    },
                    {
                        "type": "multiple", 
                        "question": {"hi": "कौन सा ग्रह लाल ग्रह के नाम से जाना जाता है?", "en": "Which planet is known as the Red Planet?"},
                        "options": {"hi": ["शुक्र", "मंगल", "बृहस्पति", "शनि"], "en": ["Venus", "Mars", "Jupiter", "Saturn"]},
                        "correct": 1,
                        "explanation": {"hi": "मंगल ग्रह आयरन ऑक्साइड (जंग) के कारण लाल दिखता है।", "en": "Mars appears red due to iron oxide (rust) on its surface."}
                    },
                    {
                        "type": "truefalse",
                        "question": {"hi": "चीन की दीवार अंतरिक्ष से दिखाई देती है।", "en": "The Great Wall of China is visible from space."},
                        "correct": false,
                        "explanation": {"hi": "यह एक आम मिथक है। चीन की दीवार बिना सहायता के अंतरिक्ष से दिखाई नहीं देती।", "en": "This is a common myth. The Great Wall is not visible from space without aid."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "पृथ्वी पर सबसे बड़ा समुद्र कौन सा है?", "en": "What is the largest ocean on Earth?"},
                        "options": {"hi": ["अटलांटिक", "हिंद", "प्रशांत", "आर्कटिक"], "en": ["Atlantic", "Indian", "Pacific", "Arctic"]},
                        "correct": 2,
                        "explanation": {"hi": "प्रशांत महासागर लगभग 63 मिलियन वर्ग मील में फैला है।", "en": "The Pacific Ocean covers about 63 million square miles."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "पृथ्वी के वायुमंडल में कौन सी गैस सबसे अधिक है?", "en": "Which gas makes up most of Earth's atmosphere?"},
                        "options": {"hi": ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "आर्गन"], "en": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"]},
                        "correct": 1,
                        "explanation": {"hi": "नाइट्रोजन पृथ्वी के वायुमंडल का लगभग 78% हिस्सा है।", "en": "Nitrogen makes up about 78% of Earth's atmosphere."}
                    }
                ]
            },
            "science": {
                "name": {"hi": "विज्ञान और तकनीक", "en": "Science & Technology"},
                "questions": [
                    {
                        "type": "multiple",
                        "question": {"hi": "सोने का रासायनिक प्रतीक क्या है?", "en": "What is the chemical symbol for Gold?"},
                        "options": {"hi": ["Go", "Gd", "Au", "Ag"], "en": ["Go", "Gd", "Au", "Ag"]},
                        "correct": 2,
                        "explanation": {"hi": "Au लैटिन शब्द 'aurum' से आता है जिसका अर्थ सोना है।", "en": "Au comes from the Latin word 'aurum' meaning gold."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "वयस्क मानव शरीर में कितनी हड्डियां होती हैं?", "en": "How many bones are in an adult human body?"},
                        "options": {"hi": ["206", "215", "198", "220"], "en": ["206", "215", "198", "220"]},
                        "correct": 0,
                        "explanation": {"hi": "वयस्क मानव कंकाल में 206 हड्डियां होती हैं।", "en": "An adult human skeleton has 206 bones."}
                    },
                    {
                        "type": "truefalse",
                        "question": {"hi": "प्रकाश ध्वनि से तेज़ चलता है।", "en": "Light travels faster than sound."},
                        "correct": true,
                        "explanation": {"hi": "प्रकाश 299,792,458 m/s की गति से चलता है जबकि ध्वनि हवा में लगभग 343 m/s की गति से चलती है।", "en": "Light travels at 299,792,458 m/s while sound travels at about 343 m/s in air."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "कोशिका का पावरहाउस क्या है?", "en": "What is the powerhouse of the cell?"},
                        "options": {"hi": ["न्यूक्लियस", "माइटोकॉन्ड्रिया", "राइबोसोम", "क्लोरोप्लास्ट"], "en": ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"]},
                        "correct": 1,
                        "explanation": {"hi": "माइटोकॉन्ड्रिया ATP का उत्पादन करता है, जो कोशिकाओं की ऊर्जा मुद्रा है।", "en": "Mitochondria produce ATP, the energy currency of cells."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "गुइडो वैन रॉसम द्वारा कौन सी प्रोग्रामिंग भाषा विकसित की गई?", "en": "Which programming language was developed by Guido van Rossum?"},
                        "options": {"hi": ["Java", "Python", "C++", "JavaScript"], "en": ["Java", "Python", "C++", "JavaScript"]},
                        "correct": 1,
                        "explanation": {"hi": "Python को गुइडो वैन रॉसम द्वारा 1991 में बनाया गया था।", "en": "Python was created by Guido van Rossum in 1991."}
                    }
                ]
            },
            "history": {
                "name": {"hi": "इतिहास और भूगोल", "en": "History & Geography"},
                "questions": [
                    {
                        "type": "multiple",
                        "question": {"hi": "द्वितीय विश्व युद्ध किस वर्ष समाप्त हुआ?", "en": "In which year did World War II end?"},
                        "options": {"hi": ["1944", "1945", "1946", "1947"], "en": ["1944", "1945", "1946", "1947"]},
                        "correct": 1,
                        "explanation": {"hi": "द्वितीय विश्व युद्ध 1945 में जापान के आत्मसमर्पण के साथ समाप्त हुआ।", "en": "World War II ended in 1945 with the surrender of Japan."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "दुनिया की सबसे लंबी नदी कौन सी है?", "en": "Which river is the longest in the world?"},
                        "options": {"hi": ["अमेज़न", "नील", "यांग्त्ज़े", "मिसिसिपी"], "en": ["Amazon", "Nile", "Yangtze", "Mississippi"]},
                        "correct": 1,
                        "explanation": {"hi": "नील नदी लगभग 6,650 किलोमीटर लंबी है।", "en": "The Nile River is approximately 6,650 kilometers long."}
                    },
                    {
                        "type": "truefalse",
                        "question": {"hi": "बर्लिन की दीवार 1989 में गिरी थी।", "en": "The Berlin Wall fell in 1989."},
                        "correct": true,
                        "explanation": {"hi": "बर्लिन की दीवार 9 नवंबर, 1989 से ध्वस्त होना शुरू हुई।", "en": "The Berlin Wall was demolished starting November 9, 1989."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "कौन सा प्राचीन आश्चर्य अलेक्जेंड्रिया में स्थित था?", "en": "Which ancient wonder was located in Alexandria?"},
                        "options": {"hi": ["झूलते बगीचे", "लाइटहाउस", "कोलोसस", "मकबरा"], "en": ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"]},
                        "correct": 1,
                        "explanation": {"hi": "अलेक्जेंड्रिया का लाइटहाउस सात प्राचीन आश्चर्यों में से एक था।", "en": "The Lighthouse of Alexandria was one of the Seven Ancient Wonders."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "माउंट एवरेस्ट किस पर्वत श्रृंखला में स्थित है?", "en": "Mount Everest is located in which mountain range?"},
                        "options": {"hi": ["आल्प्स", "एंडीज", "हिमालय", "रॉकीज"], "en": ["Alps", "Andes", "Himalayas", "Rockies"]},
                        "correct": 2,
                        "explanation": {"hi": "माउंट एवरेस्ट हिमालय पर्वत श्रृंखला का हिस्सा है।", "en": "Mount Everest is part of the Himalayan mountain range."}
                    }
                ]
            },
            "programming": {
                "name": {"hi": "प्रोग्रामिंग", "en": "Programming & Computer Science"},
                "questions": [
                    {
                        "type": "multiple",
                        "question": {"hi": "HTML का पूरा नाम क्या है?", "en": "What does HTML stand for?"},
                        "options": {"hi": ["हाइपरटेक्स्ट मार्कअप लैंग्वेज", "हाई टेक मॉडर्न लैंग्वेज", "होम टूल मार्कअप लैंग्वेज", "हाइपरलिंक टेक्स्ट मार्कअप लैंग्वेज"], "en": ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"]},
                        "correct": 0,
                        "explanation": {"hi": "HTML का मतलब हाइपरटेक्स्ट मार्कअप लैंग्वेज है, जो वेब कंटेंट को संरचित करने के लिए उपयोग किया जाता है।", "en": "HTML stands for HyperText Markup Language, used to structure web content."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "कौन सा डेटा स्ट्रक्चर LIFO सिद्धांत का उपयोग करता है?", "en": "Which data structure uses LIFO principle?"},
                        "options": {"hi": ["क्यू", "स्टैक", "ऐरे", "लिंक्ड लिस्ट"], "en": ["Queue", "Stack", "Array", "Linked List"]},
                        "correct": 1,
                        "explanation": {"hi": "स्टैक Last In First Out (LIFO) सिद्धांत का पालन करता है।", "en": "Stack follows Last In First Out (LIFO) principle."}
                    },
                    {
                        "type": "truefalse",
                        "question": {"hi": "JavaScript और Java एक ही प्रोग्रामिंग भाषा है।", "en": "JavaScript and Java are the same programming language."},
                        "correct": false,
                        "explanation": {"hi": "JavaScript और Java बिल्कुल अलग भाषाएं हैं जिनके अलग उद्देश्य हैं।", "en": "JavaScript and Java are completely different languages with different purposes."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "बाइनरी सर्च की टाइम कॉम्प्लेक्सिटी क्या है?", "en": "What is the time complexity of binary search?"},
                        "options": {"hi": ["O(n)", "O(log n)", "O(n²)", "O(1)"], "en": ["O(n)", "O(log n)", "O(n²)", "O(1)"]},
                        "correct": 1,
                        "explanation": {"hi": "बाइनरी सर्च में सर्च स्पेस को आधे में बांटकर O(log n) टाइम कॉम्प्लेक्सिटी होती है।", "en": "Binary search has O(log n) time complexity by dividing search space in half."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "टेक्स्ट का रंग बदलने के लिए कौन सी CSS प्रॉपर्टी का उपयोग किया जाता है?", "en": "Which CSS property is used to change text color?"},
                        "options": {"hi": ["font-color", "text-color", "color", "foreground-color"], "en": ["font-color", "text-color", "color", "foreground-color"]},
                        "correct": 2,
                        "explanation": {"hi": "CSS में 'color' प्रॉपर्टी का उपयोग टेक्स्ट का रंग सेट करने के लिए किया जाता है।", "en": "The 'color' property in CSS is used to set the color of text."}
                    }
                ]
            },
            "mathematics": {
                "name": {"hi": "गणित", "en": "Mathematics"},
                "questions": [
                    {
                        "type": "multiple",
                        "question": {"hi": "π (पाई) का मान दो दशमलव स्थानों तक क्या है?", "en": "What is the value of π (pi) to 2 decimal places?"},
                        "options": {"hi": ["3.14", "3.15", "3.16", "3.13"], "en": ["3.14", "3.15", "3.16", "3.13"]},
                        "correct": 0,
                        "explanation": {"hi": "π (पाई) लगभग 3.14159 है, जो 3.14 तक राउंड होता है।", "en": "π (pi) is approximately 3.14159, which rounds to 3.14."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "200 का 15% क्या है?", "en": "What is 15% of 200?"},
                        "options": {"hi": ["25", "30", "35", "40"], "en": ["25", "30", "35", "40"]},
                        "correct": 1,
                        "explanation": {"hi": "200 का 15% = (15/100) × 200 = 30।", "en": "15% of 200 = (15/100) × 200 = 30."}
                    },
                    {
                        "type": "truefalse",
                        "question": {"hi": "एक त्रिभुज में दो समकोण हो सकते हैं।", "en": "A triangle can have two right angles."},
                        "correct": false,
                        "explanation": {"hi": "एक त्रिभुज में अधिकतम एक समकोण हो सकता है क्योंकि कोणों का योग 180° होता है।", "en": "A triangle can have at most one right angle since angles sum to 180°."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "144 का वर्गमूल क्या है?", "en": "What is the square root of 144?"},
                        "options": {"hi": ["10", "11", "12", "13"], "en": ["10", "11", "12", "13"]},
                        "correct": 2,
                        "explanation": {"hi": "√144 = 12 क्योंकि 12 × 12 = 144।", "en": "√144 = 12 because 12 × 12 = 144."}
                    },
                    {
                        "type": "multiple",
                        "question": {"hi": "समीकरण y = mx + b में, 'm' क्या दर्शाता है?", "en": "In the equation y = mx + b, what does 'm' represent?"},
                        "options": {"hi": ["Y-अवरोध", "ढलान", "X-अवरोध", "स्थिरांक"], "en": ["Y-intercept", "Slope", "X-intercept", "Constant"]},
                        "correct": 1,
                        "explanation": {"hi": "रेखीय समीकरण y = mx + b में, 'm' रेखा की ढलान को दर्शाता है।", "en": "In the linear equation y = mx + b, 'm' represents the slope of the line."}
                    }
                ]
            }
        };

        // Wait for DOM to be ready before initialization
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Flash Card Quiz App...');
        this.loadPreferences();
        this.bindEvents();
        this.updateLanguage();
        this.updateTheme();
        console.log('App initialized successfully');
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Language toggle with better error handling
        const langButtons = document.querySelectorAll('.lang-btn');
        console.log('Found language buttons:', langButtons.length);
        
        langButtons.forEach((btn, index) => {
            console.log(`Binding language button ${index}:`, btn.dataset.lang);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Language button clicked:', e.target.dataset.lang);
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Theme toggle clicked');
                this.toggleTheme();
            });
        }

        // Start quiz with better validation
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            console.log('Start quiz button found, adding event listener');
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Start quiz button clicked');
                this.startQuiz();
            });
        } else {
            console.error('Start quiz button not found!');
        }

        // Quiz controls
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousQuestion();
            });
        }

        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextQuestion();
            });
        }

        const flipBtn = document.getElementById('flipBtn');
        if (flipBtn) {
            flipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.flipCard();
            });
        }

        // Results buttons
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.restartQuiz();
            });
        }

        const newQuizBtn = document.getElementById('newQuizBtn');
        if (newQuizBtn) {
            newQuizBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showScreen('welcomeScreen');
            });
        }

        const reviewBtn = document.getElementById('reviewBtn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showReview();
            });
        }

        const backToResultsBtn = document.getElementById('backToResultsBtn');
        if (backToResultsBtn) {
            backToResultsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showScreen('resultsScreen');
            });
        }

        console.log('Event binding completed');
    }

    loadPreferences() {
        // Load saved preferences (removed localStorage usage as per strict instructions)
        this.currentLanguage = 'hi';
        this.currentTheme = 'light';
        this.soundEnabled = true;
    }

    switchLanguage(lang) {
        console.log('Switching language to:', lang);
        if (!lang) {
            console.error('Language not specified');
            return;
        }
        
        this.currentLanguage = lang;
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        this.updateLanguage();
        console.log('Language switched to:', this.currentLanguage);
    }

    updateLanguage() {
        console.log('Updating language UI to:', this.currentLanguage);
        
        // Update all elements with language attributes
        document.querySelectorAll('[data-hi][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update select options
        const topicSelect = document.getElementById('topicSelect');
        if (topicSelect) {
            topicSelect.querySelectorAll('option').forEach(option => {
                if (option.value && this.quizData[option.value]) {
                    option.textContent = this.quizData[option.value].name[this.currentLanguage];
                } else if (!option.value) {
                    option.textContent = this.currentLanguage === 'hi' ? 'विषय चुनें' : 'Select Topic';
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.updateTheme();
        console.log('Theme toggled to:', this.currentTheme);
    }

    updateTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    startQuiz() {
        console.log('Starting quiz...');
        
        const userNameInput = document.getElementById('userName');
        const topicSelect = document.getElementById('topicSelect');
        
        if (!userNameInput || !topicSelect) {
            console.error('Required elements not found');
            return;
        }

        const userName = userNameInput.value.trim();
        const selectedTopic = topicSelect.value;

        console.log('User name:', userName);
        console.log('Selected topic:', selectedTopic);

        if (!userName) {
            const message = this.currentLanguage === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name';
            alert(message);
            return;
        }

        if (!selectedTopic) {
            const message = this.currentLanguage === 'hi' ? 'कृपया एक विषय चुनें' : 'Please select a topic';
            alert(message);
            return;
        }

        this.userName = userName;
        this.selectedTopic = selectedTopic;
        this.timerEnabled = document.getElementById('timerEnabled')?.checked || false;
        const shuffleQuestions = document.getElementById('shuffleQuestions')?.checked || false;

        // Load questions
        this.questions = [...this.quizData[selectedTopic].questions];
        
        if (shuffleQuestions) {
            this.shuffleArray(this.questions);
        }

        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();

        // Update UI
        const userNameEl = document.querySelector('.user-name');
        const topicNameEl = document.querySelector('.topic-name');
        
        if (userNameEl) userNameEl.textContent = this.userName;
        if (topicNameEl) topicNameEl.textContent = this.quizData[selectedTopic].name[this.currentLanguage];
        
        const totalQuestionsEl = document.getElementById('totalQuestions');
        const totalQuestionsResultEl = document.getElementById('totalQuestionsResult');
        
        if (totalQuestionsEl) totalQuestionsEl.textContent = this.questions.length;
        if (totalQuestionsResultEl) totalQuestionsResultEl.textContent = this.questions.length;

        console.log('Showing quiz screen...');
        this.showScreen('quizScreen');
        this.displayQuestion();

        if (this.timerEnabled) {
            this.startTimer();
        } else {
            const timerEl = document.getElementById('timer');
            if (timerEl) timerEl.style.display = 'none';
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    displayQuestion() {
        console.log('Displaying question:', this.currentQuestionIndex + 1);
        
        const question = this.questions[this.currentQuestionIndex];
        const questionText = question.question[this.currentLanguage];
        
        const questionTextEl = document.getElementById('questionText');
        const currentQuestionEl = document.getElementById('currentQuestion');
        
        if (questionTextEl) questionTextEl.textContent = questionText;
        if (currentQuestionEl) currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        // Reset card flip
        this.isFlipped = false;
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.remove('flipped');
        }

        // Clear previous options
        const optionsContainer = document.getElementById('questionOptions');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
        }

        if (question.type === 'multiple') {
            if (optionsContainer) {
                optionsContainer.className = 'options-container';
                question.options[this.currentLanguage].forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = option;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.selectAnswer(index);
                    });
                    optionsContainer.appendChild(button);
                });
            }
        } else if (question.type === 'truefalse') {
            if (optionsContainer) {
                optionsContainer.className = 'truefalse-options';
                
                const trueBtn = document.createElement('button');
                trueBtn.className = 'option-btn';
                trueBtn.textContent = this.currentLanguage === 'hi' ? 'सत्य' : 'True';
                trueBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectAnswer(true);
                });
                
                const falseBtn = document.createElement('button');
                falseBtn.className = 'option-btn';
                falseBtn.textContent = this.currentLanguage === 'hi' ? 'असत्य' : 'False';
                falseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectAnswer(false);
                });
                
                optionsContainer.appendChild(trueBtn);
                optionsContainer.appendChild(falseBtn);
            }
        }

        // Prepare answer side
        const correctAnswer = this.getCorrectAnswerText(question);
        const correctAnswerEl = document.getElementById('correctAnswer');
        const answerExplanationEl = document.getElementById('answerExplanation');
        
        if (correctAnswerEl) correctAnswerEl.textContent = correctAnswer;
        if (answerExplanationEl) answerExplanationEl.textContent = question.explanation[this.currentLanguage];

        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = this.currentQuestionIndex === 0;
        if (nextBtn) {
            nextBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? 'none' : 'inline-flex';
        }

        // Hide feedback
        this.hideFeedback();

        // Start question timer
        this.questionStartTime = Date.now();
    }

    getCorrectAnswerText(question) {
        if (question.type === 'multiple') {
            return question.options[this.currentLanguage][question.correct];
        } else if (question.type === 'truefalse') {
            return question.correct ? 
                (this.currentLanguage === 'hi' ? 'सत्य' : 'True') : 
                (this.currentLanguage === 'hi' ? 'असत्य' : 'False');
        }
        return '';
    }

    selectAnswer(answer) {
        console.log('Answer selected:', answer);
        
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = answer === question.correct;
        
        // Store user answer
        this.userAnswers[this.currentQuestionIndex] = {
            question: question,
            userAnswer: answer,
            correct: isCorrect,
            timeSpent: Date.now() - this.questionStartTime
        };

        if (isCorrect) {
            this.score++;
        }

        // Update score display
        const currentScoreEl = document.getElementById('currentScore');
        if (currentScoreEl) {
            currentScoreEl.textContent = this.score;
        }

        // Visual feedback
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            btn.disabled = true;
            if (question.type === 'multiple') {
                if (index === question.correct) {
                    btn.classList.add('correct');
                } else if (index === answer && !isCorrect) {
                    btn.classList.add('wrong');
                }
            } else if (question.type === 'truefalse') {
                const btnValue = btn.textContent === (this.currentLanguage === 'hi' ? 'सत्य' : 'True');
                if (btnValue === question.correct) {
                    btn.classList.add('correct');
                } else if (btnValue === answer && !isCorrect) {
                    btn.classList.add('wrong');
                }
            }
        });

        // Show feedback
        this.showFeedback(isCorrect);

        // Auto-advance after a delay
        setTimeout(() => {
            if (this.currentQuestionIndex === this.questions.length - 1) {
                this.finishQuiz();
            } else {
                this.nextQuestion();
            }
        }, 2000);
    }

    showFeedback(isCorrect) {
        const feedbackEl = document.getElementById('feedbackMessage');
        if (feedbackEl) {
            feedbackEl.textContent = isCorrect ? 
                (this.currentLanguage === 'hi' ? '✓ सही उत्तर!' : '✓ Correct!') :
                (this.currentLanguage === 'hi' ? '✗ गलत उत्तर' : '✗ Wrong Answer');
            
            feedbackEl.className = `feedback-message show ${isCorrect ? 'correct' : 'wrong'}`;
        }

        // Play sound effect (simplified without actual audio)
        if (this.soundEnabled) {
            console.log(isCorrect ? 'Correct sound' : 'Wrong sound');
        }
    }

    hideFeedback() {
        const feedbackEl = document.getElementById('feedbackMessage');
        if (feedbackEl) {
            feedbackEl.className = 'feedback-message';
        }
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped', this.isFlipped);
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    startTimer() {
        let totalSeconds = 0;
        this.timerInterval = setInterval(() => {
            totalSeconds++;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const timerEl = document.getElementById('timer');
            if (timerEl) {
                timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    finishQuiz() {
        this.stopTimer();
        
        const totalTime = Date.now() - this.startTime;
        const correctAnswers = this.userAnswers.filter(answer => answer.correct).length;
        const wrongAnswers = this.questions.length - correctAnswers;
        const percentage = Math.round((correctAnswers / this.questions.length) * 100);
        
        // Update results
        const finalScoreEl = document.getElementById('finalScore');
        const scorePercentageEl = document.getElementById('scorePercentage');
        const correctAnswersEl = document.getElementById('correctAnswers');
        const wrongAnswersEl = document.getElementById('wrongAnswers');
        const accuracyEl = document.getElementById('accuracy');
        const timeTakenEl = document.getElementById('timeTaken');
        
        if (finalScoreEl) finalScoreEl.textContent = correctAnswers;
        if (scorePercentageEl) scorePercentageEl.textContent = `${percentage}%`;
        if (correctAnswersEl) correctAnswersEl.textContent = correctAnswers;
        if (wrongAnswersEl) wrongAnswersEl.textContent = wrongAnswers;
        if (accuracyEl) accuracyEl.textContent = `${percentage}%`;
        
        if (timeTakenEl) {
            const minutes = Math.floor(totalTime / 60000);
            const seconds = Math.floor((totalTime % 60000) / 1000);
            timeTakenEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        this.showScreen('resultsScreen');
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        
        // Shuffle questions again if option was selected
        if (document.getElementById('shuffleQuestions')?.checked) {
            this.shuffleArray(this.questions);
        }
        
        const currentScoreEl = document.getElementById('currentScore');
        if (currentScoreEl) currentScoreEl.textContent = '0';
        
        this.showScreen('quizScreen');
        this.displayQuestion();
        
        if (this.timerEnabled) {
            this.startTimer();
        }
    }

    showReview() {
        const reviewList = document.getElementById('reviewList');
        if (!reviewList) return;
        
        reviewList.innerHTML = '';
        
        const wrongAnswers = this.userAnswers.filter(answer => !answer.correct);
        
        if (wrongAnswers.length === 0) {
            reviewList.innerHTML = `<p style="text-align: center; color: var(--color-success); font-size: var(--font-size-lg);">
                ${this.currentLanguage === 'hi' ? 'बधाई हो! आपने सभी प्रश्नों के सही उत्तर दिए हैं!' : 'Congratulations! You answered all questions correctly!'}
            </p>`;
        } else {
            wrongAnswers.forEach((answer, index) => {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                
                const question = answer.question;
                const userAnswerText = this.getUserAnswerText(question, answer.userAnswer);
                const correctAnswerText = this.getCorrectAnswerText(question);
                
                reviewItem.innerHTML = `
                    <div class="review-question">${question.question[this.currentLanguage]}</div>
                    <div class="review-answers">
                        <div class="review-answer your-answer">
                            <strong>${this.currentLanguage === 'hi' ? 'आपका उत्तर:' : 'Your Answer:'}</strong> ${userAnswerText}
                        </div>
                        <div class="review-answer correct-answer">
                            <strong>${this.currentLanguage === 'hi' ? 'सही उत्तर:' : 'Correct Answer:'}</strong> ${correctAnswerText}
                        </div>
                    </div>
                    <div class="review-explanation">${question.explanation[this.currentLanguage]}</div>
                `;
                
                reviewList.appendChild(reviewItem);
            });
        }
        
        this.showScreen('reviewScreen');
    }

    getUserAnswerText(question, userAnswer) {
        if (question.type === 'multiple') {
            return question.options[this.currentLanguage][userAnswer] || (this.currentLanguage === 'hi' ? 'कोई उत्तर नहीं' : 'No answer');
        } else if (question.type === 'truefalse') {
            return userAnswer ? 
                (this.currentLanguage === 'hi' ? 'सत्य' : 'True') : 
                (this.currentLanguage === 'hi' ? 'असत्य' : 'False');
        }
        return this.currentLanguage === 'hi' ? 'कोई उत्तर नहीं' : 'No answer';
    }

    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        setTimeout(() => {
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
                console.log('Screen shown:', screenId);
            } else {
                console.error('Screen not found:', screenId);
            }
        }, 100);
    }
}

// Initialize the app when DOM is loaded
const app = new FlashCardQuiz();