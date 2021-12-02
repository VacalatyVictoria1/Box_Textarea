let $area = document.querySelector('.area');
let $btn = document.querySelector('#add-btn');
let action = false;
let distanceX = 0;
let distanceY = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let $selectedBox = 0;
let selectedBoxIndex = 0;

let list = [];

if (localStorage.getItem('boxes')) {
    console.log(1);
    list = JSON.parse(localStorage.getItem('boxes'));
    boxGenerator();
}

function boxController(x, y) {
    $selectedBox.style.cssText = 'transform: translate(' + x + 'px, ' + y + 'px)';
}

function boxGenerator() {
    let template = '';
    for (let i = 0; i < list.length; i++) {
        template += '<div class="box" DNumb="' + i + '" style="transform: translate(' + list[i].x + 'px, ' +
            list[i].y +
            'px)"><textarea class="text_input" cols="24" rows="12">' + list[i].tf + '</textarea></div>';
    }

    $area.innerHTML = template;
    //----------------------------------------------------------
    let l = document.querySelectorAll('.text_input');
    for (let i = 0; i < l.length; i++) {
        l[i].addEventListener('input', function () {
            $selectedBox = this.parentNode;
            if ($selectedBox.classList.contains('box')) {
                selectedBoxIndex = parseFloat($selectedBox.getAttribute('DNumb'));
            }
            list[selectedBoxIndex].tf = this.value;
            localStorage.setItem('boxes', JSON.stringify(list));
            console.log(list);
        })
    }
}
//---------------------------------------------------------        
window.addEventListener('mousedown', function (e) {
    $selectedBox = e.target;
    if ($selectedBox.classList.contains('box')) {
        selectedBoxIndex = parseFloat($selectedBox.getAttribute('DNumb'));
        console.log(selectedBoxIndex);

        action = true;
        x1 = e.clientX;
        y1 = e.clientY;
    }
});
window.addEventListener('mouseup', function (e) {
    if (action) {
        action = false;
        if (list[selectedBoxIndex]) {
            list[selectedBoxIndex].x = distanceX;
            list[selectedBoxIndex].y = distanceY;
            localStorage.setItem('boxes', JSON.stringify(list));
        }
    }
});
window.addEventListener('mousemove', function (e) {
    if (action) {
        x2 = e.clientX;
        y2 = e.clientY;
        distanceX = list[selectedBoxIndex].x + (x2 - x1);
        distanceY = list[selectedBoxIndex].y + (y2 - y1);
        boxController(distanceX, distanceY);
    }
});
$btn.addEventListener('click', function () {
    list.push({
        x: 0,
        y: 0,
        tf: "",
        color: '#fff'
    });
    boxGenerator();
});
