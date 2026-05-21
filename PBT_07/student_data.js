const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let maxStudent = students[0];
let minStudent = students[0];

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

let maleTotal = 0;
let femaleTotal = 0;

let maleCount = 0;
let femaleCount = 0;

console.log("| STT | Tên    | TB   | Xếp loại |");
console.log("|-----|--------|------|-----------|");

for (let i = 0; i < students.length; i++) {

    let s = students[i];

    let avg =
        s.math * 0.4 +
        s.physics * 0.3 +
        s.cs * 0.3;

    s.avg = avg;

    let rank = "";

    if (avg >= 8) {
        rank = "Giỏi";
        gioi++;
    }
    else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    }
    else if (avg >= 5) {
        rank = "Trung bình";
        trungBinh++;
    }
    else {
        rank = "Yếu";
        yeu++;
    }

    console.log(
        `| ${i + 1} | ${s.name} | ${avg.toFixed(1)} | ${rank} |`
    );

    if (avg > maxStudent.avg || maxStudent.avg === undefined) {
        maxStudent = s;
    }

    if (avg < minStudent.avg || minStudent.avg === undefined) {
        minStudent = s;
    }

    totalMath += s.math;
    totalPhysics += s.physics;
    totalCs += s.cs;

    if (s.gender === "M") {
        maleTotal += avg;
        maleCount++;
    }
    else {
        femaleTotal += avg;
        femaleCount++;
    }
}

console.log("\n--- Xếp loại ---");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log("\n--- Cao nhất ---");
console.log(maxStudent.name, maxStudent.avg.toFixed(1));

console.log("\n--- Thấp nhất ---");
console.log(minStudent.name, minStudent.avg.toFixed(1));

console.log("\n--- TB từng môn ---");
console.log("Math:", (totalMath / students.length).toFixed(1));
console.log("Physics:", (totalPhysics / students.length).toFixed(1));
console.log("CS:", (totalCs / students.length).toFixed(1));

console.log("\n--- TB theo giới tính ---");
console.log("Nam:", (maleTotal / maleCount).toFixed(1));
console.log("Nữ:", (femaleTotal / femaleCount).toFixed(1));