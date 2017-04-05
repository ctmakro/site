! Compiling TensorFlow

# Compiling TensorFlow r1.0+ from source, OS X, RMBP2015

To support SSE3, 4.1, 4.2, AVX, AVX2, FMA.

>Since 1.0, TF removed support for acceleration instructions from their official build, due to complain from a couple old school users.

Prebuilt Python Wheels are available at <https://github.com/ctmakro/tensorflow_custom_python_wheel_build>.

## Notes

Building TF on my machine once took ~30min (building), ~20min (Downloading all the stuff), ~entire night (Googling Google, dealing with all kinds of issues).

Google did a great job with their Blaze (Bazel) build system -- a system specifically designed to do this one thing (build software), in world record speed. Yet still takes half an hour. Without Blaze it's hard to imagine Google engineers literally doing anything productive.

## Detailed Steps

```bash
# install JDK first

# then install bazel, the open-source and possibly-censored version of Blaze
$ brew install bazel

# Assume you have all the python essentials (pip, six, wheel, numpy) installed.
# I have miniconda3 installed as my main python.

$ git clone https://github.com/tensorflow/tensorflow
$ cd tensorflow
$ git checkout r1.0
$ ./configure

# press enter enter enter enter
# configure script start to download a lot of things, now go eat something

# (!) per original instruction you are expected to run this command:
$ bazel build --config=opt //tensorflow/tools/pip_package:build_pip_package

# Turned out it didn't detect SSE and AVX on my CPU at all.
# Following command worked for me (RMBP2015, Core i5):
$ bazel build -c opt --copt=-mavx --copt=-mavx2 --copt=-msse4.2 --copt=-msse4.1 --copt=-msse3 --copt=-mfma -k //tensorflow/tools/pip_package:build_pip_package

# after the build, generate a wheel:
$ bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg

# leave current directory
# (important, otherwise python import will fail due to name clashing)
$ cd ~

# then install the wheel as usual
pip install --upgrade /tmp/tensorflow_pkg/<tensorflow_blahblah_x86_64.whl>
```
