#!/bin/bash

curdir=$(cd `dirname $0`;pwd);

sh $curdir"/log.sh" -gn "启动: 开发模式" -t;


# test
while getopts ":bd" arg #选项后面的冒号表示该选项需要参数
do
        case $arg in
             b)
                echo "b ==> 背景色"
                ;;
             d)
                echo "d ==> 深色"
                ;;
        esac
done
