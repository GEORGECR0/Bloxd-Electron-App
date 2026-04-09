//Performance / FPS / Rendering

app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('num-raster-threads', '4');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-oop-rasterization');

//GPU / Graphics Control

app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-webgl');
app.commandLine.appendSwitch('enable-webgl2-compute-context');
app.commandLine.appendSwitch('use-gl', 'desktop'); 
app.commandLine.appendSwitch('use-angle', 'vulkan');
app.commandLine.appendSwitch('force_high_performance_gpu');
app.commandLine.appendSwitch('force_low_power_gpu');

//Network / HTTP

app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('host-resolver-rules', 'MAP * 127.0.0.1');

//Media / Audio / Video

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('use-fake-device-for-media-stream');
app.commandLine.appendSwitch('enable-webrtc');
app.commandLine.appendSwitch('enable-media-stream');

//Experimental Features
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('enable-blink-features', 'CSSBackdropFilter');
app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');

//Background / Throttling

app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-renderer-backgrounding');

//Dev / Debugging

app.commandLine.appendSwitch('remote-debugging-port', '9222');
app.commandLine.appendSwitch('enable-logging');
app.commandLine.appendSwitch('v', '1');
app.commandLine.appendSwitch('log-level', '0');

//Process Model

app.commandLine.appendSwitch('single-process'); 
app.commandLine.appendSwitch('process-per-site');
app.commandLine.appendSwitch('site-per-process');

//Input / UI

app.commandLine.appendSwitch('touch-events', 'enabled');
app.commandLine.appendSwitch('enable-pointer-lock-options');

//Memory / Cache

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');
app.commandLine.appendSwitch('disk-cache-size', '0');
app.commandLine.appendSwitch('media-cache-size', '0');

//Web Platform / APIs

app.commandLine.appendSwitch('enable-webgpu');
app.commandLine.appendSwitch('enable-unsafe-webgpu');
app.commandLine.appendSwitch('enable-web-bluetooth');
app.commandLine.appendSwitch('enable-web-serial');

//Automation / Testing

app.commandLine.appendSwitch('enable-automation');
app.commandLine.appendSwitch('disable-infobars');
app.commandLine.appendSwitch('test-type');

//OS / Platform Tweaks

app.commandLine.appendSwitch('disable-windows10-custom-titlebar');
app.commandLine.appendSwitch('enable-features', 'UseOzonePlatform');
app.commandLine.appendSwitch('ozone-platform', 'wayland');
