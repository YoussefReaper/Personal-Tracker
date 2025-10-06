const ZIG_OPTIONS = { colDirection: 'rtl', pattern: 'DU' };
const orbsContainer = document.querySelector('.tasks-orbs-container');
const upOrbsContainer = document.querySelector('.tasks-orbs-up');
const downOrbsContainer = document.querySelector('.tasks-orbs-down');

let orbsData = [{
    id: 1,
    name: 'Study English',
    dueDate: '12:00 pm',
    duration: 120,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 0,
        name: 'Chapter 3',
        isComplete: false
    }, {
        position: 4,
        name: 'Grammar',
        isComplete: true
    }],

    notes: []
}, {
    id: 2,
    name: 'Study Tajweed',
    dueDate: '4:00 pm',
    duration: 40,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 3,
        name: 'p32-38',
        isComplete: false
    }],

    notes: []
}, {
    id: 3,
    name: "Qur'an Memorization",
    dueDate: 'Friday 5:00 pm',
    duration: 20,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 4,
        name: 'p1-5',
        isComplete: false
    }],

    notes: []
}, {
    id: 4,
    name: 'Ahmed Mohsen',
    dueDate: 'August 24',
    duration: 120,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 0,
        name: 'Ahmed',
        isComplete: false
    }, {
        position: 5,
        name: 'Two Ahmeds',
        isComplete: true
    }],

    notes: []
}, {
    id: 5,
    name: 'Ahmed Mohsen',
    dueDate: 'August 24',
    duration: 120,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 0,
        name: 'Ahmed',
        isComplete: false
    }, {
        position: 5,
        name: 'Two Ahmeds',
        isComplete: true
    }],

    notes: []
}, {
    id: 6,
    name: 'Ahmed Mohsen',
    dueDate: 'August 24',
    duration: 120,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 0,
        name: 'Ahmed',
        isComplete: false
    }, {
        position: 5,
        name: 'Two Ahmeds',
        isComplete: true
    }],

    notes: []
}, {
    id: 7,
    name: 'Ahmed Mohsen',
    dueDate: 'August 24',
    duration: 120,

    taskPriority: 'high',
    isComplete: false,
    taskDesc: 'This is ahmed mohsen so yeah just know that',
    taskCategories: ['important', 'design'],
    progress: 30,

    subtasks: [{
        position: 0,
        name: 'Ahmed',
        isComplete: false
    }, {
        position: 5,
        name: 'Two Ahmeds',
        isComplete: true
    }],

    notes: []
}];

renderOrbs();

function orbCompleted(completedOrb) {
    orbsData = orbsData.filter((orb) => {
        console.log(orb, completedOrb.dataset.id);
        return orb.id !== Number(completedOrb.dataset.id);
    });
    let i = 0;

    orbsData.map((orb) => {
        i++;
        return orb.id = i;
    });

    console.log(orbsData);

    renderOrbs();
    connectOrbsSequential();
}

