export const gameScenarios = [
  {
    id: 1,
    title: "Shifting the room after the semester has ended",
    description: "You're moving out of your dorm room after the semester has ended. You have various items including textbooks, clothes, electronics, and personal belongings that need to be disposed of properly.",
    image: "/sceneImages/1.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Throw everything outside the room",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Throw everyhting into common bin",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Segregate and throw into different bins",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Segregate and reycle/reuse some items",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 2,
    title: "A birthday Pizza treat at the HFC",
    description: "After celebrating a birthday with pizza at the food court, you're left with pizza boxes, condiment packets, napkins, and leftover food. How do you handle the cleanup?",
    image: "/sceneImages/2.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Throw the chilli/pepper packets inside the pizza box and dump all the boxes into a paper bag",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Segregate the food waste and throw the other plastic/paper waste into dry waste bins",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Keep everthing on the table and leave",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Segregate the food waste and throw the other plastic/paper waste into the residual waste bins",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 3,
    title: "Freshers entering the Hostel with Mattress, Brooms, and other accessories",
    description: "As a new student moving into the hostel, you've just received your mattress, cleaning supplies, and other accessories. All items come with various packaging materials including plastic covers, cardboard boxes, and smaller wrappers.",
    image: "/sceneImages/3.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Before coming to campus, connect with seniors through campus groups to acquire used items in good condition (mattress, broom, etc.), avoiding new purchases and packaging waste entirely.",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Unpack everything in a hurry and leave the large plastic mattress cover and all other packaging material in the hostel corridor outside your room.",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Stuff all the packaging—the big plastic cover, cardboard, smaller plastic wrappers—into the nearest common dustbin, even if it overflows.",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Separate the packaging. Neatly fold the large plastic mattress cover and other plastics for the recycling bin, and put the cardboard and paper tags in the dry waste (blue) bin.",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 4,
    title: "A room filled with Amazon/quick commerce parcels",
    description: "",
    image: "/sceneImages/4.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Let the empty boxes, plastic mailers, and bubble wrap pile up in a corner. When it gets too messy, just dump the entire pile in the corridor or near the common bins.",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Shove all the packaging materials—cardboard, bubble wrap, and plastic bags—into one or two of the largest boxes and throw the whole thing into the general waste area.",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Systematically flatten all the cardboard boxes. Separate the plastic bubble wrap and air pillows. Put the cardboard in the designated paper/dry waste collection point and the plastics in the plastic recycling bin.",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Flatten the cardboard boxes and keep them. Post a message on a campus group offering the boxes and bubble wrap for free to anyone who needs them.",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 5,
    title: "You had a fruit party (mangoes yumm) in hostel",
    description: "",
    image: "/sceneImages/5.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Wrap all the fruit waste into a paper/plastic and throw it into wet waste bin",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Throw the fruit waste outside the room",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Throw the fruit waste in the wet waste bin without any paper/plastic covering",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      }
    ]
  },
  {
    id: 6,
    title: "Friends Birthday Party and you bought FB Cakes with plates, candlesticks, spoons and tissues.",
    description: "",
    image: "/sceneImages/6.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Leave all the used plates, spoons, cake boxes, and tissues on the common room table or lawn for the cleaners to handle.",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Collect everything—leftover cake, plates, spoons, box—into one large bag and dump it in the common hostel bin.",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Segregate the waste properly: leftover cake into the wet waste (green) bin; paper plates, tissues, and the box into the dry waste (blue) bin; and plastic spoons into the plastic recycling bin.",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Plan a zero-waste party by using reusable metal plates and spoons from the hostel mess. After the party, compost the food scraps and recycle the cake box.",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 7,
    title: "You order parcel food from Mummy-Daddy mess, after finishing the food what would you do?",
    description: "",
    image: "/sceneImages/7.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Leave the container and leftovers on the table, corridor.",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Throw the container with the leftover food inside it into the nearest general dustbin (common bin).",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Scrape the leftover food into the designated wet waste (green) bin and put the empty, rinsed container into the dry waste (blue) bin.",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Use your own reusable tiffin box to collect the food in the first place, thus avoiding any container waste.",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 8,
    title: "Every wing is following waste segregation in hostel apart from one wing; your wages were reduced",
    description: "",
    image: "/sceneImages/8.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Resign",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Go room-by-room and convince the students using emotional strategy",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Inform the hostel manager and criticize the behaviour of students through the warden",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Threaten the students because of your inability to take any action",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 9,
    title: "A lot of mixed-waste is dumped near Velachery gate; deers are dying",
    description: "",
    image: "/sceneImages/9.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Maintain status quo",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Create a fenced yard around the facility preventing animal access",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Keep the facility outside campus requiring vehicles for transport",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Implement a campus-wide segregation policy with color-coded bins and modest penalties",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 10,
    title: "A lot of plastic is generated due to fast-food consumption and thrown around campus",
    description: "",
    image: "/sceneImages/10.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Maintain the status quo and increase cleaning staff rounds",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Install more surveillance cameras and impose heavy fines",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Place many dedicated plastic recycling bins across campus",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Launch a Plastic-Free Campus initiative with vendor collaboration and student incentives",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 11,
    title: "Bin near Dean’s room disrupted by monkeys at 8 a.m.",
    description: "",
    image: "/sceneImages/11.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Collect everything fast and put it back in the bin",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Let it be (shift is done)",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Keep it as is for the Dean to see, then complain about monkey attacks",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Remove the bin and place it elsewhere",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  },
  {
    id: 12,
    title: "Diabetic student uses insulin twice daily; how to dispose needles and box?",
    description: "",
    image: "/sceneImages/12.png",
    timeLimit: 120,
    options: [
      {
        id: "a",
        text: "Throw the needle and box in the common bin",
        scores: { environment: 10, society: 15, timeMoney: 35 }
      },
      {
        id: "b",
        text: "Store the needles and box until enough is collected, then hand to expert team",
        scores: { environment: 20, society: 25, timeMoney: 30 }
      },
      {
        id: "c",
        text: "Give the waste directly to expert people daily",
        scores: { environment: 35, society: 35, timeMoney: 25 }
      },
      {
        id: "d",
        text: "Throw the waste outside your window",
        scores: { environment: 45, society: 45, timeMoney: 15 }
      }
    ]
  }
];

export const scoreWeights = {
  environment: 0.4,
  society: 0.35,
  timeMoney: 0.25
};

export const calculateTotalScore = userAnswers => {
  let totalWeightedScore = 0;
  const totalScenarios = gameScenarios.length;

  gameScenarios.forEach(scenario => {
    const userAnswer = userAnswers[scenario.id];
    if (userAnswer) {
      const selected = scenario.options.find(opt => opt.id === userAnswer);
      if (selected) {
        const s =
          selected.scores.environment * scoreWeights.environment +
          selected.scores.society * scoreWeights.society +
          selected.scores.timeMoney * scoreWeights.timeMoney;
        totalWeightedScore += s;
      }
    }
  });

  return Math.round((totalWeightedScore / totalScenarios) * 100) / 100;
};
