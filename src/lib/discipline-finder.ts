// "Find your instrument" — advisory quiz mapping preferences to ERSA's five
// disciplines. Purely a guide: the audition and the learner's own choice decide.

export type DisciplineKey = "visual-arts" | "design" | "drama" | "dance" | "music";

export type FinderOption = {
  label: string;
  hint: string;
  discipline: DisciplineKey;
};

export type FinderQuestion = {
  q: string;
  options: FinderOption[];
};

export const finderQuestions: FinderQuestion[] = [
  {
    q: "It's a free Saturday afternoon. What do you reach for first?",
    options: [
      { label: "A pencil and paper", hint: "something to draw", discipline: "visual-arts" },
      { label: "A mood board or a plan", hint: "something to design", discipline: "design" },
      { label: "An audience", hint: "someone to perform for", discipline: "drama" },
      { label: "Open floor space", hint: "room to move", discipline: "dance" },
      { label: "Headphones", hint: "something to play along with", discipline: "music" },
    ],
  },
  {
    q: "A big stage. 500 people. What's your dream job that night?",
    options: [
      { label: "My paintings line the foyer", hint: "the exhibition", discipline: "visual-arts" },
      { label: "I designed the set and the poster", hint: "behind the scenes", discipline: "design" },
      { label: "I'm centre stage with the monologue", hint: "the spotlight", discipline: "drama" },
      { label: "I open with the choreography", hint: "the first move", discipline: "dance" },
      { label: "I count in the band", hint: "one, two, three…", discipline: "music" },
    ],
  },
  {
    q: "The work you'd be proudest to sign your name to:",
    options: [
      { label: "A portrait that took 40 hours", hint: "detail made visible", discipline: "visual-arts" },
      { label: "A garment people actually wear", hint: "design turned real", discipline: "design" },
      { label: "A character who made the room quiet", hint: "a story told fully", discipline: "drama" },
      { label: "A routine drilled to perfection", hint: "discipline you can see", discipline: "dance" },
      { label: "A melody people hum afterwards", hint: "a sound that stays", discipline: "music" },
    ],
  },
  {
    q: "Your friends would describe you as the one who…",
    options: [
      { label: "Notices what everyone else misses", hint: "the observer's eye", discipline: "visual-arts" },
      { label: "Fixes it, builds it, improves it", hint: "the problem solver", discipline: "design" },
      { label: "Can hold a room with a story", hint: "the storyteller", discipline: "drama" },
      { label: "Literally cannot sit still", hint: "energy in motion", discipline: "dance" },
      { label: "Always has a soundtrack going", hint: "life with a score", discipline: "music" },
    ],
  },
  {
    q: "Ten years from now, you've made it. What does that look like?",
    options: [
      { label: "My first solo exhibition", hint: "walls that speak", discipline: "visual-arts" },
      { label: "My own studio or label", hint: "creating with a team", discipline: "design" },
      { label: "Credits on screen or stage", hint: "a body of roles", discipline: "drama" },
      { label: "Touring with a company", hint: "stages everywhere", discipline: "dance" },
      { label: "Recording and performing live", hint: "music as a life", discipline: "music" },
    ],
  },
];

export const finderResults: Record<
  DisciplineKey,
  { title: string; why: string }
> = {
  "visual-arts": {
    title: "Visual Arts",
    why: "You see what others miss — and you finish what you start. The studio is built for exactly that kind of patience.",
  },
  design: {
    title: "Design",
    why: "You don't just imagine better — you make it real and useful. That instinct turns into briefs, prototypes and real clients here.",
  },
  drama: {
    title: "Dramatic Arts",
    why: "You understand people and you're not afraid of a room. Voice, presence and story — trained weekly, on real stages.",
  },
  dance: {
    title: "Dance Studies",
    why: "Discipline lives in your body already. Technique, choreography and conditioning will give that energy somewhere to go.",
  },
  music: {
    title: "Music",
    why: "The soundtrack is already running. Instrumental and ensemble training turns it into craft — bands, choir, theory and stagecraft.",
  },
};

export function scoreAnswers(answers: (DisciplineKey | null)[]): DisciplineKey {
  const points: Record<DisciplineKey, number> = {
    "visual-arts": 0,
    design: 0,
    drama: 0,
    dance: 0,
    music: 0,
  };
  const lastAt: Record<DisciplineKey, number> = { ...points };

  answers.forEach((a, qi) => {
    if (!a) return;
    points[a] += 1;
    lastAt[a] = qi;
  });

  let best: DisciplineKey = "visual-arts";
  (Object.keys(points) as DisciplineKey[]).forEach((k) => {
    const cur = points[best];
    const cand = points[k];
    if (cand > cur || (cand === cur && lastAt[k] > lastAt[best])) {
      best = k;
    }
  });
  return best;
}
