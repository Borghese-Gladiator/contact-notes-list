
let lastId;

// if null, use default value
if (localStorage.getItem('lastId') === null) {
  lastId = 0;
} else {
  lastId = localStorage.getItem('lastId');
}

export default function (prefix = 'id') {
  console.log(lastId)
  lastId++;
  localStorage.setItem('lastId', JSON.stringify(lastId));
  return `${prefix}${lastId}`;
}