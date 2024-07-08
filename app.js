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
const sectiuneNote = document.getElementById("note-elev-wrapper");
const butonAscundereNote = document.getElementById("ascunde-note");

afisareTabel(elevi);
butonAdaugareElev.addEventListener("click", adaugareElevInTabel);
tabelElevi.addEventListener("click", trateazaActiuniTabel);
butonAscundereNote.addEventListener("click", ascundeSectiuneNote);

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
    <tr>
        <td>${elevi[i].nume}</td>
        <td>${elevi[i].medie.toFixed(2)}</td>
        <td><button class="vezi-note">Vezi Notele</button></td>
        <td><button class="sterge-elev">X</button></td>
        </tr>
    `;
  }
}

function trateazaActiuniTabel(e) {
  if (e.target.classList.contains("vezi-note")) {
    sectiuneNote.classList.remove("hide");
  }
}

function ascundeSectiuneNote() {
  sectiuneNote.classList.add("hide");
}
