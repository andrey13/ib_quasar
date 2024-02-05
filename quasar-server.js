const { spawn } = require('child_process');
const path = require('path');

const quasarPath = path.join(__dirname, 'node_modules', '.bin', 'quasar');

console.log('quasarPath = ', quasarPath)

const startQuasar = spawn(quasarPath, ['dev'], { stdio: 'inherit' });

process.on('SIGINT', () => {
    startQuasar.kill();
    process.exit();
});