function renderOrbs() {
    let toRenderUpperOrbs = [];
    let toRenderDownOrbs = [];
    orbsData.forEach((orb) => {
        let subtasksHTML = [];
        orb.subtasks.forEach(subtask => {
            subtasksHTML.push(`
                <div class="subtask-wrapper" style="--i:${subtask.position}; --count:6;">
                    <div class="subtask-orb">${subtask.name}</div>
                </div>
            `);
        });
        if (orb.id % 2 == 1) {
            toRenderUpperOrbs.push(`
                <div class="task-orb" data-id="${orb.id}">
                    <div class="task-info">${orb.name}</div>
                    <div class="task-time">Duration: ${orb.duration}m<br>Due on: ${orb.dueDate}</div>
                    <div class="subtasks">
                        ${subtasksHTML.join('')}
                    </div>
                    <div class="task-panel">
                        <div class="task-header">
                            <h3 class="task-name">${orb.name}</h3>
                            <div class="task-priority">${orb.taskPriority}</div>
                            <div class="completion-mark"></div>
                        </div>
                        <div class="task-body">
                            <h4 class="task-description">${orb.taskDesc}</h4>
                            <div class="task-categories">
                                <span class="task-category">#${orb.taskCategories.join(' #')}</span>
                            </div>
                            <div class="task-time">
                                <span class="task-due-date">${orb.dueDate}</span>
                                <span class="task-duration">${orb.duration}</span>
                            </div>
                            <progress value="${orb.progress}" max="100"></progress>
                        </div>
                        <div class="task-btns">
                            <button class="add-note-btn"></button>
                            <button class="start-tracking-btn"></button>
                        </div>
                    </div>
                </div>
            `)
        } else {
            console.log('Even orb');
            toRenderDownOrbs.push(`
                <div class="task-orb" data-id="${orb.id}">
                    <div class="task-info">${orb.name}</div>
                    <div class="task-time">Duration: ${orb.duration}m<br>Due on: ${orb.dueDate}</div>
                    <div class="subtasks">
                        ${subtasksHTML.join('')}
                    </div>
                    <div class="task-panel">
                        <div class="task-header">
                            <h3 class="task-name">${orb.name}</h3>
                            <div class="task-priority">${orb.taskPriority}</div>
                            <div class="completion-mark"></div>
                        </div>
                        <div class="task-body">
                            <h4 class="task-description">${orb.taskDesc}</h4>
                            <div class="task-categories">
                                <span class="task-category">#${orb.taskCategories.join(' #')}</span>
                            </div>
                            <div class="task-time">
                                <span class="task-due-date">${orb.dueDate}</span>
                                <span class="task-duration">${orb.duration}</span>
                            </div>
                            <progress value="${orb.progress}" max="100"></progress>
                        </div>
                        <div class="task-btns">
                            <button class="add-note-btn"></button>
                            <button class="start-tracking-btn"></button>
                        </div>
                    </div>
                </div>
            `)
        }
    });

    upOrbsContainer.innerHTML = toRenderUpperOrbs.join('');
    downOrbsContainer.innerHTML = toRenderDownOrbs.join('');
}

function connectOrbsSequential() {
    const scrollBox = orbsContainer;
    const upOrbs = upOrbsContainer.querySelectorAll(".task-orb");
    const downOrbs = downOrbsContainer.querySelectorAll(".task-orb");
    const svg = document.querySelector(".task-lines");

    svg.setAttribute("width", scrollBox.scrollWidth);
    svg.setAttribute("height", scrollBox.scrollHeight);
    svg.innerHTML = "";

    for (let i = 0; i < Math.min(upOrbs.length, downOrbs.length); i++) {
        const up = upOrbs[i];
        const down = downOrbs[i];

        const upX = up.offsetLeft + up.offsetWidth / 2;
        const upY = up.offsetTop + up.offsetHeight / 2;
        const downX = down.offsetLeft + down.offsetWidth / 2;
        const downY = down.offsetTop + down.offsetHeight / 2;

        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", upX);
        line1.setAttribute("y1", upY);
        line1.setAttribute("x2", downX);
        line1.setAttribute("y2", downY);
        svg.appendChild(line1);

        if (i + 1 < upOrbs.length) {
            const nextUp = upOrbs[i + 1];
            const nextUpX = nextUp.offsetLeft + nextUp.offsetWidth / 2;
            const nextUpY = nextUp.offsetTop + nextUp.offsetHeight / 2;

            const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("x1", downX);
            line2.setAttribute("y1", downY);
            line2.setAttribute("x2", nextUpX);
            line2.setAttribute("y2", nextUpY);
            svg.appendChild(line2);
        }
    }
}

connectOrbsSequential();
window.addEventListener("resize", connectOrbsSequential);
document.querySelector(".tasks-orbs-container").addEventListener("scroll", connectOrbsSequential);

function moveOrbAlongLine(upOrb, downOrb) {
    const upX = upOrb.offsetLeft + upOrb.offsetWidth / 2;
    const upY = upOrb.offsetTop + upOrb.offsetHeight / 2;
    const downX = downOrb.offsetLeft + downOrb.offsetWidth / 2;
    const downY = downOrb.offsetTop + downOrb.offsetHeight / 2;

    const dx = downX - upX;
    const dy = downY - upY;

    upOrb.style.transform = `translate(${dx}px, ${dy}px)`;
}

