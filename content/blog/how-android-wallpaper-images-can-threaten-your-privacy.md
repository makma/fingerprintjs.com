---
templateKey: long-form-content
metadata:
  title: How Android Wallpaper Images Can Threaten Your Privacy
  description: "Android 12 features Material You, a new UI theming system based on
    color extraction. Find out how this feature jeopardizes user privacy and
    what you can do to protect yourself. "
  url: https://fingerprint.com/blog/how-android-wallpaper-images-threaten-privacy/
  image: /img/uploads/wallpaper-id.png
  imageAlt: Android Wallpaper Identifcation
  imageTitle: Android Wallpaper Identifcation
featured: true
publishDate: 2021-10-05T19:20:01.785Z
title: How Android Wallpaper Images Can Threaten Your Privacy
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - vulnerability
  - privacy
  - android
authors:
  - Alexey Verkhovsky
heroImage:
  image: /img/uploads/wallpaper-id.png
  imageAlt: Android Wallpaper Identifcation
  imageTitle: Android Wallpaper Identifcation
customCTA:
  openCtaNewTab: false
---
Android 12’s highly anticipated Material You design system features wallpaper-based color theming and advanced customizations powered by color extraction. These UI enhancements allow users to select a wallpaper (i.e., a personal background image) that automatically generates an optimal palette of colors that applies to the device’s look and feel global.

Unfortunately, such personalization can carry a high price in compromised privacy. This article will demonstrate how to use Android wallpapers to track users and explore ways to prevent your device from being exploited.

### Skip to the good stuff - try it yourself

