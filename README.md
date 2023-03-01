## Install
`npm install`

## Start
`npm run dev`

## Convert movie clips

place movies.csv in src/logic and run
```
npm run build-data
```

## Create movie clips

```bash
ffmpeg -i mrbean.mp4 -ss 00:00:00 -to 00:00:24 -c:v libvpx-vp9 -b:v 0.8M -pass 1 -an -f null NUL && ^
ffmpeg -i mrbean.mp4 -ss 00:00:00 -to 00:00:24 -c:v libvpx-vp9 -b:v 0.8M -pass 2 -c:a libopus output.webm
```

ffmpeg -i mrbean.mp4 -c:v libvpx-vp9 -b:v 0.8M -pass 1 -an -f null NUL && ^
ffmpeg -i mrbean.mp4 -c:v libvpx-vp9 -b:v 0.8M -pass 2 -c:a libopus output.webm
