let sliders = document.querySelectorAll('input[type=range]');
const root = document.documentElement;

for (let slider of sliders) {
    slider.oninput = () => {
        adjustRgb(sliders[0].value, sliders[1].value, sliders[2].value);
    }
}

let adjustRgb = (r, g, b) => {
    root.style.setProperty('--color', `rgb(${r}, ${g}, ${b})`);
}

setRgb = (r, g, b) => {
    adjustRgb(r, g, b);
    sliders[0].value = r;
    sliders[1].value = g;
    sliders[2].value = b;
}

setRgb(255, 170, 0);