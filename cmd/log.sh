#!/bin/bash

rf=$(pwd)'/../'

# 配置颜色预设数据，默认使用亮色系
log_list=(
    "暂时无用    颜色名       缩写    色值       中文颜色"
    "---         gray       -gy     90        灰色"
    "---          red       -rd     91        红色"
    "---        green       -gn     92        绿色"
    "---       yellow       -ye     93        黄色"
    "---         blue       -bu     94        蓝色"
    "---       violet       -vt     95        紫红"
    "---         cyan       -cy     96        青色"
    "---        white       -wt     97        白色"
)

# 额外参数配置
# ==== 值名称 ====== 命令 ====== 值 ========
checkArg=(
    "background     b          10"
    "dark           d         -60"
    "time           t           1"
)

# 使用帮助
help(){
    echo "
    使用方法：
        【1】：sh log.sh [颜色] [内容] [其他配置]

            颜色：
                请查看所有快捷方式：sh log.sh -list
            内容：
                如果有空格，请置于引号("")内
            其他配置（多个需连写）：
                时间戳：-t
                背景色：-b
                深色系：-d

        【2】：示例：
            sh log.sh -rd \"dark red text with time\" -dt
            sh log.sh -bu \"blue background with time\" -bt
        \n"
    exit 1
}

# 查看列表
list() {
    log "92" "颜色配置如下，使用方法：sh log.sh -help "

    for (( i=0;i<${#log_list[*]};i++ ));do
        A=`echo ${log_list[$i]} | awk '{print $1}'`
        B=`echo ${log_list[$i]} | awk '{print $2}'`
        C=`echo ${log_list[$i]} | awk '{print $3}'`
        D=`echo ${log_list[$i]} | awk '{print $4}'`
        E=`echo ${log_list[$i]} | awk '{print $5}'`

        if [[ "$i" == 0 ]]; then
            C=`log 37 $C`
            B=`log 37 $B`
            A=`log 37 $E`
            E=`log 37 "背景色：-b"`
            D1=`log 37 "深色：-d"`

            # 格式化输出
            echo "+========================================================+"
            printf "%-1s %-22s %-1s %-18s %-1s %-17s %-1s %-23s %-1s %-22s %-1s\n" \
                   \| ${A:-''} \| ${B:-''} \| ${C:-''} \|  ${D1:-''} \| ${E:-''} \| 
            echo "+========================================================+"
        else

            # if [[ $B == "black" ]]; then
            #     D="37"
            # fi

            A=`log $D $E`
            C=`log $D $C`
            E=`log $(($D+10)) $B`
            D1=`log $(($D-60)) $B`
            B=`log $D $B`

            # 格式化输出
            printf "%-1s %-20s %-1s %-15s %-1s %-15s %-1s %-20s %-1s %-20s %-1s\n" \
                   \| ${A:-''} \| ${B:-''} \| ${C:-''} \|  ${D1:-''} \| ${E:-''} \| 
            echo "+--------------------------------------------------------+"
        fi
    done

}

# 打印
log() {
    printColor=$(($1+$dark+$background));
    printStr=$2;

    # 设置时间戳
    timeStamp="";
    if [[ $with_time == "1" ]]; then
        timeStamp="[\033[90m"`date +%H:%M:%S`"\033[0m] ";
    fi

    echo $timeStamp"\033["$printColor"m"${printStr:-$str}"\033[0m";
}

# ======= 初始化变量，并接收参数 =======

# 预设信息
str="Please write something!";

# 打印颜色：白
color="37"

# 默认不显示时间：0
with_time="0"

# 深色减值：0
dark="0"

# 背景色增值：0
background="0"

for (( i=1; i < $#+1; i++ )); do

    # 不知道怎么由下标取到对应参数的值，参数中待空格那种
    # curArg=`echo $* | awk '{print $'$i'}'`

    case $i in
        "1" )
            colorName=$1;
            ;;
        "2" )            
            str=$2;
            ;;
        "3" )
            for (( j=0;j<${#checkArg[*]};j++ ));do
                v1=`echo ${checkArg[$j]} | awk '{print $1}'`
                v2=`echo ${checkArg[$j]} | awk '{print $2}'`
                v3=`echo ${checkArg[$j]} | awk '{print $3}'`

                # 计数
                vCount=`echo $3 | tr -cd $v2 | wc -c | awk '{print $1}'`
                if [[ $vCount > 0 ]]; then

                    # 匹配
                    case $v1 in
                        "background" )
                            background=$v3
                            ;;
                        "dark" )
                            dark=$v3
                            ;;
                        "time" )
                            with_time=$v3
                            ;;
                    esac
                fi
            done
            ;;
    esac
done

# ======= 命令判断 =======
if [[ $# -eq 0 || "$1" == "-help" ||  "$1" == "-h" ]];then
    with_time="0"
    help;    
elif [[ "$1" == "-list" ||  "$1" == "-l" ]]; then
    list;
else
    # 遍历取色
    for key in ${!log_list[*]} ; do
        A=`echo ${log_list[$key]} | awk '{print $1}'`    # 方法
        B=`echo ${log_list[$key]} | awk '{print $2}'`    # 颜色名
        C=`echo ${log_list[$key]} | awk '{print $3}'`    # 缩写
        D=`echo ${log_list[$key]} | awk '{print $4}'`    # 色值
        E=`echo ${log_list[$key]} | awk '{print $5}'`    # 中文颜色

        # 根据遍历取出颜色，记录遍历是否取到结果
        if [[ "$colorName" == "$B" || "$colorName" == "$C" ]];then
            isThere="1"
            color=$D
            break
        fi
    done

    # 如果确实遍历到数据，表示命令有效，去打印
    if [[ "$isThere" == "1" ]]; then
        log $color
    else
        with_time="0"
        help
    fi

fi

