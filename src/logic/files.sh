#!/bin/bash

SOURCEDIR=./source/
TARGETDIR=./target/

get_filename () {
  fullpath=$1
  filename="${fullpath##*/}"                      # Strip longest match of */ from start
  dir="${fullpath:0:${#fullpath} - ${#filename}}" # Substring from 0 thru pos of filename
  base="${filename%.[^.]*}"                       # Strip shortest match of . plus at least one non-dot char from end
  ext="${filename:${#base} + 1}"                  # Substring from len of base thru end
  if [[ -z "$base" && -n "$ext" ]]; then          # If we have an extension and no base, it's really the base
      base=".$ext"
      ext=""
  fi

  echo -e "$fullpath:\n\tdir  = \"$dir\"\n\tbase = \"$base\"\n\text  = \"$ext\""
}



echo "START"

for filepath in ${SOURCEDIR}*
do
  get_filename $filepath
  echo $base
  OUTPATH=${TARGETDIR}${base}.webm
  echo $OUTPATH

  
  ffmpeg -i $filepath -c:v libvpx-vp9 -b:v 0.2M -pass 1 -an -f null NUL && ^
  ffmpeg -i $filepath -c:v libvpx-vp9 -b:v 0.2M -pass 2 -c:a libopus $OUTPATH
done




sleep 5000