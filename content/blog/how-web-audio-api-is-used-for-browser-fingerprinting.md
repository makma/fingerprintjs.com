---
templateKey: long-form-content
metadata:
  title: How the Web Audio API is used for audio fingerprinting
  url: https://fingerprint.com/blog/audio-fingerprinting
  image: /img/uploads/audio-fp-hero.png
  description: Audio Fingerprinting is used to uniquely identify visitors without
    cookies. A deep dive into this highly stable browser fingerprinting
    technique.
  imageAlt: Audio fingerprinting
  imageTitle: Audio fingerprinting
featured: true
publishDate: 2021-03-18T13:12:29.612Z
title: How the Web Audio API is used for audio fingerprinting
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - js
  - engineering
  - web
authors:
  - Savannah Copland
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
Did you know you can identify web browsers without cookies or asking for permissions?

[Browser fingerprinting](https://fingerprint.com/blog/browser-fingerprinting-techniques/) works by reading browser attributes and combining them into a single identifier removing the need for cookies or asking for permission. This identifier is stateless and works well in normal and incognito modes.

![Graphic of browser fingerprinting](/img/uploads/audio-fp-browser-fingerprinting-image.png "Graphic of browser fingerprinting")

When generating a browser identifier, we can read browser attributes directly or use attribute processing techniques first. One of the creative techniques that we’ll discuss today is audio fingerprinting.

# Audio fingerprinting

Audio fingerprinting is a valuable technique because it is relatively unique and stable. Its uniqueness comes from the internal complexity and sophistication of the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). It is stable because the audio source we’ll use is a sequence of numbers generated mathematically and when combined into a single audio fingerprint value.

Before we dive into the technical implementation, we need to understand a few ideas from the Web Audio API and its building blocks.

# A brief overview of the Web Audio API

The Web Audio API is a powerful system for handling audio operations. Designed to work inside an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext), the Web Audio API links together audio nodes and builds an audio graph. A single AudioContext can handle multiple types of audio sources that plug into other nodes and form chains of audio processing.

![Graphic of audio context](/img/uploads/audio-fp-audio-context-diagram.png "Graphic of audio context")

A source can be an <tt>audio</tt> element, a stream, or an in-memory source generated mathematically with an <tt>Oscillator</tt>. We’ll use the <tt>Oscillator</tt> for our purposes and then connect it to other nodes for additional processing.\
\
Before we dive into the audio fingerprint implementation details, it’s helpful to review all of the building blocks of the API that we’ll be using.

## AudioContext

<tt>AudioContext</tt> represents an entire chain built from audio nodes linked together. It controls the nodes’ creation and the audio processing execution. You always start by creating an instance of <tt>AudioContext</tt> before you do anything else. It’s a good practice to create a single <tt>AudioContext</tt> instance and reuse it for all future processing.\
\
<tt>AudioContext</tt> has a destination property representing the destination of all audio from that context.\
\
There also exists a special type of <tt>AudioContext</tt>: <tt>OfflineAudioContext</tt>. The main difference is that it does not render the audio to the device hardware. Instead, it generates the audio as fast as possible and saves it into an [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer). Thus, the destination of the OfflineAudioContext will be an in-memory data structure, while with a regular AudioContext, the destination will be an audio-rendering device.\
\
When creating an instance of <tt>OfflineAudioContext</tt>, we pass <tt>three</tt> arguments:

* The number of channels
* The total number of samples
* A sample rate in samples per second

```javascript
const AudioContext = 
  window.OfflineAudioContext ||
  window.webkitOfflineAudioContext
const context = new AudioContext(1, 5000, 44100)
```

## AudioBuffer

An <tt>AudioBuffer</tt> is a small audio snippet stored within memory. Data of that snippet is represented internally in Linear PCM, with each sample represented by a <tt>32</tt>-bit float between <tt>-1.0</tt> and <tt>1.0.</tt>
It can hold multiple channels, but for our purposes we’ll use only one.

![Diagram of 32-bit numbers](/img/uploads/audio-fp-32-bits-numbers-diagram.png "Diagram of 32-bit numbers")

## Oscillator

When working with audio, we always need a source. An <tt>An oscillator</tt> is a good candidate because it generates samples mathematically, unlike playing an audio file.  <tt>An oscillator</tt> generates a periodic waveform with a specified frequency in its simplest form.\
\
The default shape is a sine wave.

<iframe style ="width: calc(100% + 24px); height: 380px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/blog-audio-fingerprinting-demo/?demo=oscillator-options" frameborder="no"> 
</iframe>

