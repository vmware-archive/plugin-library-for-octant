#!/bin/bash

if [[ -z ${OCTANT_TS_BIN} ]]; then
    echo "You must set OCTANT_TS_BIN to the path of the ts-component-gen executable"
    exit
fi

if [[ ! -f ${OCTANT_TS_BIN} ]]; then
    echo "OCTANT_TS_BIN is set but file does not exist"
    exit
fi

if [[ -z "${OCTANT_SRC}" ]]; then
    echo "You must set OCTANT_SRC to the path of the Octant source code"
    exit
fi

if [[ ! -d ${OCTANT_SRC} ]]; then
    echo "OCTANT_SRC is set but directory does not exist"
    exit
fi

run_path="${PWD}"

cd ${OCTANT_SRC}
echo "Executable File: ${OCTANT_TS_BIN}"
echo "Source Path: ${OCTANT_SRC}"
echo "Output Folder: $run_path/components"

function shutdown() {
  tput cnorm # reset cursor
}
trap shutdown EXIT

function cursorBack() {
  echo -en "\033[$1D"
}

function spinner() {
  # make sure we use non-unicode character type locale 
  # (that way it works for any locale as long as the font supports the characters)
  local LC_CTYPE=C

  local pid=$1 # Process Id of the previous running command

  local spin='⣾⣽⣻⢿⡿⣟⣯⣷'
  local charwidth=3

  local i=0
  tput civis # cursor invisible
  printf "generating TypeScript components "
  while kill -0 $pid 2>/dev/null; do
    local i=$(((i + $charwidth) % ${#spin}))
    printf "%s" "${spin:$i:$charwidth}"

    cursorBack 1
    sleep .1
  done
  printf "\n"
  tput cnorm
  wait $pid # capture exit code
  return $?
}

exec "${OCTANT_TS_BIN}" "-dest" "$run_path/components" &
spinner $!

cd $run_path