You can download the demo app that generates a unique ID per user on [Google Play](https://play.google.com/store/apps/details?id=com.fingerprintjs.android.wallpaperid&hl=en_US&gl=US) (for Android 5.0 and above, no permissions are required); the source code is [available on GitHub](https://github.com/fingerprintjs/android-wallpaper-id).

## Android wallpaper images vs. user privacy

Introduced in 2019 as part of the release of Android 2, API version 5, the WallpaperManager class provides methods for interacting with wallpapers, including [getDrawable()](https://developer.android.com/reference/android/app/WallpaperManager#getDrawable()) for retrieving the current system wallpaper as a drawable resource.

One representation of a drawable resource is as a byte array using the following code:

```js
private fun calculateWallpaperBytes(): ByteArray {
   val imageBitmap = wallpaperManager.drawable.toBitmap()
   val stream = ByteArrayOutputStream()
   imageBitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
   return stream.toByteArray()
}
```

Byte arrays can restore original images from Android wallpapers, likely to contain personal information or details unique to the user. So every app on your device can view and download photos of your family, pets, favorite bands or movies, and anything else you may have set as a wallpaper. Moreover, you couldn’t prevent them from doing so before Android 8.1.

Many devices are running Android 8.1 or earlier (almost 44.6% at the time of this writing, per Google Analytics) and are still vulnerable to this exploit.

### A new color extraction method

Starting with Android 8.1, the [getDrawable()](https://developer.android.com/reference/android/app/WallpaperManager#getDrawable()) method requires the use of [READ_EXTERNAL_STORAGE](https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE), less insecure but risky permission as it enables access to all media on a device (and more confidential data). Also released in Android 8.1 and to compensate for the limited functionality, [getWallpaperColors(int which)](https://developer.android.com/reference/android/app/WallpaperManager#getWallpaperColors(int)), which returns three primary hues from a wallpaper image, was an easier way to extract color.

Like iOS, Android allows users to determine which specific screens to use wallpaper images, and the integer argument “which” sets which exact wallpaper image to use for color extraction. There are two options: the constant values `WallpaperManager.FLAG_SYSTEM` or `WallpaperManager.FLAG_LOCK`.

![Wallpaper setting in Android](/img/uploads/lockscreen.png "Wallpaper setting in Android")

```js
// WallpaperManager.FLAG_LOCK for the the lock screen

val colors = WallpaperManager

.getInstance(context).getWallpaperColors(WallpaperManager.FLAG_SYSTEM) 

val primaryColor: Int = colors.primaryColor.toArgb()

val secondaryColor: Int = colors.secondaryColor.toArgb()

val tertiaryColor: Int = colors.tertiaryColor.toArgb()
```

The above code illustrates how to extract colors using a [context](https://developer.android.com/reference/android/content/Context) object with primary, secondary, and tertiary colors corresponding to the most popular colors in the picture (primary being the most popular). Note that no special permissions are required to use this new method.

The following is an example of color extraction using the new method with an accurate picture:

![Color extraction example](/img/uploads/color-extraction.png "Color extraction example")

The methods may return null in some scenarios (e.g., when custom launchers redefine wallpaper management logic without using the `WallpaperManager` class). However, if a wallpaper was set once by `WallpaperManager`, the method will return a not-null value.

### The science of color extraction

Since Android is open source, we can readily determine how the method works. According to the [code](https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/com/android/internal/graphics/palette/VariationalKMeansQuantizer.java;l=31?q=KMeansQua&sq=&ss=android%2Fplatform%2Fsuperproject), colors are the result of the work of the Variational [K-means](https://en.wikipedia.org/wiki/K-means_clustering) quantizer. A color represents every image pixel, and every color is a [3-dimensional](https://en.wikipedia.org/wiki/Three-dimensional_space) point in space (e.g., RGB color space). All pixels form a set in space, and the algorithm performs clustering of the set on K parts by finding K points, which are equidistant from others in the set.

![Kebab kiosks](/img/uploads/kebab.png "Kebab kiosks")

Above is a visualization of how the K-means method works, courtesy of [vas3k](https://vas3k.com/blog/machine_learning/). This particular case is 3-means in a 2-dimensional space.

In the case of Android, the [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color space provides the color representation, and [euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) calculates distance using classical measures. The results are three shades of an image that are equidistant (in the color space) from every image pixel.

### A universe of combinations

This color extraction algorithm is a map from the set of all possible images to the RGB color space. The set is infinite, and 2²⁴ combinations limit the RGB color space. Theoretically, every RGB combination is possible and will be 32 bits, but only 24 matter. Alpha channels will always equal 1 (according to sources), while every component of the colors R, G, and B has 256 possible combinations, or 2⁸.

Since each component is independent, we can directly multiply the number of combinations together, which results in 2⁸ \* 2⁸ \* 2⁸ = 2²⁴ combinations for every color. We have three colors for an image and 2²⁴ \* 2²⁴ \* 2²⁴ = 2⁷² combinations per image.

The same logic applies to the second wallpaper image, and they can be set up independently of each other. For example, from one wallpaper image, we have 72 bits and 144 bits using system wallpaper and lock screen wallpaper — 144 bits and 2¹⁴⁴ combinations. The more combinations possible, the more easily someone can track you, and the higher probability of generating a unique value suitable for use as an ID. 

2¹⁴⁴ = 22,300,745,198,530,623,141,535,718,272,648,361,505,980,416

How large is this number, exactly? For context, the universe contains around 10⁸⁰ atoms. And 2¹⁴⁴ is approximately equal to 10⁴³. So the squared value of combinations is larger than the number of atoms in the universe! It’s safe to say that this outnumbers all devices on the Earth for the foreseeable future.

### The identification algorithm

As you may recall, developers can use byte arrays to restore wallpaper images before Android 8.1. After version 8.1, developers can use wallpaper colors to extract 144 bits. Both could be IDs, but let’s use them as inputs for the SHA-256 hash function (for unification).

We have an ID that contains 256 bits, is unique across all applications, and only changes when the device wallpaper changes. The code for getting the ID is:

```js
val id = hasher.hash(
if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O_MR1) {
extractWallpaperBytes()
} else extractColorsBytes())
```

The ID remains the same even after reinstalling the application and only changes when the wallpaper changes.

### Try it yourself

We created an open-source application that calculates the ID and checks its uniqueness for demonstration purposes. You can download the app on [Google Play](https://play.google.com/store/apps/details?id=com.fingerprintjs.android.wallpaperid&hl=en_US&gl=US) (for Android 5.0 and above, no permissions are required); the source code is [available on GitHub](https://github.com/fingerprintjs/android-wallpaper-id).

**Note:** the method does not work on custom launchers that redefine the logic of wallpaper management without using `WallpaperManager` class. 

![Android wallpaper demo](/img/uploads/screenshot_20211006-000944_2.png "Android wallpaper demo")

## How to prevent wallpaper tracking on your Android device

The following measures can help prevent wallpaper tracking on your Android device:

1. Never use private or personal images for wallpapers, especially on devices running Android 8.1 and earlier.
2. Use a default wallpaper and don’t change it. A custom image inadvertently adds entropy and uniqueness to distinguish your device from others.
3. Check if your launcher has redefined the logic of the device’s wallpaper management (you can do this with our demo application).
4. Don’t install suspicious applications.
5. Be sure to keep your device’s operating system continuously updated.
6. Use anti-malware software to ensure your installed applications are behaving as expected.

## Conclusion

As you can see, signals generated from wallpaper color extraction can create a single identifier available to all applications, no additional permissions required. That said, extracting colors from device wallpapers is just one-way mobile developers can uniquely profile Android devices, and it’s not the most dependable.

For some examples of more stable and reliable methods, please view our [fingerprint-android](https://github.com/fingerprintjs/fingerprint-android) library source code. Google has not restricted these for several years now, and it is unlikely that it ever will. Doing so would impact Android’s efficacy as an advertising platform — and for the world’s largest tech firm, it’s a constant juggle between balancing these interests with protecting user privacy.

## Get in touch

* Star, follow, or fork our [production-grade library](https://github.com/fingerprintjs/fingerprint-android) for Android device fingerprinting.
* Email any questions you have to [oss@fingerprint.com](mailto:oss@fingerprint.com)
* [Join our team](https://fingerprint.com/careers/).