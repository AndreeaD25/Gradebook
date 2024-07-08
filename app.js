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
const butonAdaugareElev = document.getElementById("adauga-elev-btn");
const tabelElevi = document.getElementById("tabel-elevi");
const tabelNote = document.getElementById("tabel-note");
const sectiuneNote = document.getElementById("note-elev-wrapper");
const butonAscundereNote = document.getElementById("ascunde-note");
const containerNoteELev = document.getElementById("note-elev-wrapper");
const butonSortareEleviAscendent = document.getElementById(
  "sortare-ascendent-btn"
);
const butonSortareEleviDescendent = document.getElementById(
  "sortare-descendent-btn"
);

afisareTabel(elevi);
butonAdaugareElev.addEventListener("click", adaugareElevInTabel);
inputNumeElev.addEventListener("keydown", addElevOnPressingEnterKey);
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
    adaugareElevInTabel();
  }
}

function addNoteOnPressingEnterKey(e) {
  if (e.key === "Enter") {
    console.log("se apasa Enter");
    // adaugaNote();
  }
}

function adaugareElevInTabel() {
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
    tableBody.innerHTML += `
    <tr id='elev_${i}'>
        <td>${elevi[i].nume}</td>
        <td>${elevi[i].medie.toFixed(2)}</td>
        <td><button class="vezi-note">Vezi Notele</button></td>
        <td><button class="sterge-elev">X</button></td>
        </tr>
    `;
  }
}

function trateazaActiuniTabelElevi(e) {
  if (e.target.classList.contains("vezi-note")) {
    sectiuneNote.classList.remove("hide");
    const id = e.target.parentElement.parentElement.id;
    const index = id.split("_")[1];
    afiseazaNote(elevi[index]);
  } else if (e.target.classList.contains("sterge-elev")) {
    // e.target.parentElement.parentElement.remove();
    const id = e.target.parentElement.parentElement.id;
    const index = id.split("_")[1];

    elevi.splice(index, 1);
    afisareTabel(elevi);
  }
}

function trateazaActiuniTabelNote(e) {
  if (e.target.classList.contains("sterge-nota")) {
    const idNota = e.target.parentElement.parentElement.id;
    const indexNota = idNota.split("_")[1];

    const idTableBody = e.target.parentElement.parentElement.parentElement.id;
    const indexElev = idTableBody.split("_")[1];

    elevi[indexElev].note.splice(indexNota, 1);
    afiseazaNote(elevi[indexElev]);
  }
}

function ascundeSectiuneNote() {
  sectiuneNote.classList.add("hide");
}

function afiseazaNote(elev) {
  const index = elevi.indexOf(elev);
  const h2NumeElev = containerNoteELev.querySelector("h2");
  h2NumeElev.innerHTML = elev.nume;
  const tableBody = tabelNote.querySelector("tbody");

  tableBody.innerHTML = "";
  for (let i = 0; i <= elev.note.length - 1; i++) {
    tableBody.id = `elev_${index}`;
    // template literals
    tableBody.innerHTML += `
    <tr id='nota_${i}'>
        <td>${elev.note[i].toFixed(2)}</td>
        <td><button class="sterge-nota">X</button></td>
        </tr>
    `;
  }
}
