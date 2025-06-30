#!/usr/bin/env bash

# Install ffmpeg and C++ tools
apt-get update && apt-get install -y ffmpeg build-essential cmake curl

# Clone whisper.cpp and build it
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp && make && cd ..

# Download English tiny model
mkdir -p models
curl -L -o models/ggml-tiny.en.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.en.bin