It’s also possible to generate other waves, such as square, sawtooth, and triangle.\
\
The default frequency is <tt>440</tt> Hz, which is a standard A4 note.

## Compressor

The Web Audio API provides a <tt>DynamicsCompressorNode</tt>, which lowers the volume of the loudest parts of the signal and helps prevent distortion or clipping.\
\
<tt>DynamicsCompressorNode</tt> has many exciting properties that we’ll use. These properties will help create more variability between browsers.

* **Threshold:** value in decibels above which the compressor will start taking effect.
* **Knee:** value in decibels representing the range above the threshold where the curve smoothly transitions to the compressed portion.
* **Ratio:** The amount of input change, in dB, needed for a <tt>1</tt> dB change in the output.
* **Reduction:** The float represents the amount of gain reduction currently applied by the compressor to the signal.
* **Attack:** the amount of time, in seconds, required to reduce the gain by <tt>10</tt> dB. This value can be a decimal.
* **Release:** the amount of time, in seconds, required to increase the gain by <tt>10</tt> dB.

<iframe style ="width: calc(100% + 24px); height: 580px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/blog-audio-fingerprinting-demo/?demo=dynamics-compressor-options" frameborder="no"> 
</iframe>

## How to calculate an audio fingerprint

Now that we have all the concepts we need, we can start working on our audio fingerprinting code.\
\
Safari doesn’t support unprefixed <tt>OfflineAudioContext</tt>, but does support 
<tt>webkitOfflineAudioContext</tt>, so we’ll use this method to make it work in Chrome and Safari:

```javascript
const AudioContext =
  window.OfflineAudioContext ||
  window.webkitOfflineAudioContex
```

Now we create an <tt>AudioContext</tt> instance. We’ll use one channel, a <tt>44,100</tt> sample rate and <tt>5,000</tt> samples total, which will make it about <tt>113</tt> ms long.

```javascript
const context = new AudioContext(1, 5000, 44100)
```

Next let’s create a sound source - an <tt>oscillator</tt> instance. It will generate a triangular-shaped sound wave that will fluctuate <tt>1,000</tt> times per second (<tt>1,000 Hz</tt>).

```javascript
const oscillator = context.createOscillator()
oscillator.type = "triangle"
oscillator.frequency.value = 1000
```

Now let’s create a compressor to add more variety and transform the original signal. Note that the values for all these parameters are arbitrary and meant to change the source signal in interesting ways. We could use other values, and it would still work.

```javascript
const compressor = context.createDynamicsCompressor()
compressor.threshold.value = -50
compressor.knee.value = 40
compressor.ratio.value = 12
compressor.reduction.value = 20
compressor.attack.value = 0
compressor.release.value = 0.2
```

Let’s connect our nodes together: <tt>oscillator</tt> to <tt>compressor</tt>, and compressor to the context destination.

```javascript
oscillator.connect(compressor)
compressor.connect(context.destination);
```

It is time to generate the audio snippet. We’ll use the <tt>oncomplete</tt> event to get the result when it’s ready.

```javascript
oscillator.start()
context.oncomplete = event => {
  // We have only one channel, so we get it by index
  const samples = event.renderedBuffer.getChannelData(0)
};
context.startRendering()
```

<tt>Samples</tt> is an array of floating-point values that represents the uncompressed sound. Now we need to calculate a single value from that array.\
\
Let’s do it by simply summing up a slice of the array values:

```javascript
function calculateHash(samples) {
  let hash = 0
  for (let i = 0; i < samples.length; ++i) {
    hash += Math.abs(samples[i])
  }
  return hash
}

console.log(calculateHash(samples))
```

Now we are ready to generate the audio fingerprint. When I run it on Chrome on MacOS I get the value:

* **<tt>101.45647543197447</tt>**

That’s all there is to it. Our audio fingerprint is this number!\
\
You can check out a <a href="https://github.com/fingerprintjs/fingerprintjs/blob/3201a7d61bb4df2816c226d8364cc98bb4235e59/src/sources/audio.ts" target="_blank" rel="noopener"><span>production implementation</span></a> in our open source browser fingerprinting library.\
\
If I try executing the code in Safari, I get a different number:

* **<tt>79.58850509487092</tt>**

And get another unique result in Firefox:

* **<tt>80.95458510611206</tt>**

Every browser we have on our testing laptops generates a different value. However, this value is stable and remains the same in incognito mode.\
\
**This value depends on the underlying hardware and OS, and in your case, may be different.**

## Why the audio fingerprint varies by browser

