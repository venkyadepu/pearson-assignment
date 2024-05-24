document.addEventListener('DOMContentLoaded', () => {


    // debugger
    
    
    const valuesInPosition = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88];
    const numberLine = document.querySelector('.main-first-cinatiner');


    const firstPointer = document.getElementById('showTheFirstPointer');

    const rightSidePointer = document.getElementById('rightSidePointer');

    const leftSidePointer = document.getElementById('leftSidePointer');
   
    let moveTheCusror = null;

    const sidePointers = [leftSidePointer, rightSidePointer];
    // debugger

    sidePointers.forEach(sidePointer => {
    // debugger
        sidePointer.addEventListener('mousedown', () => {
            moveTheCusror = sidePointer;
            document.body.style.cursor = 'pointer';
        });
    });

    document.addEventListener('mouseup', () => {
        console.log("before checking ",moveTheCusror.body);
        if (moveTheCusror) {
            moveTheCusror = null;
            // debugger
            document.body.style.cursor = 'default';
        }
    });

    document.addEventListener('mousemove', (event) => {
        // debugger
        if (moveTheCusror) {

            // let verticalLine = event.clientX - numberLineRect.left;

            const numberLineRect = numberLine.getBoundingClientRect();
            let verticalLine = event.clientX - numberLineRect.left;
            let percentageValues = (verticalLine / numberLineRect.width) * 100;
            console.log("checking the perecentage",percentageValues);
            // debugger
            if (percentageValues < 0) 
            {
                percentageValues = 0;
            }
            if (percentageValues > 100){
                percentageValues = 96;

            } 
            console.log("After ",percentageValues);
            let roundAboutTick = valuesInPosition.reduce((prev, curr) => {
                return (Math.abs(curr - percentageValues) < Math.abs(prev - percentageValues) ? curr : prev);
            });
            moveTheCusror.style.left = `${roundAboutTick}%`;

            //moveTheCusror.style.left = `${roundAboutTick}%`;
            changingThePointer();
        }
    });

    function changingThePointer() {
        // debugger
       
        const leftSidePoint = parseFloat(leftSidePointer.style.left);
        const rightSidePoint = parseFloat(rightSidePointer.style.left);
        const minimumPoint = Math.min(leftSidePoint, rightSidePoint)-2;
        const maximumPoint = Math.max(leftSidePoint, rightSidePoint)-8;
        // alert(minimumPoint);
        // debugger

        firstPointer.style.left = `${minimumPoint}%`;
        firstPointer.style.width = `${maximumPoint+10 - minimumPoint}%`;
    }

    // First it rendering disply the pointer
    changingThePointer();
});