const elevi = [
  { nume: "Maria Ionescu", note: [8, 9, 10], medie: (8 + 9 + 10) / 3 },
  { nume: "Andrei Vasilescu", note: [7, 8, 6], medie: (7 + 8 + 6) / 3 },
  { nume: "Elena Popa", note: [10, 9, 8], medie: (10 + 9 + 8) / 3 },
  { nume: "Mihai Dumitrescu", note: [6, 7, 8], medie: (6 + 7 + 8) / 3 },
  { nume: "Adriana Georgescu", note: [9, 9, 10], medie: (9 + 9 + 10) / 3 },
  { nume: "Ionela Marinescu", note: [8, 7, 6], medie: (8 + 7 + 6) / 3 },
  { nume: "Gabriel Pop", note: [10, 10, 9], medie: (10 + 10 + 9) / 3 },
  { nume: "Radu Neagu", note: [5, 7, 6], medie: (5 + 7 + 6) / 3 },
  { nume: "Alina Bălan", note: [9, 8, 7], medie: (9 + 8 + 7) / 3 },
  { nume: "Florin Stanciu", note: [8, 8, 8], medie: (8 + 8 + 8) / 3 },
  { nume: "Cristina Munteanu", note: [10, 10, 10], medie: (10 + 10 + 10) / 3 },
  { nume: "Victor Rusu", note: [7, 6, 5], medie: (7 + 6 + 5) / 3 },
  { nume: "Oana Tudor", note: [8, 9, 8], medie: (8 + 9 + 8) / 3 },
  { nume: "Dan Matei", note: [7, 8, 9], medie: (7 + 8 + 9) / 3 },
  { nume: "Laura Ilie", note: [9, 9, 9], medie: (9 + 9 + 9) / 3 },
];

const inputNumeElev = document.getElementById("nume-elev-input");
const inputNota = document.getElementById("adauga-nota-btn");
const butonAdaugareElev = document.getElementById("adauga-elev-btn");
const tabelElevi = document.getElementById("tabel-elevi");
const tabelNote = document.getElementById("tabel-note");
const sectiuneNote = document.getElementById("note-elev-wrapper");
const butonAscundereNote = document.getElementById("ascunde-note");
const containerNoteElev = document.getElementById("note-elev-wrapper");
const butonAdaugareNotaElev = document.getElementById("adauga-nota-btn");
const butonSortareEleviAscendent = document.getElementById(
  "sortare-ascendent-btn"
);
const butonSortareEleviDescendent = document.getElementById(
  "sortare-descendent-btn"
);
const nota = [];

afisareTabel(elevi);

butonAdaugareElev.addEventListener("click", butonAdaugareElevInTabel);
inputNumeElev.addEventListener("keydown", addElevOnPressingEnterKey);
butonAdaugareNotaElev.addEventListener("click", function () {
  adaugaNote();
});
containerNoteElev.addEventListener("keydown", addNoteOnPressingEnterKey);
tabelElevi.addEventListener("click", trateazaActiuniTabelElevi);
tabelNote.addEventListener("click", trateazaActiuniTabelNote);
butonAscundereNote.addEventListener("click", ascundeSectiuneNote);
butonSortareEleviAscendent.addEventListener("click", function () {
  sortTable(true);
});
butonSortareEleviDescendent.addEventListener("click", function () {
  sortTable(false);
});

function sortTable(ascending) {
  const table = document
    .getElementById("tabel-elevi")
    .getElementsByTagName("tbody")[0];
  const rows = Array.from(table.rows);

  rows.sort((a, b) => {
    const mediaA = parseFloat(a.cells[1].innerText);
    const mediaB = parseFloat(b.cells[1].innerText);

    return ascending ? mediaA - mediaB : mediaB - mediaA;
  });

  rows.forEach((row) => table.appendChild(row));
}

function addElevOnPressingEnterKey(e) {
  if (e.key === "Enter") {
    butonAdaugareElevInTabel();
  }
}

function addNoteOnPressingEnterKey(e) {
  if (e.key === "Enter") {
    console.log("se apasa Enter");
    adaugaNote();
  }
}

function butonAdaugareElevInTabel() {
  const numeElev = inputNumeElev.value;
  if (numeElev.length > 2) {
    elevi.push({ nume: numeElev, medie: 0, note: [] });
  } else {
    alert("Numele elevului trebuie sa contina minim 3 caractere");
  }
  afisareTabel(elevi);
}

function afisareTabel(elevi) {
  const tableBody = tabelElevi.querySelector("tbody");

  tableBody.innerHTML = "";

  for (let i = 0; i <= elevi.length - 1; i++) {
    // template literals

    tableBody.innerHTML += `
        <tr id='elev_${i}'>
          <td>${elevi[i].nume}</td>
          <td>${elevi[i].medie.toFixed(2)}</td>
          <td><button class='vezi-note'>Vezi Notele</button></td>
          <td><button class='sterge-elev'>X</button></td>
        </tr>
    `;
  }
}