Let’s look at why the values differ in different browsers. First, we’ll examine a single oscillation wave in Chrome and Firefox.\
\
First, let’s reduce the duration of our audio snippet to <tt>1/2000th</tt> of a second, corresponding to a single wave, and examine the values that make up that wave.\
\
We need to change our context duration to <tt>23</tt> samples, which roughly corresponds to a <tt>1/2000th</tt> of a second. We’ll skip the compressor and only examine the differences in the unmodified <tt>oscillator</tt> signal.

```javascript
const context = new AudioContext(1, 23, 44100)
```

Here is how a single triangular oscillation looks in both Chrome and Firefox now:

![Graphic of a single oscillation](/img/uploads/triangular_oscillation.png "Graphic of a single oscillation")

However, the underlying values are different between the two browsers (I’m showing only the first <tt>3</tt> values for simplicity):

| <tt>**Chrome:**</tt>         | <tt>**Firefox:**</tt>        |
| ---------------------------- | ---------------------------- |
| <tt>0.08988945186138153</tt> | <tt>0.09155717492103577</tt> |
| <tt>0.18264609575271606</tt> | <tt>0.18603470921516418</tt> |
| <tt>0.2712443470954895</tt>  | <tt>0.2762767672538757</tt>  |

Let’s take a look at this demo to visually see those differences.

<iframe style ="width: calc(100% + 24px); height: 500px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/blog-audio-fingerprinting-demo/?demo=difference" frameborder="no"> 
</iframe>

Historically, all major browser engines (Blink, WebKit, and Gecko) based their Web Audio API implementations on code originally developed by Google in 2011 and 2012 for the WebKit project.

Examples of Google contributions to the Webkit project include:

