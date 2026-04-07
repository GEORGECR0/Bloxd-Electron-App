let size = 5;
let color = 'red';
let thickness = 5;

const crosshair = document.createElement('div');
const fullSize = size * 4;

crosshair.style.position = 'absolute';
crosshair.style.width = `${fullSize}px`;
crosshair.style.height = `${fullSize}px`;
crosshair.style.top = '50%';
crosshair.style.left = '50%';
crosshair.style.transform = 'translate(-50%, -50%)';
crosshair.style.pointerEvents = 'none';
crosshair.style.zIndex = '9999';

crosshair.innerHTML = `
    <div style="
        position: absolute;
        width: ${thickness}px;
        height: 100%;
        background: ${color};
        left: 50%;
        transform: translateX(-50%);
        top: 0;
    "></div>

    <div style="
        position: absolute;
        width: 100%;
        height: ${thickness}px;
        background: ${color};
        top: 50%;
        transform: translateY(-50%);
        left: 0;
    "></div>
`;
document.body.appendChild(crosshair);
