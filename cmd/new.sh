#!/bin/bash

curdir=$(cd `dirname $0`;pwd);

# ======= 命令判断 =======
if [[ $# -eq 0 ]]; then
	sh $curdir"/log.sh" -vt "给新项目起个名吧~" -t;
else
	sh $curdir"/log.sh" -gn "新建项目"$1 -t;
	gulp new --folder $1
	# gulp dev
fi