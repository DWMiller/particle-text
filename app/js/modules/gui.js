const addGui = () => {
  var gui = new dat.GUI({
    autoPlace: false,
  });

  document.getElementById('gui').appendChild(gui.domElement);

  gui.add(config, 'text').listen().onFinishChange(onTextChange).name('Text');
  gui.add(config, 'fontFace').onFinishChange(onTextChange).name('Font');
  gui
    .add(config, 'baseFontSize', {
      Small: 100,
      Normal: 500,
      Large: 1000,
    })
    .name('Font Size')
    .onFinishChange(onTextChange);
  gui.add(window, 'disperseParticles').name('Disperse');
};