function getPreviousOrb(currentOrb, upNodes, downNodes, options = { colDirection: 'ltr', pattern: 'UD' }) {
    const upArr = Array.from(upNodes);
    const downArr = Array.from(downNodes);
    const upCount = upArr.length;
    const downCount = downArr.length;

    const seq = buildZigzagSequence(upCount, downCount, options);

    const uIdx = upArr.indexOf(currentOrb);
    const dIdx = downArr.indexOf(currentOrb);
    if (uIdx === -1 && dIdx === -1) return null;

    const globalIdx = (uIdx !== -1) ? uIdx : (upCount + dIdx);

    const pos = seq.indexOf(globalIdx);
    if (pos <= 0) return null;
    const prevGlobal = seq[pos - 1];

    if (prevGlobal < upCount) return upArr[prevGlobal];
    return downArr[prevGlobal - upCount];
}

function buildZigzagSequence(upCount, downCount, options = { colDirection: 'ltr', pattern: 'UD' }) {
    const seq = [];
    const m = Math.max(upCount, downCount);

    for (let c = 0; c < m; c++) {
        const col = options.colDirection === 'ltr' ? c : (m - 1 - c);

        if (options.pattern === 'UD') {
        if (col < upCount) seq.push(col);
        if (col < downCount) seq.push(upCount + col);
        } else {
        if (col < downCount) seq.push(upCount + col);
        if (col < upCount) seq.push(col);
        }
    }
    return seq;
}

document.addEventListener('click', e => {
    if (e.target.closest('.task-orb')) {
        const task = e.target;
        const upOrbs = Array.from(document.querySelectorAll('.tasks-orbs-up .task-orb'));
        const downOrbs = Array.from(document.querySelectorAll('.tasks-orbs-down .task-orb'));
        const seq = buildZigzagSequence(upOrbs.length, downOrbs.length, ZIG_OPTIONS);

        const uIdx = upOrbs.indexOf(task);
        const dIdx = downOrbs.indexOf(task);
        const globalIdx = (uIdx !== -1) ? uIdx : (upOrbs.length + dIdx);

        const pos = seq.indexOf(globalIdx);

        const prevSeq = seq.slice(0, pos);
        const chain = prevSeq.map(gid =>
            gid < upOrbs.length ? upOrbs[gid] : downOrbs[gid - upOrbs.length]
        ).reverse();
        
        let time;

        const animationDuration = 200;

        chain.forEach((orb, i) => {
            const target = (i === 0) ? task : chain[i - 1];
            setTimeout(() => {
                moveOrbAlongLine(orb, target);
            }, i * 200);
            time = i * 200;
        });

        task.style.opacity = 0;

        setTimeout(() => orbCompleted(task), time + animationDuration);
        console.log(
            `Deleted Orb ${task}`
        );
    }
})

// function addClickEventToOrbs() {
//     const allOrbs = document.querySelectorAll('.task-orb');
//     allOrbs.forEach(task => {
//         task.addEventListener('click', () => {
//             const upOrbs = Array.from(document.querySelectorAll('.tasks-orbs-up .task-orb'));
//             const downOrbs = Array.from(document.querySelectorAll('.tasks-orbs-down .task-orb'));
//             const seq = buildZigzagSequence(upOrbs.length, downOrbs.length, ZIG_OPTIONS);

//             const uIdx = upOrbs.indexOf(task);
//             const dIdx = downOrbs.indexOf(task);
//             const globalIdx = (uIdx !== -1) ? uIdx : (upOrbs.length + dIdx);

//             const pos = seq.indexOf(globalIdx);

//             const prevSeq = seq.slice(0, pos);
//             const chain = prevSeq.map(gid =>
//                 gid < upOrbs.length ? upOrbs[gid] : downOrbs[gid - upOrbs.length]
//             ).reverse();

//             chain.forEach((orb, i) => {
//                 const target = (i === 0) ? task : chain[i - 1];
//                 moveOrbAlongLine(orb, target);
//             });

//             console.log(
//                 `Deleted Orb ${task}`
//             );

//             setTimeout(() => orbCompleted(task), 2000);
//         });
//     });
// }


connectOrbsSequential();