* [OfflineAudioContext](https://github.com/WebKit/WebKit/commit/d187ecab7b152962465c23be04ab7ed3ef70f382)
* [OscillatorNode](https://github.com/WebKit/WebKit/commit/fad97bfb064446f78c78338104fb3f22be666cbb)
* [DynamicsCompressorNode](https://github.com/WebKit/WebKit/commit/6f2b47e87bc414001affb258048749130bc91083)

\
Since then browser developers have made a lot of small changes. These changes, compounded by the large number of mathematical operations involved, lead to fingerprinting differences. Audio signal processing uses floating point arithmetic, which also contributes to discrepancies in calculations.\
\
You can see how these things are implemented now in the three major browser engines:

* Blink: [oscillator](https://github.com/chromium/chromium/blob/9841ee86b710dc649cf41772f560600324cadf45/third_party/blink/renderer/modules/webaudio/periodic_wave.cc#L468), [dynamics compressor](https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/dynamics_compressor_kernel.cc#L202)
* WebKit: [oscillator](https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/Modules/webaudio/PeriodicWave.cpp#L250), [dynamics compressor](https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/platform/audio/DynamicsCompressorKernel.cpp#L188)
* Gecko: [oscillator](https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/PeriodicWave.cpp#L286), [dynamics compressor](https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/DynamicsCompressorKernel.cpp#L213)

Additionally, browsers use different implementations for different CPU architectures and OSes to leverage features like [SIMD](https://en.wikipedia.org/wiki/SIMD). For example, Chrome uses [a separate fast Fourier transform implementation](https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/mac/fft_frame_mac.cc) on macOS (producing a different oscillator signal) and [other vector operation implementations](https://github.com/chromium/chromium/tree/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/cpu) on different CPU architectures (used in the DynamicsCompressor implementation). These platform-specific changes also contribute to differences in the final audio fingerprint.

Fingerprint results also depend on the Android version (it’s different in Android 9 and 10 on the same devices, for example).

According to browser source code, audio processing doesn’t use dedicated audio hardware or OS features—the CPU does all calculations.

## Pitfalls

When we started to use audio fingerprinting in production, we aimed to achieve good browser compatibility, stability, and performance. We also looked at privacy-focused browsers, such as Tor and Brave, for high browser compatibility.

### OfflineAudioContext

As you can see on [caniuse.com](https://caniuse.com/mdn-api_offlineaudiocontext), <tt>OfflineAudioContext</tt> works almost everywhere. But some cases need special handling.

The first case is iOS 11 or older. It does support <tt>OfflineAudioContext</tt>, but the rendering only starts if [triggered by a user action](https://stackoverflow.com/a/46534088/1118709), for example, by a button click. If <tt>context.startRendering</tt> is not triggered by a user action, the <tt>context.state</tt> will be suspended, and the rendering will hang indefinitely unless you add a timeout. Not many users still use this iOS version, so we decided to disable audio fingerprinting for them.

The second case is browsers on iOS 12 or newer. They can reject starting audio processing if the page is in the background. Luckily, browsers allow you to resume the processing when the page returns to the foreground. When the page is activated, we attempt calling <tt>context.startRendering()</tt> several times until the context.state becomes running. If the processing doesn’t start after several attempts, the code stops. We use a regular <tt>setTimeout</tt> in addition to our retry strategy in case of an unexpected error or freeze. You can see [a code example here](https://gist.github.com/Finesse/92959ce907a5ba7ee5c05542e3f8741b).

### Tor

**In the case of the Tor browser, everything is simple. But unfortunately, web Audio API is disabled there, so audio fingerprinting is [impossible](https://gitlab.torproject.org/legacy/trac/-/issues/21984).**

### Brave

With Brave, the situation is more nuanced. Brave is a privacy-focused browser based on Blink. It is known to slightly randomize the audio sample values, which it calls “farbling.”

> Farbling is Brave’s term for slightly randomizing the output of semi-identifying browser features, in a way that’s difficult for websites to detect, but doesn’t break benign, user-serving websites. These “farbled” values are deterministically generated using a per-session, <a href="https://publicsuffix.org/" target="_blank" rel="noopener"><span>per-eTLD</span></a>+1 seed so that a site will get the exact same value each time it tries to fingerprint within the same session, but that different sites will get different values, and the same site will get different values on the next session. This technique has its roots in prior privacy research, including the <a href="https://dl.acm.org/doi/abs/10.1145/2736277.2741090" target="_blank" rel="noopener"><span>PriVaricator</span></a> (Nikiforakis et al, WWW 2015) and <a href="https://hal.inria.fr/hal-01527580/document" target="_blank" rel="noopener"><span>FPRandom</span></a> (Laperdrix et al, ESSoS 2017) projects.

Brave offers three levels of farbling (users can choose the level they want in settings):

* **Disabled:** No farbling is applied. The fingerprint is the same as in other Blink browsers such as Chrome.
* **Standard:** This is the default value. The audio signal values are multiplied by a fixed number, called the “fudge” factor, that is stable for a given domain within a user session. In practice, the audio wave sounds and looks the same but has tiny variations that make it challenging to use in fingerprinting.
* **Strict:** The sound wave is replaced with a pseudo-random sequence.

The farbling [modifies](https://github.com/brave/brave-core/blob/680b0d872e0a295ef94602fb5dc1907358d6a3ba/chromium_src/third_party/blink/renderer/modules/webaudio/audio_buffer.cc#L16) the original Blink AudioBuffer by [transforming](https://github.com/brave/brave-core/blob/680b0d872e0a295ef94602fb5dc1907358d6a3ba/chromium_src/third_party/blink/renderer/core/execution_context/execution_context.cc#L133) the actual audio values.

### Reverting Brave standard farbling

To revert the farbling, we need to obtain the fudge factor first. Then we can get back the original buffer by dividing the farbled values by the fudge factor:

```javascript
async function getFudgeFactor() {
  const context = new AudioContext(1, 1, 44100)
  const inputBuffer = context.createBuffer(1, 1, 44100)
  inputBuffer.getChannelData(0)[0] = 1

  const inputNode = context.createBufferSource()
  inputNode.buffer = inputBuffer
  inputNode.connect(context.destination)
  inputNode.start()

  // See the renderAudio implementation 
  // at https://git.io/Jmw1j
  const outputBuffer = await renderAudio(context)
  return outputBuffer.getChannelData(0)[0]
}

const [fingerprint, fudgeFactor] = await Promise.all([
  // This function is the fingerprint algorithm described
  // in the “How audio fingerprint is calculated” section
  getFingerprint(),
  getFudgeFactor(),
])
const restoredFingerprint = fingerprint / fudgeFactor
```

Unfortunately, floating point operations lack the precision to get the original samples. The table below shows restored audio fingerprints in different cases and shows how close they are to the initial values:

| OS, browser                                  | Fingerprint                                                                                                                                  | Absolute difference between the target fingerprint |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| macOS 11, Chrome 89 (the target fingerprint) | 124.0434806260746                                                                                                                            | n/a                                                |
| macOS 11, Brave 1.21 (same device and OS)    | Various fingerprints after browser restarts:<br />124.04347912294482<br />124.0434832855703<br />124.04347889351203<br />124.04348024313667  | 0.00000014% – 0.00000214%                          |
| Windows 10, Chrome 89                        | 124.04347527516074                                                                                                                           | 0.00000431%                                        |
| Windows 10, Brave 1.21                       | Various fingerprints after browser restarts:<br />124.04347610535537<br />124.04347187270707<br />124.04347220244154<br />124.04347384813703 | 0.00000364% – 0.00000679%                          |
| Android 11, Chrome 89                        | 124.08075528279005                                                                                                                           | 0.03%                                              |
| Android 9, Chrome 89                         | 124.08074500028306                                                                                                                           | 0.03%                                              |
| ChromeOS 89                                  | 124.04347721464                                                                                                                              | 0.00000275%                                        |
| macOS 11, Safari 14                          | 35.10893232002854                                                                                                                            | 71.7%                                              |
| macOS 11, Firefox 86                         | 35.7383295930922                                                                                                                             | 71.2%                                              |

As you can see, the restored Brave fingerprints are closer to the original fingerprints than other browsers’ fingerprints. This restoration means that you can use a fuzzy algorithm to match them. For example, if the difference between a pair of audio fingerprint numbers is more than <tt>0.0000022%</tt>, you can assume that these are different devices or browsers.

## Performance

### Web Audio API rendering

Look at what happens under the hood in Chrome during audio fingerprint generation. In the screenshot below, the horizontal axis is time, the rows are execution threads, and the bars are time slices when the browser is busy. You can learn more about the performance panel in this [Chrome article](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance). The audio processing starts at <tt>809.6</tt> ms and completes at <tt>814.1</tt> ms:

![Screenshot of Chrome performance during audio fingerprinting](/img/uploads/performance.jpg "Screenshot of Chrome performance during audio fingerprinting")

The main thread, labeled as “Main” on the image, handles user input (mouse movements, clicks, taps, etc.) and animation. When the main thread is busy, the page freezes. Therefore, it’s a good practice to avoid running blocking operations on the main thread for more than several milliseconds.

As you can see in the image above, the browser delegates some work to the OfflineAudioRender thread, freeing the main thread. **Therefore the page stays responsive during most of the audio fingerprint calculation.**

Web Audio API is not available in [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), so we cannot calculate audio fingerprints there.

### Performance summary in different browsers

The table below shows the time it takes to get a fingerprint on different browsers and devices. The time is measured immediately after the cold page load.

| Device, OS, browser                              | Time to fingerprint |
| ------------------------------------------------ | ------------------- |
| MacBook Pro 2015 (Core i7), macOS 11, Safari 14  | 5 ms                |
| MacBook Pro 2015 (Core i7), macOS 11, Chrome 89  | 7 ms                |
| Acer Chromebook 314, Chrome OS 89                | 7 ms                |
| Pixel 5, Android 11, Chrome 89                   | 7 ms                |
| iPhone SE1, iOS 13, Safari 13                    | 12 ms               |
| Pixel 1, Android 7.1, Chrome 88                  | 17 ms               |
| Galaxy S4, Android 4.4, Chrome 80                | 40 ms               |
| MacBook Pro 2015 (Core i7), macOS 11, Firefox 86 | 50 ms               |

## Audio fingerprinting is only a tiny part of the larger identification process.

Audio fingerprinting is one of the many signals our [open source library](https://github.com/fingerprintjs/fingerprintjs) uses to generate a browser fingerprint. However, we do not blindly incorporate every signal available in the browser. Instead, we analyze the stability and uniqueness of each signal separately to determine their impact on fingerprint accuracy.

For audio fingerprinting, we found that the signal contributes only slightly to uniqueness but is highly stable, resulting in a slight net increase in fingerprint accuracy.

Our [beginner’s guide to browser fingerprinting](https://fingerprint.com/blog/what-is-browser-fingerprinting/) further discusses stability, uniqueness, and accuracy.

### Try Browser Fingerprinting for Yourself

Browser fingerprinting is a valuable visitor identification method for various anti-fraud applications. Identifying malicious visitors attempting to circumvent tracking by clearing cookies, browsing in incognito mode, or using a VPN is beneficial.

You can try implementing browser fingerprinting yourself with our [open source library](https://github.com/fingerprintjs/fingerprintjs). FingerprintJS is the most popular browser fingerprinting library, with over 17K GitHub stars.

We also developed the [Fingerprint Pro API](https://fingerprint.com/) for higher identification accuracy, which uses machine learning to combine browser fingerprinting with additional identification techniques. You can [try Fingerprint Pro](https://dashboard.fingerprint.com/signup) with unlimited API requests for the first ten days.

### Get in touch

* Star, follow or fork our <a href="https://github.com/fingerprintjs/fingerprintjs" target="_blank" rel="noopener"><span>GitHub project</span></a>
* Email us your questions at oss@fingerprint.com
* [Join our team](https://fingerprint.com/careers/jobs/) to work on exciting research in online security.