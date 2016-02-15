#!/bin/bash

rf=$(pwd)'/../'

# 定义快捷方式
log_list=(
    "方法        颜色名       缩写    色值       中文颜色"
    "logBlack   black       -cb     30        黑色（以白色显示说明）"

    "logRed     red         -r      31        红色"
    "logGreen   green       -g      32        绿色"
    "logYellow  yellow      -y      33        黄色"
    "logBlue    blue        -b      34        蓝色"
    "logPurple  purple      -p      35        紫色"
    "logCyan    cyan        -c      36        青色"

    "logWhite   white       -cw     37        白色"
    "logGray    gray        -cg     90        灰色"
)

#查看帮助
logHelp() {
    log "32" "您可以使用快捷方式打对应样式的log，如：sh log.sh -r \"I'm red\"" "1"

    for (( i=0;i<${#log_list[*]};i++ ));do
        A=`echo ${log_list[$i]} | awk '{print $1}'`
        B=`echo ${log_list[$i]} | awk '{print $2}'`
        C=`echo ${log_list[$i]} | awk '{print $3}'`
        D=`echo ${log_list[$i]} | awk '{print $4}'`
        E=`echo ${log_list[$i]} | awk '{print $5}'`

        if [[ "$i" == 0 ]]; then
            C=`log 37 $C '1'`
            B=`log 37 $B '1'`
            A=`log 37 $E '1'`

            # 格式化输出
            echo "+====================================================+"
            printf "%-1s %-35s %-1s %-25s %-1s %-20s %-1s\n" \
                   \| ${A:-''} \| ${B:-''} \| ${C:-''} \| 
            echo "+====================================================+"
        else

            if [[ $B == "black" ]]; then
                D="37"
            fi

            C=`log $D $C '1'`
            B=`log $D $B '1'`
            A=`log $D $E '1'`

            # 格式化输出
            printf "%-1s %-33s %-1s %-22s %-1s %-18s %-1s\n" \
                   \| ${A:-''} \| ${B:-''} \| ${C:-''} \| 
            echo "+----------------------------------------------------+"
        fi
    done
}

log() {
    color=$1;
    value=$2;
    delTime=$3;
    timeStamp="";

    if [[ $delTime != "1" ]]; then
        timeStamp="[\033[90m"`date +%H:%M:%S`"\033[0m] ";
    fi

    echo $timeStamp"\033["$color"m"${value:-$str}"\033[0m";
}


# ======= 接收参数 =======
# 颜色名
colorName=$1;
# 文字内容
str=$2;
if [[ "$2" == "" ]]; then
    str="Please write something!";
fi
# 颜色，预设：白
color="37";


# ======= 启动判断 =======
if [[ $# -eq 0 || "$1" == "help" ||  "$1" == "-h" ]];then
    logHelp;    
else

    # 遍历取色
    for key in ${!log_list[*]} ; do
        A=`echo ${log_list[$key]} | awk '{print $1}'`    # 方法
        B=`echo ${log_list[$key]} | awk '{print $2}'`    # 颜色名
        C=`echo ${log_list[$key]} | awk '{print $3}'`    # 缩写
        D=`echo ${log_list[$key]} | awk '{print $4}'`    # 色值
        E=`echo ${log_list[$key]} | awk '{print $5}'`    # 中文颜色

        if [[ "$colorName" == "$B" || "$colorName" == "$C" ]];then
            isThere="1";
            color=$D;
            break;
        fi
    done

    if [[ "$isThere" == "1" ]]; then
        log $color;
    else
        logHelp;
    fi

fi

