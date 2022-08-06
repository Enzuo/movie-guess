## Install
`npm install`

## Start
`npm run dev`

## Create movie clips

```bash
ffmpeg -i idiocracy.mp4 -ss 00:00:00 -to 00:00:24 -c:v libvpx-vp9 -b:v 0.8M -pass 1 -an -f null NUL && ^
ffmpeg -i idiocracy.mp4 -ss 00:00:00 -to 00:00:24 -c:v libvpx-vp9 -b:v 0.8M -pass 2 -c:a libopus output.webm
```