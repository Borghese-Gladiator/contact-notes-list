
let lastId;

// if null, use default value
if (localStorage.getItem('lastId') === null) {
  lastId = 0;
} else {
  lastId = localStorage.getItem('lastId');
}

export function newId(prefix = 'id') {
  console.log(lastId)
  lastId++;
  localStorage.setItem('lastId', JSON.stringify(lastId));
  return `${prefix}${lastId}`;
}

export const localStorageKey = "listNotesLists"

export function formatDate(date) {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${da} ${mo} ${ye}`;
}