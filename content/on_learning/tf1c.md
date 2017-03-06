! Compiling TF 1.0

# Compiling TensorFlow r1.0 from source, OS X, RMBP2015

To support things like SSE and AVX.

>Since 1.0 TF removed support for acceleration instructions in their official build due to complain from a couple old school users. Guess what? I'll (have to) build it myself.

# If it works, don't build it

Building TF on my machine once took ~30min (building), ~20min (Downloading all the stuff), ~entire night (Googling Google, dealing with all kinds of issues).

Google did a great job with their Blaze (Bazel) build system -- a system specifically designed to do this one thing (build software), in world record speed. Yet still takes half an hour. Without Blaze it's hard to imagine Google engineers literally doing anything productive.

# Detailed Steps

```bash
# install JDK first.

# then bazel, the open-source and incon-venient version of Blaze
$ brew install bazel

# here let's assume you already have all the python essentials (pip, six, wheel, numpy) installed.
# I have miniconda3 installed as main python.

$ git clone https://github.com/tensorflow/tensorflow
$ cd tensorflow
$ git checkout r1.0
$ ./configure

# enter enter enter enter
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

# then as usual
pip install --upgrade /tmp/tensorflow_pkg/<tensorflow_blahblah_x86_64.whl>
```
