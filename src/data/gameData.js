export const gameScenarios = [
  {
    id: 1,
    title: "End of Semester Room Cleanup",
    description: "You're moving out of your dorm room after the semester has ended. You have various items to dispose of including textbooks, clothes, electronics, and personal belongings.",
    image: "/api/placeholder/400/300", // Placeholder image URL
    timeLimit: 120, // 2 minutes in seconds
    options: [
      {
        id: 'a',
        text: "Throw everything outside the room",
        scores: {
          environment: 10,
          society: 15,
          timeMoney: 35
        }
      },
      {
        id: 'b',
        text: "Throw everything into common bin",
        scores: {
          environment: 20,
          society: 25,
          timeMoney: 30
        }
      },
      {
        id: 'c',
        text: "Segregate and throw into different bins",
        scores: {
          environment: 40,
          society: 35,
          timeMoney: 20
        }
      },
      {
        id: 'd',
        text: "Segregate and recycle/reuse some items",
        scores: {
          environment: 50,
          society: 45,
          timeMoney: 15
        }
      }
    ]
  },
  {
    id: 2,
    title: "Weekly Grocery Shopping",
    description: "You're at the grocery store doing your weekly shopping. You need to decide how to handle packaging and bag choices.",
    image: "/api/placeholder/400/300",
    timeLimit: 120,
    options: [
      {
        id: 'a',
        text: "Use plastic bags for everything",
        scores: {
          environment: 15,
          society: 20,
          timeMoney: 40
        }
      },
      {
        id: 'b',
        text: "Mix of plastic and paper bags",
        scores: {
          environment: 25,
          society: 30,
          timeMoney: 35
        }
      },
      {
        id: 'c',
        text: "Bring reusable bags but buy some packaged items",
        scores: {
          environment: 40,
          society: 35,
          timeMoney: 25
        }
      },
      {
        id: 'd',
        text: "Bring reusable bags and choose minimal packaging",
        scores: {
          environment: 45,
          society: 40,
          timeMoney: 20
        }
      }
    ]
  },
  {
    id: 3,
    title: "Old Electronics Disposal",
    description: "Your old laptop has stopped working and you have an old smartphone you no longer use. How do you dispose of these electronic items?",
    image: "/api/placeholder/400/300",
    timeLimit: 120,
    options: [
      {
        id: 'a',
        text: "Throw them in regular trash",
        scores: {
          environment: 5,
          society: 10,
          timeMoney: 45
        }
      },
      {
        id: 'b',
        text: "Leave them in a storage room",
        scores: {
          environment: 20,
          society: 15,
          timeMoney: 40
        }
      },
      {
        id: 'c',
        text: "Take them to an electronics recycling center",
        scores: {
          environment: 45,
          society: 40,
          timeMoney: 20
        }
      },
      {
        id: 'd',
        text: "Donate working parts and recycle the rest",
        scores: {
          environment: 50,
          society: 45,
          timeMoney: 15
        }
      }
    ]
  },
  {
    id: 4,
    title: "Food Waste at Home",
    description: "You have leftover food that's approaching its expiry date, and some vegetables that are slightly wilted but still edible.",
    image: "/api/placeholder/400/300",
    timeLimit: 120,
    options: [
      {
        id: 'a',
        text: "Throw everything in the trash",
        scores: {
          environment: 10,
          society: 15,
          timeMoney: 35
        }
      },
      {
        id: 'b',
        text: "Throw away bad items, keep the rest",
        scores: {
          environment: 25,
          society: 30,
          timeMoney: 30
        }
      },
      {
        id: 'c',
        text: "Compost organic waste, save edible food",
        scores: {
          environment: 40,
          society: 35,
          timeMoney: 25
        }
      },
      {
        id: 'd',
        text: "Cook remaining food, share extras, compost scraps",
        scores: {
          environment: 50,
          society: 45,
          timeMoney: 20
        }
      }
    ]
  },
  {
    id: 5,
    title: "Clothing Closet Cleanup",
    description: "You're cleaning out your closet and found clothes that no longer fit or that you don't wear anymore. Some are in good condition, others are worn out.",
    image: "/api/placeholder/400/300",
    timeLimit: 120,
    options: [
      {
        id: 'a',
        text: "Throw all unwanted clothes in trash",
        scores: {
          environment: 10,
          society: 10,
          timeMoney: 40
        }
      },
      {
        id: 'b',
        text: "Keep everything 'just in case'",
        scores: {
          environment: 25,
          society: 20,
          timeMoney: 35
        }
      },
      {
        id: 'c',
        text: "Donate good clothes, trash worn out ones",
        scores: {
          environment: 35,
          society: 40,
          timeMoney: 25
        }
      },
      {
        id: 'd',
        text: "Donate good clothes, repurpose worn ones as rags",
        scores: {
          environment: 45,
          society: 45,
          timeMoney: 20
        }
      }
    ]
  }
];

export const scoreWeights = {
  environment: 0.4,
  society: 0.35,
  timeMoney: 0.25
};

export const calculateTotalScore = (userAnswers) => {
  let totalWeightedScore = 0;
  let totalScenarios = gameScenarios.length;

  gameScenarios.forEach(scenario => {
    const userAnswer = userAnswers[scenario.id];
    if (userAnswer) {
      const selectedOption = scenario.options.find(option => option.id === userAnswer);
      if (selectedOption) {
        const scenarioScore = 
          (selectedOption.scores.environment * scoreWeights.environment) +
          (selectedOption.scores.society * scoreWeights.society) +
          (selectedOption.scores.timeMoney * scoreWeights.timeMoney);
        
        totalWeightedScore += scenarioScore;
      }
    }
  });

  return Math.round(totalWeightedScore / totalScenarios * 100) / 100;
};