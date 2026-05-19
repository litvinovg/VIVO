#!/bin/bash

shutdown() {
  exit 0;
}
trap 'shutdown' SIGTERM
cron  &
/usr/local/tomcat/bin/catalina.sh run &
PID=$!
wait $PID
