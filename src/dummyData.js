export const initialPosts = [
  {
    id: '1',
    title: 'Should we implement a 4-day work week?',
    content: 'A 4-day work week could lead to better work-life balance and increased productivity. However, it might not be suitable for all industries. What are your thoughts?',
    author: 'John Doe',
    date: '2024-09-24T10:00:00Z',
    likes: 15,
    comments: [
      { id: 'c1', author: 'Jane Smith', content: 'I think it\'s a great idea! It would give me more time to spend with my family.' },
      { id: 'c2', author: 'Peter Jones', content: 'I\'m not so sure. Some businesses need to be open 5 days a week.' }
    ],
    tags: ['Work-Life Balance', 'Productivity'],
    isInPetition: false,
  },
  {
    id: '2',
    title: 'Improving public transportation',
    content: 'Our city\'s public transportation system is outdated and inefficient. I propose we invest in a new light rail system to reduce traffic congestion and pollution.',
    author: 'Alice Johnson',
    date: '2024-09-23T14:30:00Z',
    likes: 22,
    comments: [],
    tags: ['Transportation', 'City Planning', 'Environment'],
    isInPetition: false,
  }
];

export const initialPetitions = [
  {
    id: 'p1',
    post_id: '2',
    title: 'Invest in a new light rail system',
    description: 'We, the undersigned, urge the city council to approve funding for a new light rail system to improve public transportation, reduce traffic, and combat climate change.',
    signatures: 78,
    goal: 1000,
    author: 'Alice Johnson',
    date: '2024-09-25T11:00:00Z',
  }
];

export const initialLegalRevisions = [
  {
    id: 'lr1',
    petition_id: 'p1',
    title: 'Light Rail System Funding Act',
    summary: 'A bill to allocate $500 million for the construction of a new light rail system, to be completed by 2030.',
    content: `
**Section 1: Short Title**
This Act may be cited as the "Light Rail System Funding Act".

**Section 2: Findings and Purpose**
(a) The City Council finds that a modern, efficient, and accessible public transportation system is essential for the economic prosperity, environmental health, and quality of life of our city's residents.
(b) The purpose of this Act is to authorize the financing and development of a new light rail system to reduce traffic congestion, improve air quality, and provide a reliable transportation alternative for all citizens.

**Section 3: Authorization of Bonds**
The City is hereby authorized to issue general obligation bonds in an aggregate principal amount not to exceed $500,000,000 for the purpose of financing the construction of the light rail system.

**Section 4: Establishment of the Transportation Authority**
There is hereby established the Urban Transit Authority, which shall be responsible for overseeing the planning, construction, and operation of the light rail system.
`,
    author: 'City Council',
    date: { from: '2024-10-01', to: '2024-11-01' },
    isActive: true,
    supported_by: [
      { id: 'v1', voter: 'Michael', comment: 'This is a much-needed investment in our city\'s future.' }
    ],
    opposed_by: [],
    comments: [],
  },
  {
    id: 'lr2',
    petition_id: 'p1',
    title: 'Four-Day Work Week Initiative',
    summary: 'A proposal to study the feasibility of a four-day work week for municipal employees.',
    content: `
**Section 1: Title**
This resolution shall be known as the "Four-Day Work Week Feasibility Study Initiative".

**Section 2: Directive to the City Manager**
The City Manager is hereby directed to establish a special committee to conduct a comprehensive feasibility study on the implementation of a four-day work week for all non-essential municipal employees.

**Section 3: Committee Composition**
The committee shall be composed of:
(a) One representative from the Human Resources Department.
(b) One representative from the Finance Department.
(c) Two representatives from different public-facing departments (e.g., Parks and Recreation, Public Library).
(d) Two representatives from the local public employees' union.
(e) Three members of the public appointed by the City Council.

**Section 4: Scope of Study**
The study shall assess the potential impacts of a four-day work week on employee productivity, operational costs, public service availability, and employee morale and well-being.

**Section 5: Reporting Requirement**
The committee shall submit a final report of its findings and recommendations to the City Council no later than six months from the date of the enactment of this resolution.
`,
    author: 'John Doe',
    date: { from: '2024-09-25', to: '2024-10-25' },
    isActive: false,
    supported_by: [],
    opposed_by: [],
    comments: [],
  }
];

export const initialSuggestions = [];
