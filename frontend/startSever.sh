#!/bin/bash

setEnvironment(){
	export MONGO_PATH=/Users/vsesha/Backup/VasuBKUP/HTML_Works_onLocal/Database/mongodb
	export MRGSRV_PATH=/Users/vsesha/Backup/VasuBKUP/HTML_Works_onLocal/PoC/server
	
	echo $MONGO_PATH;
}


checkproc() {
  echo "$ts: checking $1";
  if (( $(ps -Al | grep $1 | wc -l ) >1))
	then
		return 1;
	else
		return 0;
  fi
}


startMongodb() {
  if (checkproc "mongod" ==0)
	then
		echo "Starting mongod"
		cd $MONGO_PATH
		mongod&
		return
  fi
}

startNodeServer(){
	if (checkproc "marginserver" ==0)
	then
		echo "Starting marginserver"
		cd $MRGSRV_PATH
		node marginserver.js PROD&
	fi
}

setEnvironment 
startMongodb 
startNodeServer