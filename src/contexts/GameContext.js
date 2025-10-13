import React, { createContext, useContext, useReducer } from 'react';
import { gameScenarios, checkGameStatus } from '../data/gameData';

const GameContext = createContext();

const initialState = {
  currentScenarioIndex: 0,
  userAnswers: {},
  timeRemaining: gameScenarios[0]?.timeLimit || 120,
  gameCompleted: false,
  gameStarted: false,
  totalScore: 0,
  gameLost: false,
  gameWon: false,
  categoryScores: { environment: 50, society: 50, timeMoney: 50 }
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        currentScenarioIndex: 0,
        timeRemaining: gameScenarios[0]?.timeLimit || 120
      };
    
    case 'ANSWER_SCENARIO':
      const newAnswers = {
        ...state.userAnswers,
        [action.scenarioId]: action.answerId
      };
      
      const gameStatus = checkGameStatus(newAnswers);
      
      return {
        ...state,
        userAnswers: newAnswers,
        categoryScores: gameStatus.categoryScores,
        gameLost: gameStatus.hasLost,
        gameWon: gameStatus.hasWon,
        totalScore: gameStatus.totalScore
      };
    
    case 'NEXT_SCENARIO':
      const nextIndex = state.currentScenarioIndex + 1;
      const isCompleted = nextIndex >= gameScenarios.length;
      
      return {
        ...state,
        currentScenarioIndex: nextIndex,
        timeRemaining: isCompleted ? 0 : gameScenarios[nextIndex]?.timeLimit || 120,
        gameCompleted: isCompleted
      };
    
    case 'UPDATE_TIME':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1)
      };
    
    case 'TIME_UP':
      const nextIndexTimeUp = state.currentScenarioIndex + 1;
      const isCompletedTimeUp = nextIndexTimeUp >= gameScenarios.length;
      
      return {
        ...state,
        currentScenarioIndex: nextIndexTimeUp,
        timeRemaining: isCompletedTimeUp ? 0 : gameScenarios[nextIndexTimeUp]?.timeLimit || 120,
        gameCompleted: isCompletedTimeUp
      };
    
    case 'SET_TOTAL_SCORE':
      return {
        ...state,
        totalScore: action.score
      };
    
    case 'RESET_GAME':
      return {
        ...initialState,
        timeRemaining: gameScenarios[0]?.timeLimit || 120
      };

    case 'END_GAME_LOSS':
      return {
        ...state,
        gameLost: true,
        gameCompleted: true
      };

    case 'END_GAME_WIN':
      return {
        ...state,
        gameWon: true,
        gameCompleted: true
      };
    
    default:
      return state;
  }
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const answerScenario = (scenarioId, answerId) => {
    dispatch({ type: 'ANSWER_SCENARIO', scenarioId, answerId });
  };

  const nextScenario = () => {
    dispatch({ type: 'NEXT_SCENARIO' });
  };

  const updateTime = () => {
    dispatch({ type: 'UPDATE_TIME' });
  };

  const timeUp = () => {
    dispatch({ type: 'TIME_UP' });
  };

  const setTotalScore = (score) => {
    dispatch({ type: 'SET_TOTAL_SCORE', score });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const endGameLoss = () => {
    dispatch({ type: 'END_GAME_LOSS' });
  };

  const endGameWin = () => {
    dispatch({ type: 'END_GAME_WIN' });
  };

  const value = {
    ...state,
    startGame,
    answerScenario,
    nextScenario,
    updateTime,
    timeUp,
    setTotalScore,
    resetGame,
    endGameLoss,
    endGameWin
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};