function trateazaActiuniTabelElevi(e) {
  // console.log(e.target);
  // daca evenimentul(target) pe care am dat click are o lista de clase -vezi note- atunci se ia o actiune aici, adica s a apasat butonul
  // reafisare sau rerandare
  if (e.target.classList.contains("vezi-note")) {
    sectiuneNote.classList.remove("hide");
    const id = e.target.parentElement.parentElement.id;
    const index = id.split("_")[1];
    afiseazaNote(elevi[index]);
  } else if (e.target.classList.contains("sterge-elev")) {
    // cum stergi o linie

    // e.target.parentElement.parentElement.remove();

    // afiseaza elevul cu nr..care se sterge
    const id = e.target.parentElement.parentElement.id;
    // console.log(id);
    // split imparte un string de genul elev_1, intr un array de cate elemente are
    const index = id.split("_")[1];
    // 'elev_1'
    // ['elev', '1'] - asta face split-ul
    // console.log(index);
    // cum stergi un element dintr un array:
    elevi.splice(index, 1);
    // console.log(elevi);
    afisareTabel(elevi);
  }
}

function trateazaActiuniTabelNote(e) {
  if (e.target.classList.contains("sterge-nota")) {
    const idNota = e.target.parentElement.parentElement.id;
    const indexNota = idNota.split("_")[1];

    const idTableBody = e.target.parentElement.parentElement.parentElement.id;
    const indexElev = idTableBody.split("_")[1];
    // console.log(indexElev, indexNota);

    // stergi un element cu splice
    elevi[indexElev].note.splice(indexNota, 1);
    afiseazaNote(elevi[indexElev]);
  }
}

function ascundeSectiuneNote() {
  sectiuneNote.classList.add("hide");
}

function afiseazaNote(elev) {
  const index = elevi.indexOf(elev);
  console.log(index);
  const h2NumeElev = containerNoteElev.querySelector("h2");
  h2NumeElev.innerHTML = elev.nume;
  const tableBody = tabelNote.querySelector("tbody");

  tableBody.innerHTML = "";
  for (let i = 0; i <= elev.note.length - 1; i++) {
    tableBody.id = `elev_${index}`;
    // template literals
    // adaugare html
    tableBody.innerHTML += `
        <tr id='nota_${i}'>
          <td>${elev.note[i].toFixed(2)}</td>
          <td><button class='sterge-nota'>X</button></td>
        </tr>
    `;
  }
  nota.push({
    nota: nota,
  });
}

function adaugaNote() {
  const gradeInput = document.getElementById("newGrade");
  const gradeValue = parseFloat(gradeInput.value);

  if (!isNaN(gradeValue) && gradeValue >= 1 && gradeValue <= 10) {
    const tabelNote = document
      .getElementById("tabel-note")
      .getElementsByTagName("tbody")[0];
    const newRow = tabelNote.insertRow();

    // inseram nota
    const cell1 = newRow.insertCell(0);
    cell1.innerText = gradeValue;

    // adaugam un buton de stergere
    const cell2 = newRow.insertCell(1);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", function () {
      tabelNote.deleteRow(newRow.rowIndex - 1);
      updateAverage();
    });

    cell2.appendChild(deleteButton);

    // resetam campul de input
    gradeInput.value = "";

    // actualizam media
    updateAverage();
  } else {
    alert("Introduceti o nota valida intre 1 si 10");
  }
}

function updateAverage() {
  const tabelNote = document
    .getElementById("tabel-note")
    .getElementsByTagName("tbody")[0];
  const rows = tabelNote.rows;
  let total = 0;

  for (let i = 0; i < rows.length; i++) {
    total += parseFloat(rows[i].cells[0].innerText);
  }

  const average = rows.length ? (total / rows.length).toFixed(2) : 0;

  // actualizam media in sectiunea de note
  document.getElementById("numeElev").dataset.average = average;

  // actualizam media in tabelul principal
  const numeElev = document.getElementById("numeElev").innerText;
  const tabelElevi = document
    .getElementById("tabel-elevi")
    .getElementsByTagName("tbody")[0];
  for (let i = 0; i < tabelElevi.rows.length; i++) {
    if (tabelElevi.rows[i].cells[0].innerText === numeElev) {
      tabelElevi.rows[i].cells[1].innerText = average;
      break;
    }
  }
}

// functia se apeleaza cand se apasa pe vezi notele
function veziNote(numeElev) {
  // actualizam sectiune de note pentru elevul selectat
  document.getElementById('"nume-elev"');

  const tabelNote = document
    .getElementById("tabel-note")
    .getElementsByTagName("tbody")[0];
  // goleste tabelul de note
  tabelNote.innerHTML = "";

  const noteElev = getNoteElev(numeElev);

  noteElev.forEach((nota) => {
    const newRow = tabelNote.insertRow();

    const cell1 = newRow.insertCell(0);
    cell1.innerText = nota;

    const cell2 = newRow.insertCell(1);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", function () {
      tabelNote.deleteRow(newRow.rowIndex - 1);
      updateAverage();
    });

    cell2.appendChild(deleteButton);
  });
  // actualizam media initiala
  updateAverage();
}
