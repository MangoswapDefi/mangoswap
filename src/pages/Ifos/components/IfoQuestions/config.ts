const config = [
  {
    title: {
      id: 'question1',
      fallback: 'What’s the difference between a Basic Sale and Unlimited Sale?',
    },
    description: [
      {
        id: 'description1forQ1',
        fallback:
          'In the Basic Sale, every user can commit a maximum of about 100 USD worth of CAKE-OKT LP Tokens. We calculate the maximum LP amount about 30 minutes before each IFO. The Basic Sale has no participation fee.',
      },
      {
        id: 'description2forQ1',
        fallback:
          'In the Unlimited Sale, there’s no limit to the amount of CAKE-OKT LP Tokens you can commit. However, there’s a fee for participation: see below.',
      },
    ],
  },
  {
    title: {
      id: 'question2',
      fallback: 'Which sale should I commit to? Can I do both?',
    },
    description: [
      {
        id: 'description1forQ2',
        fallback:
          'You can choose one or both at the same time! If you’re only committing a small amount, we recommend the Basic Sale first. Just remember you need a PancakeSwap Profile in order to participate.',
      },
    ],
  },
  {
    title: { id: 'question3', fallback: 'How much is the participation fee?' },
    description: [
      {
        id: 'description1forQ3',
        fallback: 'There’s only a participation fee for the Unlimited Sale: there’s no fee for the Basic Sale.',
      },
      {
        id: 'description2forQ3',
        fallback: 'The fee will start at 1%.',
      },
      {
        id: 'description3forQ3',
        fallback:
          'The 1% participation fee decreases in cliffs, based on the percentage of overflow from the “Unlimited” portion of the sale.',
      },
    ],
  },
  {
    title: { id: 'question4', fallback: 'Where does the participation fee go?' },
    description: [
      {
        id: 'description1forQ4',
        fallback:
          'We burn it. The CAKE-OKT LP tokens from the participation fee will be decomposed, then we use the OKT portion to market buy the CAKE equivalent, then finally throw all of the CAKE into the weekly token burn.',
      },
    ],
  },
  {
    title: {
      id: 'question5',
      fallback: 'How can I get an achievement for participating in the IFO?',
    },
    description: [
      {
        id: 'description1forQ5',
        fallback: 'You need to contribute a minimum of about 10 USD worth of CAKE-OKT LP Tokens to either sale.',
      },
      {
        id: 'description2forQ5',
        fallback:
          'You can contribute to one or both, it doesn’t matter: only your overall contribution is counted for the achievement.',
      },
    ],
  },
]
export default config
