import React, { useState } from 'react';
import { Button, Typography, Sheet, Card, CardContent, Stack } from '@mui/joy';
// import backgroundImage from '../assets/latest.png'; 
const questions = [
    {
      question: "What is the name of the main character in GTA V?",
      answers: [
        { text: "Carl Johnson", correct: false },
        { text: "Tommy Vercetti", correct: false },
        { text: "Niko Bellic", correct: false },
        { text: "Michael De Santa", correct: true }
      ]
    },
    {
      question: "What is the name of the secret organization in GTA V?",
      answers: [
        { text: "The Illuminati", correct: false },
        { text: "The Epsilon Program", correct: true },
        { text: "The Los Santos Police Department", correct: false },
        { text: "The Triads", correct: false }
      ]
    },
    {
      question: "Which city is GTA V based on?",
      answers: [
        { text: "New York City", correct: false },
        { text: "Los Angeles", correct: true },
        { text: "Miami", correct: false },
        { text: "Chicago", correct: false }
      ]
    },
    {
      question: "What is the name of the in-game currency in GTA V?",
      answers: [
        { text: "Dollars", correct: false },
        { text: "Credits", correct: false },
        { text: "GTA Coins", correct: false },
        { text: "GTA Dollars", correct: true }
      ]
    },
    {
      question: "Which character is known for saying 'I'm not a hipster' in GTA V?",
      answers: [
        { text: "Franklin", correct: false },
        { text: "Trevor", correct: true },
        { text: "Michael", correct: false },
        { text: "Lamar", correct: false }
      ]
    }
  ];

const characterDescriptions = {
  Michael: "You're a seasoned pro in the criminal world, much like Michael De Santa. You value strategy, finesse, and the finer things in life. Your approach to crime is calculated and sophisticated.",
  Franklin: "Your street smarts and ambition align perfectly with Franklin Clinton. You're always looking for opportunities to climb the ladder and improve your situation. Life for you is about making the most of every chance you get.",
  Trevor: "Your unpredictable and intense nature resonates with Trevor Philips. You live life on the edge and aren't afraid to get your hands dirty. Your approach to crime is chaotic but effective.",
  Lester: "Your technical skills and strategic mind are reminiscent of Lester Crest. You prefer to be the brains behind the operation, orchestrating heists from behind the scenes. Your approach to crime is all about meticulous planning and leveraging technology."
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getResult = () => {
    if (score <= 1) return "Trevor";
    if (score <= 3) return "Franklin";
    if (score === 4) return "Michael";
    return "Lester";
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    // <div style={{
    //   backgroundImage: `url(${backgroundImage})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   minHeight: '100vh',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // }}>
      <Sheet sx={{ 
        maxWidth: 600, 
        margin: 'auto', 
        p: 2, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#ffab00'
      }}>
        <Typography level="h2" sx={{ mb: 4, textAlign: 'center', color: '#ffab00' }}>
          Which GTA V Character Are You?
        </Typography>
        
        {!quizComplete ? (
          <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <CardContent>
              <Typography level="h5" sx={{ mb: 2, color: '#ffab00' }}>
                {questions[currentQuestion].question}
              </Typography>
              <Stack spacing={2}>
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(answer.correct)}
                    variant="outlined"
                    sx={{ 
                      justifyContent: 'flex-start', 
                      textAlign: 'left',
                      color: '#ffab00',
                      borderColor: '#ffab00',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 0, 0.1)'
                      }
                    }}
                  >
                    {answer.text}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <CardContent>
              <Typography level="h4" sx={{ mb: 2, color: '#ffab00' }}>
                Your Result: {getResult()}
              </Typography>
              <Typography sx={{ mb: 2, color: '#ffab00' }}>
                {characterDescriptions[getResult()]}
              </Typography>
              <Typography sx={{ mb: 2, color: '#ffab00' }}>
                You scored {score} out of {questions.length} questions correctly.
              </Typography>
              <Button onClick={restartQuiz} sx={{ 
                color: '#ffab00', 
                borderColor: '#ffab00',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 0, 0.1)'
                }
              }}>
                Take the Quiz Again
              </Button>
            </CardContent>
          </Card>
        )}
      </Sheet>
    // </div>
  );
};

export default Quiz;

