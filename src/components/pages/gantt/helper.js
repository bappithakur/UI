const headers = [
  "Pre Irrigation",
  "Land Preparation",
  "Seed Application",
  "Earthing up and Side Dressing",
  "Irrigation",
  "Fertilizer and Micronutrient",
  "Chemical Application",
  "Weeding",
  "Dehaulming",
  "Harvesting",
  "Packing",
];
const dates = [
  "05/01/2022",
  "05/10/2022",
  "05/23/2022",
  "06/18/2022",
  "08/23/2022",
  "09/01/2022",
  "09/20/2022",
  "10/10/2022",
  "10/26/2022",
  "11/05/2022",
  "11/09/2022",
];
let childrens = {
  Pre_Irrigation: ["Labour", "Diesel Electricity"],
  Land_Preparation: [
    "Labour",
    "Lanbour",
    "Rotavating - Diesel",
    "Harrowing - Diesel",
    "Tilling- Diesel",
    "Ridging - Diesel",
    "Rotavating - Disel",
    "Tilling",
    "Harrowing",
    "Ridging",
    "W.C Making",
  ],
  Seed_Application: [
    "Labour",
    "Lanbour",
    "Rotavating - Diesel",
    "Harrowing - Diesel",
    "Tilling- Diesel",
    "Ridging - Diesel",
    "Rotavating - Disel",
    "Tilling",
    "Harrowing",
    "Ridging",
    "W.C Making",
  ],
  Earthing_up_and_Side_Dressing: ["Labour TD/M", "Diesel"],
  Irrigation: ["Labour", "Diesel / Electricity"],
  Fertilizer_and_Micronutrient: [
    "Green Manuare",
    "Urea",
    "MOP",
    "SSP",
    "Zinc Shulphate",
    "Vermi Composed",
    "Tricoderma",
    "Labour",
    "Diesel",
  ],
  Chemical_Application: [
    "Material",
    "Mancozeb",
    "13.0.45",
    "0.0.50",
    "Capbrio Top",
    "Actara",
    "Polyram",
    "Bavistin",
    "Melody",
    "Oberon",
    "Sectin",
    "Curzate",
    "Confidor",
    "Chlorpyifos",
    "Labour M/TD",
    "Diesel",
  ],
  Weeding: ["Labour"],
  Dehaulming: ["Labour"],
  Harvesting: ["Diesel"],
  Packing: ["Bags"],
};

export function initTasks() {
  const currentDate = new Date(dates[0]);
  let tasks = [];
  let order = 0;
  let index = -1;
  for (var value of headers) {
    let headerId = value.replaceAll(" ", "_");
    order = order + 1;
    index = index + 1;
    //const currentDate = new Date(dates[index]);
    const obj = {
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 15
      ),
      name: value,
      id: headerId,
      progress: 200,
      type: "project",
      hideChildren: true,
      displayOrder: order,
    };
    tasks.push(obj);

    for (var children in childrens[headerId]) {
      const label = childrens[headerId][children];
      order = order + 1;
      const childRecord = {
        start: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 2,
          12,
          28
        ),
        name: label,
        id: headerId + "_" + label.replaceAll(" ", "_"),
        progress: Math.floor(Math.random() * (100 - 40 + 1) + 40),
        type: "task",
        project: headerId,
        displayOrder: order,
      };
      tasks.push(childRecord);
    }
  }
  return tasks;
}

export function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
