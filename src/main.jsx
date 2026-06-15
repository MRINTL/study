import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'frontend-roadmap-progress-v1';

const roadmap = [
  {
    month: 'Month 1',
    title: 'React + TypeScript Base',
    weeks: [
      {
        title: 'Week 1 — React Core',
        items: [
          'State, props, re-render',
          'Lists, key, conditional render',
          'Immutability: arrays and objects',
          'Practice: User List + filters'
        ]
      },
      {
        title: 'Week 2 — Forms + useEffect',
        items: [
          'Controlled components',
          'useEffect basics',
          'Loading, error, empty state',
          'Practice: Search + form validation'
        ]
      },
      {
        title: 'Week 3 — TypeScript for React',
        items: [
          'Props typing',
          'Event typing',
          'Union, generics, utility types',
          'Practice: typed reusable components'
        ]
      },
      {
        title: 'Week 4 — Interview Checkpoint',
        items: [
          'React interview questions',
          'TypeScript interview questions',
          'Live coding: arrays, objects, strings',
          'Mini project review'
        ]
      }
    ]
  },
  {
    month: 'Month 2',
    title: 'API + State Management',
    weeks: [
      {
        title: 'Week 5 — REST + Async JS',
        items: [
          'fetch, async/await, Promise',
          'GET, POST, PUT, PATCH, DELETE',
          'HTTP statuses',
          'Practice: CRUD with API'
        ]
      },
      {
        title: 'Week 6 — Context API',
        items: [
          'Prop drilling',
          'Context provider',
          'Custom hooks',
          'Practice: theme + auth context'
        ]
      },
      {
        title: 'Week 7 — Redux Toolkit',
        items: [
          'Store, slice, reducer, action',
          'Selectors',
          'Async state pattern',
          'Practice: cart or favorites'
        ]
      },
      {
        title: 'Week 8 — Interview Checkpoint',
        items: [
          'Context vs Redux',
          'API error handling',
          'Live coding: debounce, groupBy, unique',
          'Mini project review'
        ]
      }
    ]
  },
  {
    month: 'Month 3',
    title: 'Next.js + Market Readiness',
    weeks: [
      {
        title: 'Week 9 — Next.js Basics',
        items: [
          'Routing',
          'Server vs Client Components',
          'SSR, SSG, CSR',
          'Practice: mini blog'
        ]
      },
      {
        title: 'Week 10 — Security + Git',
        items: [
          'XSS, CSRF, CORS',
          'Cookies vs LocalStorage',
          'JWT basics',
          'Git workflow'
        ]
      },
      {
        title: 'Week 11 — Architecture',
        items: [
          'Feature-based structure',
          'API layer',
          'Reusable UI',
          'Practice: refactor project structure'
        ]
      },
      {
        title: 'Week 12 — Final Preparation',
        items: [
          'Mock interview',
          'Live coding review',
          'Portfolio polish',
          'Final project checklist'
        ]
      }
    ]
  }
];

function getInitialProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function App() {
  const [progress, setProgress] = useState(getInitialProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const allItems = useMemo(
    () => roadmap.flatMap(month => month.weeks.flatMap(week => week.items.map(item => `${week.title}:${item}`))),
    []
  );

  const completed = allItems.filter(id => progress[id]).length;
  const percent = Math.round((completed / allItems.length) * 100);

  const toggleItem = id => {
    setProgress(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetProgress = () => {
    setProgress({});
  };

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="label">3 months / 1–2h / 3–4x week</p>
          <h1>Frontend Roadmap</h1>
        </div>
        <button className="reset" onClick={resetProgress}>Reset</button>
      </header>

      <section className="progress">
        <div className="progressTop">
          <span>{completed}/{allItems.length}</span>
          <span>{percent}%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="grid">
        {roadmap.map(month => (
          <article className="month" key={month.month}>
            <p className="label">{month.month}</p>
            <h2>{month.title}</h2>

            {month.weeks.map(week => (
              <div className="week" key={week.title}>
                <h3>{week.title}</h3>
                <ul>
                  {week.items.map(item => {
                    const id = `${week.title}:${item}`;
                    return (
                      <li key={id}>
                        <label className={progress[id] ? 'done' : ''}>
                          <input
                            type="checkbox"
                            checked={Boolean(progress[id])}
                            onChange={() => toggleItem(id)}
                          />
                          <span>{item}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
